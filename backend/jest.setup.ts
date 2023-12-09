import { config as configDotEnv } from "dotenv";

import { createApp } from "./src/createApp";
import {
  openDatabaseConnection,
  closeDatabaseConnection,
} from "./src/config/database";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";
configDotEnv({ path: envFile });

beforeAll(async () => {
  await openDatabaseConnection();
});

afterAll(async () => {
  await closeDatabaseConnection();
});

// JWT Access Token
const authTokenTest =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOiI2NTRmZTljYzFhNGVhYjAyMjNhMDZmOTQiLCJpYXQiOjE3MDIxMjk4MjksImV4cCI6MTcwNDcyMTgyOX0.rOKwLFgr93IjS5d5YNWv-uww_fPOWQv0w8cn0FbPH9Y";

// Expose the app instance for testing
const app = createApp();

export { app, authTokenTest };
