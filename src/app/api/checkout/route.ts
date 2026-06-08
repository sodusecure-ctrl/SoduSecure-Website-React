import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import {
  AUDIT_PLAN_INFO,
  getPlanPriceId,
  getStripe,
  isAuditPlan,
  type AuditPlan,
} from '@/lib/stripe';

type Provider = 'github' | 'gitlab';

function isProvider(v: unknown): v is Provider {
  return v === 'github' || v === 'gitlab';
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getOrigin(request: NextRequest): string {
  const envBase = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '');
  if (envBase) return envBase;
  const proto =
    request.headers.get('x-forwarded-proto') ||
    (request.nextUrl.protocol.replace(':', '') || 'https');
  const host =
    request.headers.get('x-forwarded-host') ||
    request.headers.get('host') ||
    request.nextUrl.host;
  return `${proto}://${host}`;
}

async function sendLeadEmail(args: {
  plan: AuditPlan;
  email: string;
  name?: string;
  company?: string;
  phone?: string;
  provider: Provider;
  repoUrl: string;
}) {
  if (!process.env.RESEND_API_KEY || !process.env.NEXT_PUBLIC_ADMIN_EMAIL) return;
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const resend = new Resend(process.env.RESEND_API_KEY);
  const info = AUDIT_PLAN_INFO[args.plan];

  const e = {
    email: escapeHtml(args.email),
    name: escapeHtml(args.name || ''),
    company: escapeHtml(args.company || ''),
    phone: escapeHtml(args.phone || ''),
    provider: escapeHtml(args.provider),
    repoUrl: escapeHtml(args.repoUrl),
    label: escapeHtml(info.label),
    price: escapeHtml(info.priceLabel),
    cadence: escapeHtml(info.cadence),
  };

  try {
    await resend.emails.send({
      from: 'Sodu Secure <onboarding@resend.dev>',
      to: adminEmail,
      replyTo: args.email,
      subject: `🛒 Stripe-Checkout gestartet · ${info.label} · ${args.name || args.company || args.email}`,
      html: `
        <!DOCTYPE html>
        <html><head><meta charset="UTF-8"></head>
        <body style="margin:0;padding:0;font-family:'Segoe UI',Arial,sans-serif;background:#0A0A0B;">
          <div style="max-width:680px;margin:30px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.18);">
            <div style="background:linear-gradient(135deg,#0A0A0B 0%,#FF3B30 100%);padding:32px;">
              <div style="color:rgba(255,255,255,.75);font-size:11px;letter-spacing:.22em;text-transform:uppercase;">Sodu /AuditAI · ${e.label}</div>
              <h1 style="color:#fff;margin:8px 0 0;font-size:24px;font-weight:600;">Checkout gestartet</h1>
              <p style="color:rgba(255,255,255,.75);margin:6px 0 0;font-size:14px;">${e.price} · ${e.cadence}</p>
            </div>
            <div style="padding:30px;">
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:9px 0;color:#6B7280;font-size:13px;width:160px;">E-Mail</td><td style="padding:9px 0;color:#0A0A0B;font-size:14px;"><a href="mailto:${e.email}" style="color:#FF3B30;text-decoration:none;">${e.email}</a></td></tr>
                ${e.name ? `<tr><td style="padding:9px 0;color:#6B7280;font-size:13px;">Name</td><td style="padding:9px 0;color:#0A0A0B;font-size:14px;">${e.name}</td></tr>` : ''}
                ${e.company ? `<tr><td style="padding:9px 0;color:#6B7280;font-size:13px;">Firma</td><td style="padding:9px 0;color:#0A0A0B;font-size:14px;">${e.company}</td></tr>` : ''}
                ${e.phone ? `<tr><td style="padding:9px 0;color:#6B7280;font-size:13px;">Telefon</td><td style="padding:9px 0;color:#0A0A0B;font-size:14px;">${e.phone}</td></tr>` : ''}
                <tr><td style="padding:9px 0;color:#6B7280;font-size:13px;">Provider</td><td style="padding:9px 0;color:#0A0A0B;font-size:14px;text-transform:capitalize;">${e.provider}</td></tr>
                <tr><td style="padding:9px 0;color:#6B7280;font-size:13px;">Repository</td><td style="padding:9px 0;color:#0A0A0B;font-size:14px;"><a href="${e.repoUrl}" style="color:#FF3B30;text-decoration:none;">${e.repoUrl}</a></td></tr>
              </table>
              <div style="margin-top:18px;padding:14px 16px;background:#FFF7ED;border-left:3px solid #F59E0B;border-radius:8px;color:#7c2d12;font-size:12px;">
                Hinweis: Lead vor Stripe-Checkout. Zahlung wird über Stripe-Webhook bestätigt (sofern eingerichtet).
              </div>
            </div>
            <div style="background:#FAFAFA;padding:18px 30px;border-top:1px solid #eee;color:#6B7280;font-size:12px;">sodusecure.com · ${e.label}-Plan</div>
          </div>
        </body></html>
      `,
    });
  } catch (err) {
    console.error('Lead email failed (non-blocking)', err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      plan,
      email,
      name,
      company,
      phone,
      provider,
      repoUrl,
    } = body as {
      plan?: string;
      email?: string;
      name?: string;
      company?: string;
      phone?: string;
      provider?: string;
      repoUrl?: string;
    };

    if (!isAuditPlan(plan)) {
      return NextResponse.json({ error: 'Ungültiger Plan' }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Bitte eine gültige E-Mail-Adresse angeben.' }, { status: 400 });
    }
    if (!name?.trim() && !company?.trim()) {
      return NextResponse.json({ error: 'Bitte Namen oder Firma angeben.' }, { status: 400 });
    }
    if (!isProvider(provider)) {
      return NextResponse.json({ error: 'Bitte GitHub oder GitLab wählen.' }, { status: 400 });
    }
    if (!repoUrl?.trim()) {
      return NextResponse.json({ error: 'Bitte Repository-URL oder Namen angeben.' }, { status: 400 });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY fehlt im Environment.');
      return NextResponse.json(
        { error: 'Zahlungsanbieter ist nicht konfiguriert.' },
        { status: 500 }
      );
    }

    const stripe = getStripe();
    const info = AUDIT_PLAN_INFO[plan];
    const origin = getOrigin(request);

    const priceId = getPlanPriceId(plan);

    const lineItems: import('stripe').Stripe.Checkout.SessionCreateParams.LineItem[] = priceId
      ? [{ price: priceId, quantity: 1 }]
      : [
          {
            quantity: 1,
            price_data: {
              currency: 'eur',
              unit_amount: info.amountCents,
              recurring: { interval: 'month' },
              product_data: {
                name: `Sodu /AuditAI · ${info.label}`,
                description: info.cadence,
              },
            },
          },
        ];

    const metadata = {
      plan,
      provider,
      repoUrl: repoUrl.trim().slice(0, 450),
      name: (name || '').slice(0, 200),
      company: (company || '').slice(0, 200),
      phone: (phone || '').slice(0, 60),
      source: 'sodu-audit-ai-landing',
    };

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: lineItems,
      customer_email: email.trim(),
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      tax_id_collection: { enabled: true },
      automatic_tax: { enabled: false },
      locale: 'de',
      metadata,
      subscription_data: { metadata },
      success_url: `${origin}/sodu-audit-ai?status=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/sodu-audit-ai?status=cancelled`,
    });

    if (!session.url) {
      return NextResponse.json({ error: 'Stripe-Session konnte nicht erstellt werden.' }, { status: 500 });
    }

    // Fire-and-forget lead email so we never block redirect to Stripe
    void sendLeadEmail({
      plan,
      email: email.trim(),
      name: name?.trim(),
      company: company?.trim(),
      phone: phone?.trim(),
      provider,
      repoUrl: repoUrl.trim(),
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('checkout route error', err);
    const message = err instanceof Error ? err.message : 'Internal error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
