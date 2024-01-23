import { getAccessToken } from "@/lib/auth";
import { ICustomError, IErrorAPI, ISuccessAPI } from "@/utils/global-types";

type THttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type THttpBody = string | { [key: string]: any } | FormData;

type TFetchDataProps = {
  url: string;
  method: THttpMethod;
  body?: THttpBody;
  isProtected?: boolean;
};

function getFetchOptions({
  method,
  body = undefined,
  isProtected = false,
}: {
  method: THttpMethod;
  body?: THttpBody;
  isProtected?: boolean;
}) {
  let options: {
    method: THttpMethod;
    body?: THttpBody;
    headers?: {
      "Content-Type"?: "application/json";
      Authorization?: string;
    };
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

  if (body) {
    if (body instanceof FormData) {
      options.body = body;
    } else {
      options.headers = {
        ...options?.headers,
        "Content-Type": "application/json",
      };
      options.body = JSON.stringify(body);
    }
  } else {
    options.headers = {
      ...options?.headers,
      "Content-Type": "application/json",
    };
  }
  return options;
}

export async function fetchData<Interface>({
  url,
  method = "GET",
  body = undefined,
  isProtected = false,
}: TFetchDataProps) {
  const options = getFetchOptions({ method, body, isProtected });
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/${url[0] === "/" ? url.substring(1) : url}`,
      options
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
