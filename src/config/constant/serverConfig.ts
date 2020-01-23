
import dotenv from "dotenv";
const envFound = dotenv.config();
if (!envFound) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export const serverConfig = {
  databaseURL: process.env.MONGODB_URI,
  jwtExpiration: process.env.jWT_EXPIRATION,
  jwtSecret: process.env.JWT_SECRET,
  port: parseInt(process.env.PORT, 10),
};
