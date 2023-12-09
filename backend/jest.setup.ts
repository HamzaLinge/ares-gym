import {
  openDatabaseConnection,
  closeDatabaseConnection,
} from "./src/config/database";

import { createApp } from "./src";

beforeAll(async () => {
  await openDatabaseConnection();
});

afterAll(async () => {
  await closeDatabaseConnection();
});

// Expose the app instance for testing
const app = createApp();
export { app };
