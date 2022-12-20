declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string;
      ENV: 'test' | 'dev' | 'prod';
    }
  }
}

export {};