import { Metadata } from "next";
import { routePaths } from "@/utils/route-paths";

export const metadata: Metadata = {
  title: routePaths.dashboard.title,
  description: "",
};

export default function DashboardPage() {
  return <div>Dashboard Page !</div>;
}
