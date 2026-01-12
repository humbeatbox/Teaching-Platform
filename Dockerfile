# Stage 1: Build Frontend
FROM node:18-slim as frontend-builder
WORKDIR /usr/src/app/client
COPY client/package*.json ./
RUN npm install
COPY client/ .
RUN npm run build

# Stage 2: Build Backend Dependencies
FROM node:18-slim as backend-deps
WORKDIR /usr/src/app/server
# Install build tools needed for native modules (bcrypt)
RUN apt-get update && \
    apt-get install -y --no-install-recommends python3 make g++ && \
    rm -rf /var/lib/apt/lists/*
COPY server/package*.json ./
# Install ONLY production dependencies and build native modules
RUN npm ci --only=production && npm rebuild bcrypt --build-from-source

# Stage 3: Final Production Image
FROM node:18-slim
WORKDIR /usr/src/app

# Create non-root user (security best practice, kept from original)
RUN groupadd -r nodeapp && useradd -r -g nodeapp -m nodeapp

# Copy built dependencies from backend-deps (No need for apt-get install python3/make/g++ here!)
COPY --from=backend-deps /usr/src/app/server/node_modules ./server/node_modules

# Copy built frontend assets
COPY --from=frontend-builder /usr/src/app/client/build ./server/client/build

# Copy backend source code
COPY server/ ./server

WORKDIR /usr/src/app/server

# Ownership
RUN chown -R nodeapp:nodeapp /usr/src/app

# Switch to non-root user
USER nodeapp

ENV NODE_ENV=production
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8080/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1); }).on('error', () => process.exit(1));"

CMD ["node", "server.js"]