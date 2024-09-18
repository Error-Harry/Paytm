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
	password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
})

export { signUpSchema, signInSchema, updateUserSchema };
