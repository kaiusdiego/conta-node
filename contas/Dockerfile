# Build stage 1
FROM node:14.15-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
COPY babel.config.js ./
COPY ormconfig.json ./
COPY tsconfig.json ./
RUN yarn && \
    yarn cache clean
# COPY ./src ./src
RUN yarn start

# Build stage 2
# takes the production build from staging build
FROM node:14.15-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY babel.config.js ./
COPY ormconfig.json ./
COPY tsconfig.json ./
RUN yarn && \
    yarn cache clean

COPY --from=builder /usr/src/ ./src
ENTRYPOINT [ "yarn", "start" ]
EXPOSE 3000
