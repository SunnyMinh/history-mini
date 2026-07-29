// const TOKEN_KEY = "token";

// export const getStoredToken = () => {
//   return localStorage.getItem(TOKEN_KEY);
// };

// export const saveStoredToken = (token) => {
//   localStorage.setItem(TOKEN_KEY, token);
// };

// export const removeStoredToken = () => {
//   localStorage.removeItem(TOKEN_KEY);
// };

const TOKEN_KEY = "token";
const USER_KEY = "user";

export const getStoredToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getStoredUser = () => {
  const storedUser =
    localStorage.getItem(USER_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch (error) {
    console.error(
      "Không thể đọc user từ localStorage:",
      error
    );

    localStorage.removeItem(USER_KEY);
    return null;
  }
};

export const saveStoredAuth = ({
  token,
  user,
}) => {
  if (!token || !user) {
    throw new Error(
      "Không thể lưu đăng nhập vì thiếu token hoặc user"
    );
  }

  localStorage.setItem(
    TOKEN_KEY,
    token
  );

  localStorage.setItem(
    USER_KEY,
    JSON.stringify(user)
  );
};

export const removeStoredAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};