import { client } from "../../../services/api/client";
import type { Login, Register } from "../types/auth.types";

export const login = async (data: Login) => {
  const res = await client.post("auth/login", data);
  return res.data;
};

export const register = async (data: Register) => {
  const res = await client.post("auth/register", data);
  return res.data;
};
