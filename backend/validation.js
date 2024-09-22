import { z } from "zod";

const signUpSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  password: z.string(),
});

const signInSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const updateUserSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

const moneyTransferSchema = z.object({
  to: z.string(),
  amount: z.number(),
});

export { signUpSchema, signInSchema, updateUserSchema, moneyTransferSchema };
