
# Use official Node.js image as the base
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Install bun globally in base image so it's available in all stages
RUN npm install -g bun

# Install dependencies only when needed
FROM base AS deps
COPY package.json bun.lock ./
RUN bun install

# Copy all files and build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

# Production image, copy only necessary files
FROM base AS production
ENV NODE_ENV=production
WORKDIR /app
RUN npm install -g bun
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

EXPOSE 3000
CMD ["bun", "start"]
