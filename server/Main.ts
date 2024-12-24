import { serve } from '@hono/node-server';
import { makeProxyApp } from '@webf/ui-server/App/Proxy.js';
import { makeUIApp } from '@webf/ui-server/App/UI.js';
import { Hono } from 'hono';
import { showRoutes } from 'hono/dev';
import { logger } from 'hono/logger';

import { parseEnv } from './Env.js';

async function main() {
  const app = new Hono();
  const appEnv = parseEnv();

  const uiApp = await makeUIApp({
    url: appEnv.mode === 'development' ? 'http://localhost:4002' : './dist/ui',
    index: 'main.html',
  });

  const keystonApp = await makeProxyApp({
    url: appEnv.apiHost,
  });

  app.use(logger());
  app.route('/v2', uiApp);
  app.route('/', keystonApp);

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
