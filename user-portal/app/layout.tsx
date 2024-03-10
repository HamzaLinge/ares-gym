import LayoutNavigation from "@/components/layout-navigation";
import { cn } from "@/lib/utils";
import "@/style/globals.css";
import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const lato = Lato({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ares Nutrition",
  description: "Powered by Ares Gym",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("", lato.className)}>
        <LayoutNavigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
