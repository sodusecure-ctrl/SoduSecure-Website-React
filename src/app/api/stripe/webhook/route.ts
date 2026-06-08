import { NextRequest, NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { Resend } from 'resend';
import { AUDIT_PLAN_INFO, getStripe, isAuditPlan } from '@/lib/stripe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

type Meta = {
  plan?: string;
  provider?: string;
  repoUrl?: string;
  name?: string;
  company?: string;
  phone?: string;
};

async function sendEmails(session: Stripe.Checkout.Session) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY missing — skipping confirmation emails.');
    return;
  }
  const resend = new Resend(process.env.RESEND_API_KEY);
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const meta = (session.metadata || {}) as Meta;
  const plan = isAuditPlan(meta.plan) ? meta.plan : null;
  const info = plan ? AUDIT_PLAN_INFO[plan] : null;

  const customerEmail =
    session.customer_details?.email || session.customer_email || '';
  const customerName =
    session.customer_details?.name || meta.name || meta.company || '';

  const e = {
    label: escapeHtml(info?.label || 'Sodu /AuditAI'),
    price: escapeHtml(info?.priceLabel || ''),
    cadence: escapeHtml(info?.cadence || ''),
    email: escapeHtml(customerEmail),
    name: escapeHtml(customerName),
    company: escapeHtml(meta.company || ''),
    phone: escapeHtml(meta.phone || ''),
    provider: escapeHtml(meta.provider || ''),
    repoUrl: escapeHtml(meta.repoUrl || ''),
    sessionId: escapeHtml(session.id),
    amount: session.amount_total
      ? `${(session.amount_total / 100).toFixed(2)} ${(session.currency || 'eur').toUpperCase()}`
      : (info?.priceLabel ?? ''),
  };

  // 1) Admin notification
  if (adminEmail) {
    try {
      await resend.emails.send({
        from: 'Sodu Secure <onboarding@resend.dev>',
        to: adminEmail,
        replyTo: customerEmail || undefined,
        subject: `✅ Bezahlt · ${info?.label || 'Sodu /AuditAI'} · ${customerName || customerEmail}`,
        html: `
          <!DOCTYPE html>
          <html><head><meta charset="UTF-8"></head>
          <body style="margin:0;padding:0;font-family:'Segoe UI',Arial,sans-serif;background:#0A0A0B;">
            <div style="max-width:680px;margin:30px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.18);">
              <div style="background:linear-gradient(135deg,#0A0A0B 0%,#10B981 100%);padding:32px;">
                <div style="color:rgba(255,255,255,.78);font-size:11px;letter-spacing:.22em;text-transform:uppercase;">Zahlung bestätigt</div>
                <h1 style="color:#fff;margin:8px 0 0;font-size:24px;font-weight:600;">${e.label} · ${e.amount}</h1>
                <p style="color:rgba(255,255,255,.78);margin:6px 0 0;font-size:14px;">${e.cadence}</p>
              </div>
              <div style="padding:30px;">
                <table style="width:100%;border-collapse:collapse;">
                  <tr><td style="padding:9px 0;color:#6B7280;font-size:13px;width:160px;">E-Mail</td><td style="padding:9px 0;color:#0A0A0B;font-size:14px;"><a href="mailto:${e.email}" style="color:#FF3B30;text-decoration:none;">${e.email}</a></td></tr>
                  ${e.name ? `<tr><td style="padding:9px 0;color:#6B7280;font-size:13px;">Name</td><td style="padding:9px 0;color:#0A0A0B;font-size:14px;">${e.name}</td></tr>` : ''}
                  ${e.company ? `<tr><td style="padding:9px 0;color:#6B7280;font-size:13px;">Firma</td><td style="padding:9px 0;color:#0A0A0B;font-size:14px;">${e.company}</td></tr>` : ''}
                  ${e.phone ? `<tr><td style="padding:9px 0;color:#6B7280;font-size:13px;">Telefon</td><td style="padding:9px 0;color:#0A0A0B;font-size:14px;">${e.phone}</td></tr>` : ''}
                  <tr><td style="padding:9px 0;color:#6B7280;font-size:13px;">Provider</td><td style="padding:9px 0;color:#0A0A0B;font-size:14px;text-transform:capitalize;">${e.provider}</td></tr>
                  <tr><td style="padding:9px 0;color:#6B7280;font-size:13px;">Repository</td><td style="padding:9px 0;color:#0A0A0B;font-size:14px;"><a href="${e.repoUrl}" style="color:#FF3B30;text-decoration:none;word-break:break-all;">${e.repoUrl}</a></td></tr>
                  <tr><td style="padding:9px 0;color:#6B7280;font-size:13px;">Stripe Session</td><td style="padding:9px 0;color:#0A0A0B;font-size:12px;font-family:monospace;">${e.sessionId}</td></tr>
                </table>
                <div style="margin-top:18px;padding:14px 16px;background:#ECFDF5;border-left:3px solid #10B981;border-radius:8px;color:#064E3B;font-size:12px;">
                  Nächster Schritt: Repo-Zugang einrichten und ersten Audit-Lauf anstoßen.
                </div>
              </div>
              <div style="background:#FAFAFA;padding:18px 30px;border-top:1px solid #eee;color:#6B7280;font-size:12px;">sodusecure.com · ${e.label}-Plan</div>
            </div>
          </body></html>
        `,
      });
    } catch (err) {
      console.error('Admin confirmation email failed', err);
    }
  }

  // 2) Customer confirmation
  if (customerEmail) {
    try {
      await resend.emails.send({
        from: 'Sodu Secure <onboarding@resend.dev>',
        to: customerEmail,
        replyTo: adminEmail || undefined,
        subject: `Willkommen bei Sodu /AuditAI · ${info?.label || 'Bestellung bestätigt'}`,
        html: `
          <!DOCTYPE html>
          <html><head><meta charset="UTF-8"></head>
          <body style="margin:0;padding:0;font-family:'Segoe UI',Arial,sans-serif;background:#F4F4F5;">
            <div style="max-width:640px;margin:30px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.10);">
              <div style="background:linear-gradient(135deg,#0A0A0B 0%,#FF3B30 100%);padding:36px;">
                <div style="color:rgba(255,255,255,.75);font-size:11px;letter-spacing:.22em;text-transform:uppercase;">Sodu /AuditAI</div>
                <h1 style="color:#fff;margin:10px 0 0;font-size:26px;font-weight:600;">Willkommen, ${e.name || 'an Bord'}.</h1>
                <p style="color:rgba(255,255,255,.85);margin:8px 0 0;font-size:15px;">Deine Zahlung für <strong>${e.label}</strong> ist eingegangen.</p>
              </div>
              <div style="padding:32px;">
                <p style="color:#0A0A0B;font-size:15px;line-height:1.55;margin:0 0 18px;">Vielen Dank für dein Vertrauen. Hier ist, was als Nächstes passiert:</p>
                <ol style="color:#27272A;font-size:14px;line-height:1.7;padding-left:18px;margin:0 0 22px;">
                  <li><strong>Quittung von Stripe</strong> bekommst du separat per Mail.</li>
                  <li>Wir melden uns innerhalb von <strong>24 Stunden</strong> mit den Schritten zur Repo-Anbindung (${e.provider || 'GitHub/GitLab'}).</li>
                  <li>Dein erster Audit-Bericht ist innerhalb von <strong>72 Stunden</strong> nach Repo-Zugang in deinem Postfach.</li>
                </ol>
                <div style="margin:22px 0;padding:16px 18px;background:#FAFAFA;border:1px solid #E4E4E7;border-radius:10px;">
                  <div style="color:#6B7280;font-size:12px;letter-spacing:.12em;text-transform:uppercase;">Bestelldetails</div>
                  <div style="margin-top:8px;color:#0A0A0B;font-size:14px;line-height:1.7;">
                    <div><strong>Plan:</strong> ${e.label} · ${e.amount}/Monat</div>
                    ${e.repoUrl ? `<div><strong>Repository:</strong> <span style="word-break:break-all;">${e.repoUrl}</span></div>` : ''}
                  </div>
                </div>
                <p style="color:#52525B;font-size:13px;line-height:1.6;margin:0;">Fragen? Antworte einfach auf diese E-Mail oder schreib an <a href="mailto:${escapeHtml(adminEmail || '')}" style="color:#FF3B30;text-decoration:none;">${escapeHtml(adminEmail || '')}</a>.</p>
              </div>
              <div style="background:#0A0A0B;padding:20px 32px;color:rgba(255,255,255,.55);font-size:12px;">Sodu Secure · sodusecure.com · monatlich kündbar</div>
            </div>
          </body></html>
        `,
      });
    } catch (err) {
      console.error('Customer confirmation email failed', err);
    }
  }
}

export async function POST(request: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error('STRIPE_WEBHOOK_SECRET missing.');
    return NextResponse.json({ error: 'Webhook nicht konfiguriert' }, { status: 500 });
  }

  const signature = request.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Signatur fehlt' }, { status: 400 });
  }

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(rawBody, signature, secret);
  } catch (err) {
    console.error('Stripe webhook signature verification failed', err);
    return NextResponse.json({ error: 'Ungültige Signatur' }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      // Only act on paid sessions
      if (session.payment_status === 'paid' || session.mode === 'subscription') {
        await sendEmails(session);
      }
      break;
    }
    default:
      // ignore other events
      break;
  }

  return NextResponse.json({ received: true });
}
