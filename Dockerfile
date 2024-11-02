ARG NODE_VERSION=22.9.0
ARG UBUNTU_VERSION=24.04.1

ARG UBUNTU_DIGSET=sha256:bd6cd2105f1edfc46ba5f27bd32837e4ba0ed342c565fc4b1ba49b1573f23ca6
ARG NODE_DIGSET=sha256:64269df7ff9275757982994f6ee37268367d924f5f9086b5b0ed2e81e7c2ff20

# FROM ubuntu:${UBUNTU_VERSION}
# FROM node:${NODE_VERSION}-slim 

FROM ubuntu@${UBUNTU_DIGSET}
FROM node@${NODE_DIGSET}


WORKDIR /usr/src/app

COPY package*.json ./

COPY ./pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm --version

RUN pnpm install

COPY . .

RUN pnpm build

# Stage 2: Run
FROM ubuntu@${UBUNTU_DIGSET}
FROM node@${NODE_DIGSET}}

RUN apt update -y && apt upgrade -y && \
    apt install curl -y && apt install wget -y && \
    apt-get install -y openssl && \
    apt-get clean


# Set the working directory for the final image
WORKDIR /usr/src/app

# Copy only the necessary files from the builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY package*.json ./

EXPOSE 8080

CMD ["node", "dist/main"]

