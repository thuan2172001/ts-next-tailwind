FROM node:16.13.0-alpine as deps

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn install --frozen-lockfile


FROM node:16.13.0-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
COPY . .
ARG NEXT_PUBLIC_API_BASE_URL
RUN yarn build

FROM node:16.13.0-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/next-i18next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/entrypoint.sh .
RUN chmod +x /app/entrypoint.sh
USER nextjs

ENTRYPOINT [ "/app/entrypoint.sh" ]
