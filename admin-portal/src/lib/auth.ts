import { NextRequest } from "next/server";

export function isAuthenticated(request: NextRequest) {
  if (request.cookies.has("AresGymStore")) {
    // const str = request.cookies.get("AresGymStore")?.value as string;
    // const json = JSON.parse(str);
    // console.log(json.tokens.accessToken);
    return true;
  }
  return false;
}
