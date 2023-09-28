import { getAccountBalance, getTransactions, getUser } from "@the-bank/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const transactionRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return getTransactions(ctx.auth.userId);
  }),

  addFounds: protectedProcedure.mutation(() => {
    throw new TRPCError({ code: "NOT_IMPLEMENTED" });
  }),
  getBalance: protectedProcedure.query(({ ctx }) => {
    return getAccountBalance(ctx.auth.userId);
  }),

  create: protectedProcedure
    .input(
      z.object({
        recipientUserId: z.string().min(1),
      }),
    )
    .mutation(async ({ input }) => {
      const recipient = await getUser(input.recipientUserId);

      if (!recipient) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User not found!",
        });
      }

      try {
        throw new TRPCError({ code: "NOT_IMPLEMENTED" });
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            error instanceof Error
              ? error.message
              : "Error creating transaction!",
        });
      }
    }),
});
