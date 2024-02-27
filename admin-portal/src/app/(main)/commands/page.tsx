import { Metadata } from "next";
import { routePaths } from "@/utils/route-paths";
import { getCommands } from "@/app/(main)/commands/_utils/actions";
import TableCommand from "@/app/(main)/commands/_components/TableCommand";

export const metadata: Metadata = {
  title: routePaths.commands.title,
  description: "",
};

export default async function CommandsPage() {
  const commands = await getCommands();
  return (
    <section>
      <TableCommand commands={commands} />
    </section>
  );
}
