"use server";

import { fetchData } from "@/lib/fetch";
import { OrderSchema } from "@/schemas";
import { TCommand } from "@/types/order";
import { z } from "zod";

export async function orderCommand(inputs: z.infer<typeof OrderSchema>) {
  const res = await fetchData<{ command: TCommand }>({
    url: "/command",
    method: "POST",
    body: inputs,
  });
  return res;
  //   if (!res.success) {
  //     console.error({ orderCommandError: res });
  //     return res.error;
  //   }
  //   return res.data.command;
}
