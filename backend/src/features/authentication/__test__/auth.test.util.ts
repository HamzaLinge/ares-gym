import { faker } from "@faker-js/faker";
import jwt from "jsonwebtoken";

import UserModel, { IUser } from "../../../models/User";
import { CredentialsProviders, Roles } from "../auth.type";
import { getEnv } from "../../../utils/env.util";

export const authTestMethods = {
  createSubscriber: async (): Promise<{
    user: Omit<IUser, "password">;
    password: string;
  }> => {
    try {
      const password = faker.internet.password({ length: 10 });
      const userData = {
        credentialsProvider: { provider: CredentialsProviders.local },
        email: faker.internet.email(),
        password: password,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        role: Roles.subscriber,
      };
      let user: IUser = await UserModel.create(userData);
      delete user.password;
      return { user, password };
    } catch (error) {
      console.error(`Error when creating a new subscriber`);
      throw new Error("Error when creating a new subscriber");
    }
  },
  delete: async (idUser: string): Promise<void> => {
    try {
      await UserModel.findOneAndDelete({ _id: idUser });
    } catch (error) {
      console.error(`Error when deleting user`);
      throw new Error("Error when deleting user");
    }
  },
  getExpiredToken: (): {
    accessToken: string;
    expiresInMilliseconds: number;
  } => {
    try {
      const expiresInMilliseconds = 1;
      const fakeIdUser = faker.database.mongodbObjectId();
      const accessToken = jwt.sign({ fakeIdUser }, getEnv("JWT_SECRET_KEY"), {
        expiresIn: `${expiresInMilliseconds}ms`,
      });
      return { accessToken, expiresInMilliseconds };
    } catch (error) {
      console.error(`Error when getting expired access token => ${error}`);
      throw new Error("Error when getting expired access token");
    }
  },
};
