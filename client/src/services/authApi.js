export async function registerUser(
  username,
  usermail,
  password
) {
  const response = await fetch(
    "/api/auth/register",
    {
      method: "POST",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username,
        usermail,
        password,
      }),
    }
  );

  let result;

  try {
    result = await response.json();
  } catch {
    throw new Error(
      "Server trả về dữ liệu không hợp lệ"
    );
  }

  if (!response.ok) {
    throw new Error(
      result.message ||
        `Đăng ký thất bại (${response.status})`
    );
  }

  return result;
}

export async function loginUser(username, password) {
  const response = await fetch("/api/auth/login", {
    method: "POST",

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      username,
      password,
    }),
  });

  let result;

  try {
    result = await response.json();
  } catch {
    throw new Error("Server trả về dữ liệu không hợp lệ");
  }

  if (!response.ok) {
    throw new Error(
      result.message || `Đăng nhập thất bại (${response.status})`
    );
  }

  return result;
}