import jwt from "jsonwebtoken";

import { getEnv } from "./env.util";
import { TTokens } from "../features/authentication/auth.type";

// Consider moving these to a configuration file or environment variables
const expiresInAccessToken = 30 * 24 * 60 * 60; // 30 days in seconds
const expiresInRefreshToken = 40 * 24 * 60 * 60; // 40 days in seconds

export function getTokens(idUser: string): TTokens {
  let accessToken: string;
  let refreshToken: string;

  try {
    accessToken = jwt.sign({ idUser }, getEnv("JWT_SECRET_KEY"), {
      expiresIn: expiresInAccessToken,
    });

    refreshToken = jwt.sign({ idUser }, getEnv("JWT_REFRESH_SECRET_KEY"), {
      expiresIn: expiresInRefreshToken,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error generating tokens: " + error.message);
      throw new Error("Error generating tokens: " + error.message);
    } else {
      console.log("Unknown error occurred in token generation");
      throw new Error("Unknown error occurred in token generation");
    }
  }

  const dateNowSeconds = Math.floor(Date.now() / 1000);
  const expiresAccessToken = dateNowSeconds + expiresInAccessToken;
  const expiresRefreshToken = dateNowSeconds + expiresInRefreshToken;

  return {
    accessToken,
    refreshToken,
    expiresAccessToken,
    expiresRefreshToken,
  };
}
