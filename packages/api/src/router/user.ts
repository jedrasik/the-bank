import { getAccountBalance } from "@the-bank/db";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  balance: protectedProcedure.query(({ ctx, input }) => {
    return getAccountBalance(input.clerkUserID);
  }),
  all: protectedProcedure.query(() => {
    throw new TRPCError({ code: "NOT_IMPLEMENTED" });
  }),
});
