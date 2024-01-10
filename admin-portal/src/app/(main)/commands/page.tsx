import { Metadata } from "next";
import { routePaths } from "@/utils/route-paths";

export const metadata: Metadata = {
  title: routePaths.commands.title,
  description: "",
};

export default function CommandsPage() {
  return <section>Commands Page</section>;
}
