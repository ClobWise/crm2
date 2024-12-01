FROM node:22.11.0-alpine

WORKDIR /app

ENV NODE_ENV=production

RUN apk update && apk add --no-cache bash supervisor

# Setup supervisord to run two servers.
RUN mkdir -p /var/log/supervisor
COPY script/supervisord.conf .

# Setup npm modules
COPY package.json .
RUN npm install --omit=dev

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
