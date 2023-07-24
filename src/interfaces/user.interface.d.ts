export interface User {
  id: number;
  name: string;
  fullName: string;
  age: number;
  single: boolean;
}

export type NewUser = Omit<User, "id">;
