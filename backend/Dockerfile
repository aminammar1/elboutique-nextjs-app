# Multi-stage Dockerfile for NestJS backend
# Use Node 20 LTS for best compatibility with NestJS 11 and tooling
FROM node:20-alpine AS deps

# Install dependencies required for native modules like bcrypt
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Install dependencies
COPY package*.json ./
# Prefer npm ci if lockfile exists; fallback to install
RUN if [ -f package-lock.json ]; then npm ci --omit=dev=false; else npm install; fi

# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the app
RUN npm run build

# Production image
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy only what we need in production
COPY --from=builder /app/package*.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Expose API port
EXPOSE 4000

# Default command
CMD ["node", "dist/main.js"]
