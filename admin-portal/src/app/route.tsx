export async function GET(request: Request) {
  return Response.redirect(new URL("/auth", request.url));
}
