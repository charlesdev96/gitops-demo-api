# ---- Stage 1: builder - install dependencies ----
FROM node:24-alpine AS builder
WORKDIR /app

COPY package.json ./
RUN npm install

COPY src ./src

# ---- Stage 2: runner - production runtime only ----
FROM node:24-alpine AS runner
ENV NODE_ENV=production
ENV PORT=3000
WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev && npm cache clean --force

COPY --from=builder /app/src ./src

# Use the non-root Node.js user included in the official image.
USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://127.0.0.1:3000/health', (res) => process.exit(res.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

CMD ["node", "src/server.js"]
