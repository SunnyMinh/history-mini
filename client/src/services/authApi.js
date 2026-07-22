import apiClient from "./axiosInstance";

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
