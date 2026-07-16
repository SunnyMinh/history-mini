async function request(endpoint) {
  const token = localStorage.getItem("token");

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      Accept: "application/json",

      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
    },
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Lỗi API ${response.status}: ${errorText}`
    );
  }

  return response.json();
}

export function getPeriods() {
  return request("/api/periods");
}

export function getEvents() {
  return request("/api/events");
}