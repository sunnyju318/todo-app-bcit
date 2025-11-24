# ===== Stage 1: Dependencies ===== #
# Use Node.js Alpine image (lightweight version)
FROM node:20-alpine AS deps

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# ===== Stage 2: Builder ===== #
# Build Next.js app
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Build Next.js for production
RUN npm run build

# ===== Stage 3: Runner ===== #
# Production runtime environment
FROM node:20-alpine AS runner

WORKDIR /app

# Set production mode
ENV NODE_ENV production

# Copy only necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]