import nodemailer from "nodemailer";
import type { FormSubmission } from "./form-schema";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.hostinger.com",
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: process.env.SMTP_SECURE !== "false",
    auth: {
      user: requireEnv("SMTP_USER"),
      pass: requireEnv("SMTP_PASS"),
    },
  });
}

function formatSubmission(data: FormSubmission): { subject: string; text: string; html: string } {
  if (data.formType === "contact") {
    const subject = `New consultation request — ${data.firstName} ${data.lastName}`;
    const lines = [
      `Name: ${data.firstName} ${data.lastName}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Service: ${data.service}`,
      `Message: ${data.message || "(none)"}`,
    ];
    return {
      subject,
      text: lines.join("\n"),
      html: lines.map((line) => `<p>${line}</p>`).join(""),
    };
  }

  const subject = `Appointment request — ${data.name}`;
  const lines = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Preferred date: ${data.preferredDate}`,
    `Service: ${data.service}`,
  ];
  return {
    subject,
    text: lines.join("\n"),
    html: lines.map((line) => `<p>${line}</p>`).join(""),
  };
}

export async function sendFormEmail(data: FormSubmission) {
  const transporter = getTransporter();
  const from = process.env.SMTP_FROM ?? process.env.SMTP_USER;
  const to = process.env.SMTP_TO ?? process.env.SMTP_USER;

  if (!from || !to) {
    throw new Error("SMTP_FROM or SMTP_TO is not configured");
  }

  const { subject, text, html } = formatSubmission(data);

  await transporter.sendMail({
    from,
    to,
    replyTo: data.email,
    subject,
    text,
    html,
  });
}
