declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

export const META_PIXEL_ID = "2916628175360380";

/** Safe wrapper — no-ops if the pixel hasn't loaded yet. */
export function trackMeta(
  event: string,
  params?: Record<string, string | number | boolean | undefined>,
) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  if (params) window.fbq("track", event, params);
  else window.fbq("track", event);
}

export function trackMetaCustom(
  event: string,
  params?: Record<string, string | number | boolean | undefined>,
) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  if (params) window.fbq("trackCustom", event, params);
  else window.fbq("trackCustom", event);
}

/** Appointment form submitted successfully */
export function trackBookingLead(service?: string) {
  trackMeta("Lead", {
    content_name: "Appointment request",
    content_category: service || "General Consultation",
  });
  trackMeta("Schedule", {
    content_name: "Appointment request",
    content_category: service || "General Consultation",
  });
}

/** WhatsApp / phone contact intent */
export function trackContact(method: "whatsapp" | "phone" | "email") {
  trackMeta("Contact", { content_name: method });
}

/** Leave a review CTA */
export function trackLeaveReview() {
  trackMetaCustom("LeaveReview", { content_name: "Leave a review" });
  trackMeta("Contact", { content_name: "leave_review" });
}
