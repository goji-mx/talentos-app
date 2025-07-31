// utils/storage.ts
import type { User } from "../types/user";

export const getUsers = (): User[] => {
  const data = localStorage.getItem('users');
  return data ? JSON.parse(data) : [];
};

export const saveUser = (user: User) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
};

export const findUser = (email: string, password: string): User | null => {
  const users = getUsers();
  return users.find(u => u.email === email && u.password === password) || null;
};

export const setCurrentUser = (user: User) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const getCurrentUser = (): User | null => {
  const data = localStorage.getItem('currentUser');
  return data ? JSON.parse(data) : null;
};

export const logout = () => {
  localStorage.removeItem('currentUser');
};