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

// Expose the app instance for testing
const app = createApp();

export { app };
