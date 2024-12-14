import { z } from 'zod';

export type AppEnv = {
  appHost: string;
  apiHost: string;
  mode: 'development' | 'production';
};

const envDecoder = z.object({
  APP_HOST: z.string(),
  API_HOST: z.string(),
  MODE: z.union([z.literal('development'), z.literal('production')]),
});

export function parseEnv(): AppEnv {
  const env = process.env;
  const parsedEnv = envDecoder.parse(env);

  return {
    appHost: parsedEnv.APP_HOST,
    apiHost: parsedEnv.API_HOST,
    mode: parsedEnv.MODE,
  };
}
