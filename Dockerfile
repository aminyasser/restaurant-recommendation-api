FROM node:20-alpine
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9.0.6 --activate
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile
COPY . .   
CMD ["pnpm", "start:dev"]