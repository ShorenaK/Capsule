import bcrypt from "bcrypt";

let users = [
  {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    // bcrypt hash of "password123"
    passwordHash: bcrypt.hashSync("password123", 10),
  },
];

const normalizeEmail = (email) => email.trim().toLowerCase();

export const createUser = (user) => {
  const newUser = {
    id: users.length + 1,
    ...user,
    email: normalizeEmail(user.email),
  };
  users.push(newUser);
  return { ...newUser };
};

export const findUserByEmail = (email) => {
  const normalized = normalizeEmail(email);
  return users.find((user) => user.email === normalized);
};

export const findUserById = (id) => {
  return users.find((user) => user.id === id);
};

export const getAllUsers = () => {
  return users;
};
