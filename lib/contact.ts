// Phone/WhatsApp/email below are the site owner's personal contact, used
// as a working demo stand-in for Firuta's official business contact —
// swap for the real business details before launch. Address/hours are
// still unconfirmed placeholders. See docs/PROJECT.md.
export const contact = {
  address: "[ADDRESS, MALAYSIA]",
  phone: "016-612-8291",
  whatsapp: "016-612-8291",
  email: "jacobjayenpillai@gmail.com",
  hours: "[HOURS]",
};

export function whatsappHref(number: string) {
  const digits = number.replace(/\D/g, "");
  // Malaysian mobile numbers: local "0" prefix -> country code 60.
  const international = digits.startsWith("0") ? `60${digits.slice(1)}` : digits;
  return `https://wa.me/${international}`;
}
