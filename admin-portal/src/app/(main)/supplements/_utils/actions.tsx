"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { ISupplement } from "@/app/(main)/supplements/_utils/types";

import { CustomClassErrorApi } from "@/lib/exceptions";
import { fetchData } from "@/utils/fetch-data";
import { routePaths } from "@/utils/route-paths";

const tag_revalidate_supplements_list_after_mutation = "supplements";

export async function getSupplements() {
  const res = await fetchData<{ supplements: ISupplement[] }>({
    url: "/supplement",
    tags: [tag_revalidate_supplements_list_after_mutation],
  });
  return res;
}

export async function getSupplementById(idSupplement: string) {
  const res = await fetchData<{ supplement: ISupplement }>({
    url: `/supplement?idSupplement=${idSupplement}`,
    cache: false,
  });
  if (!res.success) {
    console.error(res);
    throw new CustomClassErrorApi(res);
  }
  return res.data.supplement;
}

export async function createSupplement(_: any, formData: FormData) {
  const res = await fetchData<{ supplement: ISupplement }>({
    url: "/supplement",
    method: "POST",
    body: formData,
    isMultipartFormData: true,
    isProtected: true,
  });
  if (!res.success) {
    return res;
  }
  revalidateTag(tag_revalidate_supplements_list_after_mutation);
  redirect(routePaths.supplements.path);
}

export async function deleteSupplement(idSupplement: string) {
  const res = await fetchData<{ deletedIdSupplement: string }>({
    url: `/supplement/${idSupplement}`,
    method: "DELETE",
    isProtected: true,
  });
  if (!res.success) {
    return res;
  }
  revalidateTag(tag_revalidate_supplements_list_after_mutation);
  redirect(routePaths.supplements.path);
}

export async function deleteThumbnailSupplement({
  idSupplement,
  idThumbnail,
}: {
  idSupplement: string;
  idThumbnail: string;
}) {
  const res = await fetchData<{ deletedIdThumbnail: string }>({
    url: `/supplement/${idSupplement}/file/${idThumbnail}`,
    method: "DELETE",
    isProtected: true,
  });
  if (!res.success) {
    return res;
  }
  revalidateTag(tag_revalidate_supplements_list_after_mutation);
  redirect(routePaths.supplements.children.supplement.path(idSupplement));
}

export async function updateSupplement(
  stateFormProduct: { idSupplement: string },
  formData: FormData
) {
  const res = await fetchData<{ supplement: ISupplement }>({
    url: `/supplement/${stateFormProduct.idSupplement}`,
    method: "PUT",
    body: formData,
    isProtected: true,
  });
  if (!res.success) {
    console.error(res);
    return res;
  }
  revalidateTag(tag_revalidate_supplements_list_after_mutation);
  redirect(
    routePaths.supplements.children.supplement.path(
      stateFormProduct.idSupplement
    )
  );
}

export async function updateThumbnailsSupplement(
  { idSupplement }: { idSupplement: string },
  formData: FormData
) {
  const res = await fetchData<{ supplement: ISupplement }>({
    url: `/supplement/files/${idSupplement}`,
    method: "PUT",
    body: formData,
    isMultipartFormData: true,
    isProtected: true,
  });
  if (!res.success) {
    console.error(res);
    return res;
  }
  revalidateTag(tag_revalidate_supplements_list_after_mutation);
  redirect(routePaths.supplements.children.supplement.path(idSupplement));
}
