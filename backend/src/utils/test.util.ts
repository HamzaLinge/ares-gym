import UserModel, { IUser } from "../models/User";
import { CredentialsProviders, Roles } from "../types/common.type";
import { getTokens } from "./jwtHelper";

export async function getAccessTokenSubscriberTest(): Promise<
  string | undefined
> {
  try {
    const user: IUser | null = await UserModel.findOne({
      email: process.env.EMAIL_SUBSCRIBER_TEST as string,
    });
    if (user) {
      const tokens = await getTokens(user._id.toString());
      return tokens.accessToken;
    } else {
      const user = await UserModel.create({
        credentialsProvider: { provider: CredentialsProviders.local },
        email: process.env.EMAIL_SUBSCRIBER_TEST as string as string,
        password: process.env.PASSWORD_SUBSCRIBER_TEST as string,
        firstName: process.env.FIRSTNAME_SUBSCRIBER_TEST as string,
        lastName: process.env.LASTNAME_SUBSCRIBER_TEST as string,
        phoneNumber: process.env.PHONENUMBER_SUBSCRIBER_TEST as string,
        gender: process.env.GENDER_SUBSCRIBER_TEST as string,
        birthday: process.env.BIRTHDAY_SUBSCRIBER_TEST as string,
        role: Roles.subscriber,
      });
      const tokens = await getTokens(user._id.toString());
      return tokens.accessToken;
    }
  } catch (error) {
    console.error(
      `Something went wrong during getting access token for admin tests => ${error}`
    );
    return undefined;
  }
}

export async function getAccessTokenAdminTest(): Promise<string | undefined> {
  try {
    const user: IUser | null = await UserModel.findOne({
      email: process.env.EMAIL_ADMIN_TEST as string,
    });
    if (user) {
      const tokens = await getTokens(user._id.toString());
      return tokens.accessToken;
    } else {
      const user = await UserModel.create({
        credentialsProvider: { provider: CredentialsProviders.local },
        email: process.env.EMAIL_ADMIN_TEST as string as string,
        password: process.env.PASSWORD_ADMIN_TEST as string,
        firstName: process.env.FIRSTNAME_ADMIN_TEST as string,
        lastName: process.env.LASTNAME_ADMIN_TEST as string,
        phoneNumber: process.env.PHONENUMBER_ADMIN_TEST as string,
        gender: process.env.GENDER_ADMIN_TEST as string,
        birthday: process.env.BIRTHDAY_ADMIN_TEST as string,
        role: Roles.admin,
      });
      const tokens = await getTokens(user._id.toString());
      return tokens.accessToken;
    }
  } catch (error) {
    console.error(
      `Something went wrong during getting access token for admin tests => ${error}`
    );
    return undefined;
  }
}

export const expectedRuleErrorsFields = {
  type: "field",
  location: expect.anything(),
  path: expect.any(String),
  value: expect.anything(),
  msg: expect.anything(),
};

// Set up end date to be sure that it is after the current date
export const getEndDate = (days: number = 1) => {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + days);
  return endDate.toISOString();
};
