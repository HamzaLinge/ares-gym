import UserModel, { IUser } from "../models/User";
import { getTokens } from "./jwt.util";
import {
  CredentialsProviders,
  Roles,
  TToken,
} from "../features/authentication/auth.type";

export async function getSubscriberTest(): Promise<{
  user: Omit<IUser, "password">;
  tokens: TToken;
}> {
  try {
    const user: IUser | null = await UserModel.findOne({
      email: process.env.EMAIL_SUBSCRIBER_TEST as string,
    });
    if (user) {
      const tokens = await getTokens(user._id.toString());
      return { user, tokens };
    } else {
      const user = (await UserModel.create({
        credentialsProvider: { provider: CredentialsProviders.local },
        email: process.env.EMAIL_SUBSCRIBER_TEST as string as string,
        password: process.env.PASSWORD_SUBSCRIBER_TEST as string,
        firstName: process.env.FIRSTNAME_SUBSCRIBER_TEST as string,
        lastName: process.env.LASTNAME_SUBSCRIBER_TEST as string,
        phoneNumber: process.env.PHONENUMBER_SUBSCRIBER_TEST as string,
        gender: process.env.GENDER_SUBSCRIBER_TEST as string,
        birthday: process.env.BIRTHDAY_SUBSCRIBER_TEST as string,
        role: Roles.subscriber,
      })) as IUser;
      const tokens = await getTokens(user._id.toString());
      return { user, tokens };
    }
  } catch (error) {
    console.error(
      `Something went wrong during getting Subscriber user for tests => ${error}`
    );
    throw new Error(
      "Something went wrong during getting Subscriber user for tests"
    );
  }
}

export async function getAdminTest(): Promise<{
  user: Omit<IUser, "password">;
  tokens: TToken;
}> {
  try {
    let user: IUser | null = await UserModel.findOne({
      email: process.env.EMAIL_ADMIN_TEST as string,
    });
    if (user) {
      const tokens = await getTokens(user._id.toString());
      delete user.password;
      return { user, tokens };
    } else {
      let user = (await UserModel.create({
        credentialsProvider: { provider: CredentialsProviders.local },
        email: process.env.EMAIL_ADMIN_TEST as string as string,
        password: process.env.PASSWORD_ADMIN_TEST as string,
        firstName: process.env.FIRSTNAME_ADMIN_TEST as string,
        lastName: process.env.LASTNAME_ADMIN_TEST as string,
        phoneNumber: process.env.PHONENUMBER_ADMIN_TEST as string,
        gender: process.env.GENDER_ADMIN_TEST as string,
        birthday: process.env.BIRTHDAY_ADMIN_TEST as string,
        role: Roles.admin,
      })) as IUser;
      const tokens = await getTokens(user._id.toString());
      delete user.password;
      return { user, tokens };
    }
  } catch (error) {
    console.error(
      `Something went wrong during getting Admin user for tests => ${error}`
    );
    throw new Error("Something went wrong during getting Admin user for tests");
  }
}

export const expectedRuleErrorsFields = {
  type: "field",
  location: expect.anything(),
  path: expect.any(String),
  value: expect.anything(),
  msg: expect.anything(),
};
