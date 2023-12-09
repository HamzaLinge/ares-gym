import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport";

import { jwtAuthConfig } from "./middlewares/auth/jwt/jwtAuthConfig";
import authRouter from "./features/authentication/auth.routes";
import fileRouter from "./features/file/file.route";
import discountRouter from "./features/discount/discount.route";
import proteinRouter from "./features/protein/protein.route";
import commandRouter from "./features/command/command.route";
import centralizedErrors from "./middlewares/centralizedErrors";

export function createApp(): Application {
  const app = express();

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
  // Test Route
  app.get("/test", (req, res) => res.status(200).send("Works Well !"));
  // Auth Routes
  app.use("/authentication", authRouter); // Add this line to mount the Task API routes
  // Files Routes
  app.use("/files", fileRouter);
  // Discount Routes
  app.use("/discount", discountRouter);
  // Protein Routes
  app.use("/protein", proteinRouter);
  // Shopping Routes
  app.use("/command", commandRouter);

  /*
     CENTRALIZED ERRORS Middleware
     */
  app.use(centralizedErrors);

  return app;
}
