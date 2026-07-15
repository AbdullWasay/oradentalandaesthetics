import { z } from "zod";

export const contactFormSchema = z.object({
  formType: z.literal("contact"),
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().trim().email("Enter a valid email"),
  phone: z.string().trim().min(1, "Phone is required"),
  service: z.string().trim().min(1, "Service is required"),
  message: z.string().trim().optional(),
});

export const bookingFormSchema = z.object({
  formType: z.literal("booking"),
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Enter a valid email"),
  phone: z.string().trim().min(1, "Phone is required"),
  preferredDate: z.string().trim().min(1, "Preferred date is required"),
  service: z.string().trim().min(1, "Service is required"),
});

export const formSubmissionSchema = z.discriminatedUnion("formType", [
  contactFormSchema,
  bookingFormSchema,
]);

export type FormSubmission = z.infer<typeof formSubmissionSchema>;
