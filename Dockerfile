# Stage 1: Build
ARG NODE_VERSION=22.9.0
ARG UBUNTU_VERSION=24.04.1

FROM ubuntu:${UBUNTU_VERSION} AS builder
FROM node:${NODE_VERSION}-slim 


# Install required packages
RUN apt update -y && apt upgrade -y && apt install -y \
    curl \
    wget \
    openssl \
    && apt clean \
    && rm -rf /var/lib/apt/lists/*


# Set the working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN pnpm build

# Stage 2: Run
FROM ubuntu:${UBUNTU_VERSION}
FROM node:${NODE_VERSION}-slim

# Install required packages
RUN apt update -y && apt upgrade -y && apt install -y \
    curl \
    wget \
    openssl \
    && apt clean \
    && rm -rf /var/lib/apt/lists/*


# Set the working directory for the final image
WORKDIR /usr/src/app

# Copy only the necessary files from the builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY package*.json ./

# Expose the application port
EXPOSE 8080

# Command to run the application
CMD ["node", "dist/main"]
