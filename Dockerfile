ARG NODE_VERSION=22.9.0

ARG UBUNTU_VERSION=24.04.1

FROM ubuntu:${UBUNTU_VERSION}

FROM node:${NODE_VERSION}-slim 

# ENV PNPM_HOME="/pnpm"

# ENV PATH="$PNPM_HOME:$PATH"

# Install OpenSSL
RUN apt update -y && apt upgrade -y && \
    apt install curl -y && apt install wget -y && \
    apt-get install -y openssl && \
    apt-get clean

# Install OpenSSL
# RUN apt update -y && apt upgrade -y && \
#     apt install curl -y && apt install wget -y && \
#     apt install build-essential zlib1g-dev -y && \
#     cd /usr/local/src/  && \
#     wget https://www.openssl.org/source/openssl-3.0.8.tar.gz && \
#     tar xzvf openssl-3.0.8.tar.gz && \
#     cd openssl-3.0.8 && \
#     ./config --prefix=/usr/local/ssl --openssldir=/usr/local/ssl shared zlib && \
#     make && \
#     make test && \
#     make install


WORKDIR /usr/src/app

COPY package*.json ./

COPY ./pnpm-lock.yaml ./


RUN npm install -g pnpm

RUN pnpm --version

RUN pnpm install

COPY . .

RUN pnpm build

EXPOSE 8080

CMD ["node", "dist/main"]