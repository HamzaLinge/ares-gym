import { auth } from "@/auth";

export async function getAccessToken() {
  const session = await auth();
  return session?.accessToken;
}
