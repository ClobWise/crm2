import { Hono, type Context } from 'hono';

import type { AppEnv } from '../Env.js';
import { makeUrl, proxy, proxyBuffer } from '../Util/Proxy.js';

export async function makeUIApp(env: AppEnv): Promise<Hono> {
  return await devServerApp();
}

async function devServerApp() {
  const UI_HOST = 'http://localhost:4002';
  const app = new Hono();

  const fetchRSBuild = (url: string, incoming: Headers) => {
    const headers = new Headers(incoming);

    headers.delete('cookie');
    headers.delete('host');

    return fetch(url, { headers });
  };

  app.get('/:filename{(.+\\..+$)|^@.+}', (c) => {
    return proxyBuffer(c, UI_HOST);
  });

  app.get('/public/*', (c) => {
    const url = `${UI_HOST}/public.html`;

    return fetchRSBuild(url, c.req.raw.headers);
  });

  app.get('*', async (c) => {
    const url = makeUrl(c.req.url, UI_HOST);

    const response = await fetchRSBuild(url, c.req.raw.headers);
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
