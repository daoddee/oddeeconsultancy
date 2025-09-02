// api/contact.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "");

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { name, email, company, message, hp } = req.body || {};

    // Honeypot (bot trap)
    if (hp) return res.status(200).json({ ok: true });

    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: "Missing required fields" });
    }

    // Send the notification to your inbox
    const sent = await resend.emails.send({
      from: "Oddee Website <onboarding@resend.dev>", // swap to your domain after verification
      to: ["info@oddeeconsultancy.co.uk"],
      reply_to: email,
      subject: `New enquiry — ${name}${company ? ` @ ${company}` : ""}`,
      text:
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Company: ${company || "-"}\n\n` +
        `Message:\n${message}\n`,
    });

    return res.status(200).json({ ok: true, id: sent.data?.id || null });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ ok: false, error: "Email failed to send" });
  }
}
