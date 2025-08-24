"use server";

import { z } from "zod";

const requestSchema = z.object({
  name: z.string().min(1),
  token: z.string().min(1),
});

export const doSomething = async (_prevState: any, formData: FormData) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const parsed = requestSchema.safeParse({
    name: formData.get("name"),
    token: formData.get("token"),
  });
  if (!parsed.success) {
    return {
      data: null,
      error: parsed.error.message,
    };
  }

  if (nameHasNumbers(parsed.data.name)) {
    return {
      data: null,
      error: "Name must not contain numbers",
    };
  }

  console.log(parsed.data);

  const recaptchaResponse = await verifyRecaptcha(parsed.data.token);

  return {
    data: {
      recaptchaResponse,
    },
    error: null,
  };
};

const nameHasNumbers = (name: string) => {
  const numberRegex = /\d/;
  return numberRegex.test(name);
};

const verifyRecaptcha = async (token: string) => {
  // Create form data instead of JSON as required by reCAPTCHA API
  const formData = new URLSearchParams();
  formData.append("secret", process.env.RECAPTCHA_SECRET_KEY || "");
  formData.append("response", token);

  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    }
  );
  const data = await response.json();
  const parsed = recaptchaResponseSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.message,
    };
  }
  return parsed.data;
};

const recaptchaErrorCodes = [
  "missing-input-secret",
  "invalid-input-secret",
  "missing-input-response",
  "invalid-input-response",
  "bad-request",
  "timeout-or-duplicate",
] as const;

const recaptchaResponseSchema = z.object({
  success: z.boolean(),
  challenge_ts: z.string().optional(),
  hostname: z.string().optional(),
  "error-codes": z.array(z.enum(recaptchaErrorCodes)).optional(),
});
