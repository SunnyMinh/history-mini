import apiClient from "./apiClient";

export function registerUser(
  username,
  usermail,
  password
) {
  return apiClient.post(
    "/auth/register",
    {
      username,
      usermail,
      password,
    }
  );
}

export function loginUser(
  username,
  password
) {
  return apiClient.post(
    "/auth/login",
    {
      username,
      password,
    }
  );
}

export function getCurrentUser() {
  return apiClient.get("/auth/me");
}