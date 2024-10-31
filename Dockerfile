ARG NODE_VERSION=22.9.0

FROM node:${NODE_VERSION}-slim 

# ENV PNPM_HOME="/pnpm"

# ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /usr/src/app

COPY package*.json ./

COPY ./pnpm-lock.yaml ./


# RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash - 

RUN npm install -g pnpm

RUN pnpm --version

RUN pnpm install

COPY . .

RUN pnpm build

EXPOSE 3000

CMD ["node", "dist/main"]