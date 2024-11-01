ARG NODE_VERSION=22.9.0

FROM node:${NODE_VERSION}-slim 

# ENV PNPM_HOME="/pnpm"

# ENV PATH="$PNPM_HOME:$PATH"

# Install OpenSSL
# RUN apt-get update -y && \
#     apt-get install -y openssl && \
#     apt-get clean

RUN apt install build-essential zlib1g-dev -y && \
    cd /usr/local/src/  && \
    wget https://www.openssl.org/source/openssl-3.0.8.tar.gz && \
    tar xzvf openssl-3.0.8.tar.gz && \
    cd openssl-3.0.8 && \
    ./config --prefix=/usr/local/ssl --openssldir=/usr/local/ssl shared zlib && \
    make && \
    make test && \
    make install


WORKDIR /usr/src/app

COPY package*.json ./

COPY ./pnpm-lock.yaml ./


# RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash - 

RUN npm install -g pnpm

RUN pnpm --version

RUN pnpm install

COPY . .

RUN pnpm build

EXPOSE 8080

CMD ["node", "dist/main"]