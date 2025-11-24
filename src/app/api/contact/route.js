import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Basic in-memory rate limiter (per-IP). Not durable across serverless instances.
const rateMap = new Map();
const COOLDOWN_MS = 30 * 1000; // 30 seconds per IP

export async function POST(req) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const now = Date.now();
    const last = rateMap.get(ip) || 0;
    if (now - last < COOLDOWN_MS) {
      return NextResponse.json({ success: false, error: 'Rate limit: please wait before sending another message.' }, { status: 429 });
    }

    const body = await req.json();
    const { name, email, phone, message } = body || {};

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const SMTP_HOST = process.env.SMTP_HOST;
    const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587', 10);
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASS = process.env.SMTP_PASS;
    const SMTP_SECURE = (process.env.SMTP_SECURE || 'false') === 'true';
    const RECEIVER = process.env.CONTACT_RECEIVER || process.env.SMTP_USER;

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !RECEIVER) {
      return NextResponse.json({ success: false, error: 'Mail configuration not set on server' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const subject = `Website Contact — ${name}`;
    const text = `New contact message\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || '-'}\n\nMessage:\n${message}`;
    const html = `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> <a href=\"mailto:${email}\">${email}</a></p><p><strong>Phone:</strong> ${phone || '-'}</p><hr/><p>${message.replace(/\n/g, '<br/>')}</p>`;

    await transporter.sendMail({
      from: process.env.SMTP_FROM || SMTP_USER,
      to: RECEIVER,
      subject,
      text,
      html,
    });

    rateMap.set(ip, now);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ success: false, error: 'Failed to send message' }, { status: 500 });
  }
}
