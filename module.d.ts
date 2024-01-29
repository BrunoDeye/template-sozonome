declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    jwtSecretKey: string;
    EMAIL_USERNAME: string;
    EMAIL_PASSWORD: string;
    EMAIL: string;
    NEXTAUTH_SECRET: string;
    CLIENT_ID: string;
    CLIENT_SECRET: string;
    REFRESH_TOKEN: string;
    COMMUNICATION_SERVICES_CONNECTION_STRING: string;
  }
}
