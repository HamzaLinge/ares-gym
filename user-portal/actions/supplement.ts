"use server";

import { fetchData } from "@/lib/fetch";
import { CustomClassErrorApi } from "@/types/api";
import { TSupplement } from "@/types/supplement";
import { codeStatusApi } from "@/utils/code-status-api";
import { createQueryURL } from "@/utils/helpers";

const tag = "supplements";

export async function getSupplements(
  filter: Partial<Record<string, string | number>>,
) {
  const url = createQueryURL(filter, "/supplement");

  // console.log({ url });

  const res = await fetchData<{ supplements: TSupplement[] }>({
    url: url,
    tags: [tag],
  });

  if (!res.success) {
    if (res.status === codeStatusApi.NOT_FOUND) {
      return [];
    } else {
      console.error(res);
      throw new CustomClassErrorApi(res);
    }
  }

  return res.data.supplements;
}

export async function getSupplementById(supplementId: string) {
  const res = await fetchData<{ supplement: TSupplement }>({
    url: `/supplement?idSupplement=${supplementId}`,
  });

  if (!res.success) {
    console.error(res);
    throw new CustomClassErrorApi(res);
  }
  return res.data.supplement;
}

export async function getSupplementsBySearchItem(searchItem: string) {
  const res = await fetchData<{ supplements: TSupplement[] }>({
    url: `/supplement/search?search=${searchItem}`,
  });

  if (!res.success) {
    if (res.status === codeStatusApi.NOT_FOUND) {
      return [];
    } else if (res.status === codeStatusApi.BAD_REQUEST) {
      return res.error;
    } else {
      console.error(res);
      throw new CustomClassErrorApi(res);
    }
  }

  return res.data.supplements;
}
