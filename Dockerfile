ARG NODE_VERSION=22.9.0
ARG UBUNTU_VERSION=24.04.1

ARG UBUNTU_DIGSET=sha256:bd6cd2105f1edfc46ba5f27bd32837e4ba0ed342c565fc4b1ba49b1573f23ca6
ARG NODE_DIGSET=sha256:64269df7ff9275757982994f6ee37268367d924f5f9086b5b0ed2e81e7c2ff20

# FROM ubuntu:${UBUNTU_VERSION}
# FROM node:${NODE_VERSION}-slim 

# FROM ubuntu@${UBUNTU_DIGSET} AS build
FROM node@${NODE_DIGSET} AS build

ENV DEBIAN_FRONTEND=noninteractive

# RUN apt-get update && \
#     apt-get install -y curl ca-certificates gnupg && \
#     curl -fsSL https://deb.nodesource.com/setup_23.x | bash - && \
#     apt-get install -y nodejs && \
#     # Install build essentials (needed for some npm packages)
#     apt-get install -y build-essential && \
#     # Clean up
#     apt-get clean && \
#     rm -rf /var/lib/apt/lists/*


# RUN node --version && npm --version
# ENV PATH /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

RUN npm install -g pnpm
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"

# RUN apt update -y && apt upgrade -y && \
#     apt install curl -y && \
#     echo $(curl --version)

# ENV NVM_DIR="$HOME/.nvm"

# RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash 

# should print `v0.39.7`
# RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash && \
#     export NVM_DIR="$HOME/.nvm" && \
#     [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && \
#     nvm install 23.1.0 && \
#     npm install -g pnpm


# RUN nvm -v && \
#     nvm install 23.1.0 && \
#     # should print `v23.1.0`
#     echo "Node version is:   ➡️" ${(node -v)} && \
#     # should print `10.9.0`
#     echo "Npm version is:   ➡️" ${npm -v }

WORKDIR /usr/src/app

COPY package*.json ./

COPY ./pnpm-lock.yaml ./

# RUN npm install -g pnpm

# RUN pnpm --version && \
#     echo  "Pnpm version is:   ➡️" $(pnpm --version)

RUN pnpm install

COPY . .

RUN pnpm build

# Optional: Clean up dev dependencies and only keep production ones
RUN pnpm prune --prod

# Stage 2: the production image 

FROM ubuntu@${UBUNTU_DIGSET}

RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y curl ca-certificates gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_23.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g pnpm && \
    # Install build essentials (needed for some npm packages)
    apt-get install -y build-essential && \
    apt install curl -y && apt install wget -y && \
    apt-get install -y openssl && \
    # Clean up
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*


# Set the working directory for the final image
WORKDIR /usr/src/app

# Copy only the necessary files from the builder stage
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/package.json ./pnpm-lock.yaml
COPY --from=build /usr/src/app/prisma ./prisma

# COPY --from=builder /usr/src/app/node_modules ./node_modules
# COPY package*.json ./


# RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash && \
#     nvm install 23.1.0 && \
#     # should print `v0.39.7`
#     nvm -v && \
#     # should print `v23.1.0`
#     echo "Node version is:   ➡️" ${(node -v)} && \
#     # should print `10.9.0`
#     echo "Npm version is:   ➡️" ${npm -v }

# RUN apt update -y && apt upgrade -y && \
#     apt install curl -y && apt install wget -y && \
#     apt-get install -y openssl && \
#     apt-get clean

EXPOSE 8080

CMD ["node", "dist/main"]

