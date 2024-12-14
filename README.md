# CRM

CRM built on top of Keystone.js.

## Setup

- Ensure you have Postgres 16.4.
- Ensure you have Node.js v22.12.0.

Spin up database using docker image or if you already have Postgres locally installed, use that:

```bash
# Create data volume
docker volume create pg-data-vol

# Run postgres
docker run -d --rm \
  -p 5432:5432 \
  -e POSTGRES_PASSWORD=postgres \
  -e PGDATA=/var/lib/postgresql/data/pgdata \
  --mount source=pg-data-vol,target=/var/lib/postgresql/data \
  postgres:16.4
```

Then, start the local development server using `npm run dev`. This command internally starts three processes:

- The Rsbuild for UI bundling.
- The Keystone server.
- The Hono.js application server.

## Topology

This application is packaged as a single docker image. In development mode, Hono.js server is a front-server responsible for proxying the requests to the Keystone and Rsbuild. In production, the compiled version of the UI is served by Hono.js directly from file system.
