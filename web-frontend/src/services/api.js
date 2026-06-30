
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiRequest = async (
  endpoint,
  { method = "GET", body, headers = {}, token } = {},
) => {
  const options = {
    method,
    headers: {
      ...headers,
    },
  };

  if (body instanceof FormData) {
    options.body = body;
  } else if (body) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
  }

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  
  const contentType = response.headers.get("content-type");
  let data;

  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  } else {
    const errorText = await response.text();
    throw new Error(errorText || `Request failed with status ${response.status}`);
  }

  if (!response.ok) {
    throw new Error(data.message || "Something went Wrong");
  }

  return data;
};
