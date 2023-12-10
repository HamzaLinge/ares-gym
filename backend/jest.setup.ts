import { config as configDotEnv } from "dotenv";

import { createApp } from "./src/createApp";
import {
  closeDatabaseConnection,
  openDatabaseConnection,
} from "./src/config/database";

configDotEnv({ path: ".env.test" });

beforeAll(async () => {
  await openDatabaseConnection();
});

afterAll(async () => {
  await closeDatabaseConnection();
});

// Access Token: This token is from the authentication in a Test Environment (Environment Variables Tests and Database Test)
const authTokenTest =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOiI2NTc1ZGU5ZjBhMjQxY2ZmZTViNTY3ODEiLCJpYXQiOjE3MDIyMjM1MTksImV4cCI6MTcwNDgxNTUxOX0.uHY0gcvKv_uxXxA71tBu1CNaf2MBJMbtontkhDkbJ2c";

// Expose the app instance for testing
const app = createApp();

export { app, authTokenTest };
