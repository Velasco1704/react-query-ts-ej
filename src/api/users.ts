import axios from "axios";
import { NewUser, User } from "../interfaces/user.interface";

const usersApi = axios.create({
  baseURL: "http://localhost:3000",
});

export const getUsers = async (): Promise<User[]> =>
  await usersApi.get("/users").then((res) => res.data);

export const createUser = async (newUser: NewUser) =>
  await usersApi.post("/users", newUser);

export const updateUser = async (payload: User) =>
  await usersApi.put(`users/${payload.id}`, payload);

export const deleteUser = async (id: number) =>
  await usersApi.delete(`/users/${id}`);
