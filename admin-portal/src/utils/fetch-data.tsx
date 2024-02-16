import { getAccessToken } from "@/lib/auth";
import { ICustomError, IErrorAPI, ISuccessAPI } from "@/utils/global-types";
import { filterDataForm } from "@/utils/data-form";

type THttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type THttpBody = string | FormData | {};

type TFetchDataProps = {
  url: string;
  method?: THttpMethod;
  body?: THttpBody;
  isMultipartFormData?: boolean;
  isProtected?: boolean;
  tags?: string[];
  cache?: boolean;
};

export async function fetchData<Interface>({
  url,
  method = "GET",
  body = undefined,
  isMultipartFormData = false,
  isProtected = false,
  tags,
  cache,
}: TFetchDataProps) {
  const fetchOptions = getFetchOptions({
    method,
    body,
    isMultipartFormData,
    isProtected,
    tags,
    cache,
  });
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/${url[0] === "/" ? url.substring(1) : url}`,
      fetchOptions
    );

    if (!res.ok) {
      const customError: ICustomError = await res.json();
      const errorApi: IErrorAPI = {
        status: res.status,
        success: false,
        error: customError,
      };
      return errorApi;
    }
    const response: Interface = await res.json();
    const result: ISuccessAPI<Interface> = {
      status: res.status,
      success: true,
      data: response,
    };
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong during Fetch Data");
  }
}

function getFetchOptions({
  method,
  body,
  isMultipartFormData,
  isProtected,
  tags,
  cache,
}: Omit<TFetchDataProps, "url" | "body"> & { body?: FormData }) {
  let options: {
    method: THttpMethod;
    body?: THttpBody;
    headers?: {
      "Content-Type"?: "application/json";
      Authorization?: string;
    };
    next?: { tags?: string[] };
    cache?: "no-store";
  } = { method: "GET" };
  if (method) options.method = method;

  if (isProtected) {
    const accessToken = getAccessToken();
    if (!accessToken) {
      throw new Error("No access token found!");
    }
    options.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  }

  if (isMultipartFormData) {
    if (body) options.body = filterDataForm(body);
  } else {
    options.headers = {
      ...options.headers,
      "Content-Type": "application/json",
    };
    if (body) {
      if (body instanceof FormData) {
        options.body = JSON.stringify(Object.fromEntries(filterDataForm(body)));
      } else {
        options.body = JSON.stringify(body);
      }
    }
  }

  if (tags) {
    options.next = { tags: tags };
  }

  if (!cache) {
    options.cache = "no-store";
  }

  // console.log(options);
  return options;
}
