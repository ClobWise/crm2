import { Hono } from 'hono';

import type { AppEnv } from '../Env.js';
import { proxyBuffer } from '../Util/Proxy.js';

export async function makeKeystoneApp(env: AppEnv): Promise<Hono> {
  const app = new Hono();

  app.all('*', async (c) => {
    return proxyBuffer(c, env.apiHost);
  });

  return app;
}
