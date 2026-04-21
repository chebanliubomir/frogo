import { registerAs } from "@nestjs/config";

export const commonConfig = registerAs('common', () => ({
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
  client_url: process.env.CLIENT_URL,
  database_url: process.env.DATABASE_URL
}));

export const jwtConfig = registerAs('jwt', () => ({
  access_secret: process.env.JWT_ACCESS_SECRET_KEY,
  refresh_secret: process.env.JWT_REFRESH_SECRET_KEY,
}));

export const mailConfig = registerAs('mail', () => ({
  host: process.env.SEND_MAIL_HOST,
  port: process.env.SEND_MAIL_PORT,
  auth: process.env.SEND_MAIL_AUTH,
  user: process.env.SEND_MAIL_AUTH_USER,
  pass: process.env.SEND_MAIL_AUTH_PASS
}))
