const isDev = process.env.NODE_ENV !== 'production';
export const server = isDev
  ? 'http://localhost:3000'
  : 'https://template-sozonome-git-coef-feature-brunodeye.vercel.app';