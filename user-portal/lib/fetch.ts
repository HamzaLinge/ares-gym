import { ICustomError, IErrorAPI, ISuccessAPI } from "@/types/api";

type THttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type THttpBody = FormData | Partial<Record<string, unknown>>;

type TFetchDataProps = {
  url: string;
  method?: THttpMethod;
  body?: THttpBody;
  isMultipartFormData?: boolean;
  accessToken?: string;
  tags?: string[];
  cache?: boolean;
};

export async function fetchData<Interface>(props: TFetchDataProps) {
  const fetchOptions = getFetchOptions(props);
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/${props.url[0] === "/" ? props.url.substring(1) : props.url}`,
      fetchOptions,
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
  method = "GET",
  body,
  isMultipartFormData = false,
  accessToken,
  tags,
  cache,
}: Omit<TFetchDataProps, "url">) {
  const options: {
    method: THttpMethod;
    body?: string | FormData;
    headers?: {
      "Content-Type"?: "application/json";
      Authorization?: string;
    };
    next?: { tags?: string[] };
    cache?: "no-store";
  } = { method: "GET" };
  if (method) options.method = method;

  if (accessToken) {
    options.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  }

  if (isMultipartFormData) {
    if (body && body instanceof FormData) options.body = body;
  } else {
    options.headers = {
      ...options.headers,
      "Content-Type": "application/json",
    };
    if (body) {
      if (body instanceof FormData) {
        options.body = JSON.stringify(Object.fromEntries(body));
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
  return options;
}
