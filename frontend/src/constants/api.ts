const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/";

export const endpoints = {
  googleRegister: `${API_URL}register/google`,
};
