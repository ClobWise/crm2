import { z } from 'zod';

export type AppEnv = {
  appHost: string;
  apiHost: string;
};

const envDecoder = z.object({
  APP_HOST: z.string(),
  API_HOST: z.string(),
});

export function parseEnv(): AppEnv {
  const env = process.env;
  const parsedEnv = envDecoder.parse(env);

  return {
    appHost: parsedEnv.APP_HOST,
    apiHost: parsedEnv.API_HOST,
  };
}
