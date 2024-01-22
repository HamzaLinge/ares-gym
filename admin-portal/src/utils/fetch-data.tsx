import { getAccessToken } from "@/lib/auth";
import { ICustomError, IErrorAPI } from "@/utils/global-types";

type THttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type THttpBody = string | { [key: string]: any };

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
    headers: {
      "Content-Type": "application/json" | "multipart/form-data";
      Authorization?: string;
    };
  } = { method: "GET", headers: { "Content-Type": "application/json" } };
  if (isProtected) {
    const accessToken = getAccessToken();
    if (!accessToken) {
      throw new Error("No access token found!");
    }
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }
  if (method) options.method = method;
  if (body) {
    if (typeof body !== "string" && (body.file || body.files)) {
      options.headers = {
        ...options.headers,
        "Content-Type": "multipart/form-data",
      };
    } else {
      options.headers = {
        ...options?.headers,
        "Content-Type": "application/json",
      };
    }
    options.body = body;
  } else {
    options.headers = {
      ...options?.headers,
      "Content-Type": "application/json",
    };
  }
  return options;
}

export async function fetchData<ISuccessResponse>({
  url,
  method = "GET",
  body = undefined,
  isProtected = false,
}: TFetchDataProps) {
  const options = getFetchOptions({ method, body, isProtected });
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/${url[0] === "/" ? url : url.substring(1)}`,
      options
    );

    if (!res.ok) {
      const customError: ICustomError = await res.json();
      const errorApi: IErrorAPI = { status: res.status, error: customError };
      return errorApi;
    }
    const response: ISuccessResponse = await res.json();
    return response;
  } catch (error) {
    throw new Error("Something went wrong during Fetch Data");
  }
}
