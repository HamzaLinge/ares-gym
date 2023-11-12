import express, { Application, Request, Response } from "express";
import { config as configDotEnv } from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";
configDotEnv({ path: envFile });

import connectToDatabase from "./config/database";

import { jwtAuthConfig } from "./middlewares/authentications/jwt/jwtAuthConfig";
// import googleAuthConfig from "./middlewares/authentications/google-auth";
// import facebookAuthConfig from "./middlewares/authentications/facebook-auth";

import { authRouter } from "./routes/auth.routes";
import weightliftingRouter from "./routes/weightlifting";

const app: Application = express();
const port = process.env.PORT || 3000;

async function server() {
  try {
    /*
     DATABASE --------------------------------------------------------------------------------------------------------
     */
    await connectToDatabase();

    /*
     MIDDLEWARES and POLICIES ------------------------------------------------------------------------------------------------------
     */
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors({ origin: "*" }));

    // PASSPORT Configuration
    // googleAuthConfig();
    // facebookAuthConfig();
    app.use(passport.initialize());
    jwtAuthConfig();

    /*
     ROUTES ---------------------------------------------------------------------------------------------------------
     */
    // Auth Routes
    app.use("/authentication", authRouter); // Add this line to mount the Task API routes
    // Weightlifting Routes
    app.use("/weightlifting", weightliftingRouter);

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
