import { Hono, type Context } from 'hono';

import type { AppEnv } from '../Env.js';
import { proxy, proxyBuffer } from '../Util/Proxy.js';

export async function makeUIApp(_env: AppEnv): Promise<Hono> {
  return await devServerApp();
}

async function devServerApp() {
  const UI_HOST = 'http://localhost:4002';
  const app = new Hono();

  app.get('/:filename{(.+\\..+$)|^@.+}', (c) => {
    return proxyBuffer(c, UI_HOST);
  });

  app.get('*', async (c) => {
    const response = await proxy(c, UI_HOST);
    const content = await response.text();

    return serveMain(c, content);
  });

  return app;
}

async function serveMain(c: Context, content: string) {
  const htmlResponse = await serveHTML(c, content);

  return htmlResponse;
}

async function serveHTML(c: Context, content: string) {
  c.header('content-type', 'text/html');
  c.header('cache-control', 'no-cache');

  return c.html(content, 200);
}
