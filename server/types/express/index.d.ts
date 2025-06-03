import { User } from "../../src/generated/prisma";
export {};

declare global {
  namespace Express {
    export interface Request {
      user?: Partial<User>;
    }
  }
}
