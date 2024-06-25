import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });
const {
    DATABASE_URL,
    BCRYPT_SALT_ROUNDS,
    JWT_SECRET,
    JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRES_IN,
    JWT_EXPIRES_IN,
    PORT,
    NODE_ENV
} = process.env;
export default {
  env: NODE_ENV,
  port: PORT,
  database_url: DATABASE_URL,
  bcrypt_salt_rounds: BCRYPT_SALT_ROUNDS,
  jwt: {
    secret: JWT_SECRET,
    refresh_secret: JWT_REFRESH_SECRET,
    refresh_expires_in: JWT_REFRESH_EXPIRES_IN,
    expires_in: JWT_EXPIRES_IN,
  },
};
