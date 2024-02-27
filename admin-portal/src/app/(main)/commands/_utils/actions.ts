"use server";

import { fetchData } from "@/utils/fetch-data";
import { TCommand } from "@/app/(main)/commands/_utils/types";
import { statusCodeApi } from "@/utils/status-code-api";
import { CustomClassErrorApi } from "@/lib/exceptions";
import { getAccessToken } from "@/lib/auth";

const tag_revalidate_commands_list_after_mutation = "commands";

export async function getCommands() {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    throw new Error("You're unauthorized?");
  }
  const res = await fetchData<{ commands: TCommand[] }>({
    url: "/command",
    accessToken: accessToken,
    tags: [tag_revalidate_commands_list_after_mutation],
  });
  let commands: TCommand[] = [];
  if (!res.success) {
    if (res.status !== statusCodeApi.NOT_FOUND) {
      console.error(res);
      throw new CustomClassErrorApi(res);
    } else {
      return commands;
    }
  }
  commands = res.data.commands;
  return commands;
}
