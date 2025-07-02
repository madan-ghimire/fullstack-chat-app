import { z } from "zod";

export const SignupSchema = z.object({
  fullName: z.string().min(1, "Fullname is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be atleast 6 characters"),
});

export type SignupDto = z.infer<typeof SignupSchema>;

export const signinSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type SigninDto = z.infer<typeof signinSchema>;
