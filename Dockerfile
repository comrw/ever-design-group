FROM node:22-bookworm-slim AS dependencies
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM dependencies AS builder
WORKDIR /app
ARG NEXT_PUBLIC_ENQUIRY_ENDPOINT=""
ARG NEXT_PUBLIC_FILM_SRC=""
ARG NEXT_PUBLIC_FILM_TYPE=""
ARG NEXT_PUBLIC_FILM_CAPTIONS_SRC=""
ARG NEXT_PUBLIC_FILM_CAPTIONS_LANG="en"
ENV NEXT_PUBLIC_ENQUIRY_ENDPOINT=$NEXT_PUBLIC_ENQUIRY_ENDPOINT \
    NEXT_PUBLIC_FILM_SRC=$NEXT_PUBLIC_FILM_SRC \
    NEXT_PUBLIC_FILM_TYPE=$NEXT_PUBLIC_FILM_TYPE \
    NEXT_PUBLIC_FILM_CAPTIONS_SRC=$NEXT_PUBLIC_FILM_CAPTIONS_SRC \
    NEXT_PUBLIC_FILM_CAPTIONS_LANG=$NEXT_PUBLIC_FILM_CAPTIONS_LANG
COPY . .
RUN npm run build

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server.js"]
