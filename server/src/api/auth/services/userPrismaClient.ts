import { PrismaClient } from "../../../generated/prisma";
import { hashPassword } from "./auth";

// extends the user prisma client so all hashing occurs whenever a create or update query is made
const userPrismaClient = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
  omit: {
    user: {
      password: true,
    },
  },
}).$extends({
  query: {
    user: {
      async create({ query, args }) {
        const { password } = args.data;

        const hashedPassword = hashPassword(password);

        args.data.password = hashedPassword;
        return query(args);
      },
      async update({ query, args }) {
        if (args.data.password) {
          const { password } = args.data;
          const hashedPassword = hashPassword(password as string);

          args.data.password = hashedPassword;
        }
        return query(args);
      },
    },
  },
});

export default userPrismaClient;
