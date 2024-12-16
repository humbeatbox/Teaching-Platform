
FROM node:18 as backend-builder
WORKDIR /usr/src/app/server


RUN apt-get update && apt-get install -y python3 make g++

COPY server/package*.json ./


RUN npm install
RUN npm rebuild bcrypt --build-from-source


COPY server/ .


FROM node:18 as frontend-builder
WORKDIR /usr/src/app/client
COPY client/package*.json ./
RUN npm install
COPY client/ .
RUN npm run build


FROM node:18-alpine
WORKDIR /usr/src/app


RUN apk add --no-cache python3 make g++

COPY --from=backend-builder /usr/src/app/server ./server
COPY --from=frontend-builder /usr/src/app/client/build ./server/client/build


WORKDIR /usr/src/app/server


RUN npm install --production && npm rebuild bcrypt --build-from-source


ENV NODE_ENV=production


EXPOSE 8080


CMD ["node", "server.js"]