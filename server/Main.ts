import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { showRoutes } from 'hono/dev';

import { parseEnv } from './Env.js';
import { makeProxyApp } from './Router/Proxy.js';

async function main() {
  const app = new Hono();
  const appEnv = parseEnv();

  app.route('/', await makeProxyApp(appEnv));

  // Print routes for sanity.
  showRoutes(app);

  const url = new URL(appEnv.appHost);

  // The `PORT` environment variable takes precedence
  // over the port in `APP_HOST`.
  const port = Number(process.env.PORT || url.port);

  serve(
    {
      port,
      fetch: app.fetch,
    },
    (info) => {
      console.log(`🚀 Server ready at ${info.address}:${info.port}`);
    }
  );
}

main();
