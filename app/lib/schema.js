// import z, { undefined } from "zod";

import z from "zod";

export const onboardingSchema = z.object({
  industry: z.string({
    required_error: "Please select an industry",
  }),
  subIndustry: z.string({
    required_error: "Please select a spelization",
  }),
  bio: z.string().max(500).optional(),
  experience: z
    .string()
    .transform((val) => praseInt(val, 10))
    .pipe(
      z
        .number()
        .min(0, "Experience must be at least 0 years")
        .max(50, "Experience must be at most 50 years")
    ),
  skills: z.string().transform((val) =>
    val
      ? val
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean)
      : undefined
  ),
});
