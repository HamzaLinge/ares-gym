import { config as configDotEnv } from "dotenv";

import { openDatabaseConnection } from "./config/database";
import { createApp } from "./createApp";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : process.env.NODE_ENV === "test"
    ? ".env.test"
    : ".env.development";
configDotEnv({ path: envFile });

async function server() {
  try {
    const port = process.env.PORT || 3001;
    /*
     CONNECT TO THE DATABASE -----------------------------------------------------------------------------------------
     */
    await openDatabaseConnection();

    /*
     APP SETUP ------------------------------------------------------------------------------------------------------
     */
    const app = createApp();

    /*
     LISTENING -------------------------------------------------------------------------------------------------------
     */
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (errorLunchServer) {
    console.log(`Something went wrong during lunch server ${errorLunchServer}`);
  }
}

server();
