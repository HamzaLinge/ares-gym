import { Metadata } from "next";
import { routePaths } from "@/utils/route-paths";

export const metadata: Metadata = {
  title: routePaths.users.title,
  description: "",
};

export default function UsersPage() {
  return <section>Users Page</section>;
}
