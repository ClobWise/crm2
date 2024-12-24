FROM node:22.12.0-alpine

WORKDIR /app

ENV NODE_ENV=production

# openssl is requried for prisma
RUN apk update && apk add --no-cache openssl bash supervisor

# Setup supervisord to run two servers.
RUN mkdir -p /var/log/supervisor
COPY script/supervisord.conf .

# Setup npm modules
# RUN npm config set loglevel verbose
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy compiled files
COPY dist dist
COPY server/package.json dist
COPY keystone/.keystone keystone/.keystone/

# Keystone migrations and schema
COPY keystone/schema.* keystone/
COPY keystone/migrations keystone/migrations

# Generate prisma client
RUN npx prisma generate --schema keystone/schema.prisma

EXPOSE 4000 4001

CMD ["supervisord", "-c", "supervisord.conf"]
