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

  serve(
    {
      port: 4000,
      fetch: app.fetch,
    },
    (info) => {
      console.log(`🚀 Server ready at ${info.address}:${info.port}`);
    }
  );
}

main();
