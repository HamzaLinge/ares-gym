"use server";

import { fetchData } from "@/lib/fetch";
import { CustomClassErrorApi } from "@/types/api";
import { TSupplement } from "@/types/supplement";
import { codeStatusApi } from "@/utils/code-status-api";

const tag = "supplements";

export async function getSupplements(filter: Partial<Record<string, string>>) {
  const url = Object.entries(filter).reduce((accumulator, currentValue) => {
    if (!currentValue) return accumulator;
    const hasQueryParams = /\?.+/;
    if (hasQueryParams.test(accumulator)) {
      return accumulator + `&${currentValue[0]}=${currentValue[1]}`;
    }
    return accumulator + `?${currentValue[0]}=${currentValue[1]}`;
  }, "/supplement");

  console.log({ url });

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
