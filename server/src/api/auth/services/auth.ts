import bcrypt from "bcrypt";

export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, 10);
};

export const verifyPasswords = (hashedPassword: string, testPassword: string): boolean => {
  return bcrypt.compareSync(testPassword, hashedPassword);
};
