// EmailJS runs entirely client-side, so these are NEXT_PUBLIC_ vars by
// design — the public key isn't a secret (EmailJS scopes abuse prevention
// via the dashboard's allowed-origins setting, not by hiding this value).
// See .env.example.
export const emailjsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
};

export function isEmailJsConfigured() {
  return Boolean(
    emailjsConfig.serviceId && emailjsConfig.templateId && emailjsConfig.publicKey
  );
}
