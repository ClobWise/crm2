import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { showRoutes } from 'hono/dev';

import { parseEnv } from './Env.js';
import { makeKeystoneApp } from './Router/Keystone.js';
import { makeUIApp } from './Router/UI.js';

async function main() {
  const app = new Hono();
  const appEnv = parseEnv();

  app.route('/v2', await makeUIApp(appEnv));
  app.route('/', await makeKeystoneApp(appEnv));

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
