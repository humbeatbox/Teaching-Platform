# Build backend
FROM node:18-slim as backend-builder
WORKDIR /usr/src/app/server

# Install build dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        python3 \
        make \
        g++ \
    && rm -rf /var/lib/apt/lists/*

COPY server/package*.json ./
RUN npm install
RUN npm rebuild bcrypt --build-from-source
COPY server/ .

# Build frontend
FROM node:18-slim as frontend-builder
WORKDIR /usr/src/app/client
COPY client/package*.json ./
RUN npm install
COPY client/ .
RUN npm run build

# Production image
FROM node:18-slim
WORKDIR /usr/src/app

# Create a non-root user
RUN groupadd -r nodeapp && useradd -r -g nodeapp -m nodeapp

# Install production dependencies
RUN apt-get update && apt-get install -y python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy built artifacts from previous stages
COPY --from=backend-builder /usr/src/app/server ./server
COPY --from=frontend-builder /usr/src/app/client/build ./server/client/build

WORKDIR /usr/src/app/server

# Install production dependencies
RUN npm install --production \
    && npm rebuild bcrypt --build-from-source \
    && npm cache clean --force

# Set proper ownership
RUN chown -R nodeapp:nodeapp /usr/src/app

# Switch to non-root user
USER nodeapp

ENV NODE_ENV=production
EXPOSE 8080

CMD ["node", "server.js"]