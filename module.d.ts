declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    jwtSecretKey: string;
    EMAIL_PASSWORD: string;
    EMAIL: string;
    NEXTAUTH_SECRET: string;
  }
}