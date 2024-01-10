import { Metadata } from "next";
import { routePaths } from "@/utils/route-paths";

export const metadata: Metadata = {
  title: routePaths.settings.title,
  description: "",
};

export default function SettingsPage() {
  return <section>Settings Page</section>;
}
