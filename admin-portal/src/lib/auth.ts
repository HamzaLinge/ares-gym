import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { TToken, TUser } from "@/app/auth/utils/types";

export function isAuthenticated(request: NextRequest) {
  if (request.cookies.has("AresGymStore")) {
    // const str = request.cookies.get("AresGymStore")?.value as string;
    // const json = JSON.parse(str);
    // console.log(json.tokens.accessToken);
    return true;
  }
  return false;
}

export function getAccessToken() {
  if (!cookies().has(process.env.USER_KEY_COOKIE)) {
    return null;
  }
  const userCookieStr = cookies().get(process.env.USER_KEY_COOKIE)
    ?.value as string;
  const userCookieObj: { user: TUser; tokens: TToken } =
    JSON.parse(userCookieStr);
  return userCookieObj.tokens.accessToken;
}
