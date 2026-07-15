import { createServerFn } from "@tanstack/react-start";
import { formSubmissionSchema } from "@/lib/form-schema";

export const submitForm = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => formSubmissionSchema.parse(data))
  .handler(async ({ data }) => {
    const { sendFormEmail } = await import("@/lib/email.server");
    await sendFormEmail(data);
    return { ok: true as const };
  });
