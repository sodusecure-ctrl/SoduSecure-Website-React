import { NextRequest, NextResponse } from 'next/server';
import { sendMail } from '@/lib/mailer';
import { estimateValue, insertLead } from '@/lib/leads-db';

type Plan = 'starter' | 'studio' | 'pro';

const PLAN_INFO: Record<Plan, { label: string; price: string; cadence: string }> = {
  starter: { label: 'Startup-Paket', price: '99 €/Monat', cadence: '1 Scan pro Monat · 1 Contributor' },
  studio: { label: 'Studio', price: '199 €/Monat', cadence: 'Wöchentlicher Bericht · 1 Repo · unbegrenzte Contributoren' },
  pro: { label: 'Pro+', price: '449 €/Monat', cadence: 'Wöchentlicher Bericht · mehrere Repos · quartalsweise Voll-Pentest' },
};

function isPlan(v: unknown): v is Plan {
  return v === 'starter' || v === 'studio' || v === 'pro';
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { plan, email, name, company, githubOrg, phone } = body as {
      plan?: string;
      email?: string;
      name?: string;
      company?: string;
      githubOrg?: string;
      phone?: string;
    };

    if (!isPlan(plan)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }
    if (!name && !company) {
      return NextResponse.json({ error: 'Name or company required' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY || !process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      console.error('Resend API key or admin email missing.');
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    const info = PLAN_INFO[plan];

    // Persist lead (best-effort, never blocks the email flow)
    void insertLead({
      source: 'get-started',
      name: name || null,
      company: company || null,
      email,
      phone: phone || null,
      service: info.label,
      estValue: estimateValue('get-started', plan),
      sourcePage: request.headers.get('referer'),
      payload: { plan, email, name, company, githubOrg, phone },
    });

    const eEmail = escapeHtml(email);
    const eName = escapeHtml(name || '');
    const eCompany = escapeHtml(company || '');
    const eOrg = escapeHtml(githubOrg || '');
    const ePhone = escapeHtml(phone || '');
    const ePlanLabel = escapeHtml(info.label);
    const ePlanPrice = escapeHtml(info.price);
    const ePlanCadence = escapeHtml(info.cadence);

    const adminRes = await sendMail({
      to: adminEmail,
      replyTo: email,
      subject: `🚀 Neue ${info.label}-Anfrage · ${name || company || email}`,
      html: `
        <!DOCTYPE html>
        <html><head><meta charset="UTF-8"></head>
        <body style="margin:0;padding:0;font-family:'Segoe UI',Arial,sans-serif;background:#0A0A0B;">
          <div style="max-width:680px;margin:30px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.18);">
            <div style="background:linear-gradient(135deg,#0A0A0B 0%,#FF3B30 100%);padding:36px 32px;">
              <div style="color:#fff;font-size:11px;letter-spacing:.22em;text-transform:uppercase;opacity:.7;">Sodu /AuditAI · ${ePlanLabel}</div>
              <h1 style="color:#fff;margin:8px 0 0;font-size:26px;font-weight:600;">Neue ${ePlanLabel}-Anfrage</h1>
              <p style="color:rgba(255,255,255,.75);margin:6px 0 0;font-size:14px;">${ePlanPrice} · ${ePlanCadence}</p>
            </div>
            <div style="padding:32px;">
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:10px 0;color:#6B7280;font-size:13px;width:170px;">E-Mail</td><td style="padding:10px 0;color:#0A0A0B;font-size:14px;"><a href="mailto:${eEmail}" style="color:#FF3B30;text-decoration:none;">${eEmail}</a></td></tr>
                ${eName ? `<tr><td style="padding:10px 0;color:#6B7280;font-size:13px;">Name</td><td style="padding:10px 0;color:#0A0A0B;font-size:14px;">${eName}</td></tr>` : ''}
                ${eCompany ? `<tr><td style="padding:10px 0;color:#6B7280;font-size:13px;">Firma</td><td style="padding:10px 0;color:#0A0A0B;font-size:14px;">${eCompany}</td></tr>` : ''}
                ${eOrg ? `<tr><td style="padding:10px 0;color:#6B7280;font-size:13px;">GitHub-Org</td><td style="padding:10px 0;color:#0A0A0B;font-size:14px;">${eOrg}</td></tr>` : ''}
                ${ePhone ? `<tr><td style="padding:10px 0;color:#6B7280;font-size:13px;">Telefon</td><td style="padding:10px 0;color:#0A0A0B;font-size:14px;">${ePhone}</td></tr>` : ''}
              </table>
            </div>
            <div style="background:#FAFAFA;padding:20px 32px;border-top:1px solid #eee;color:#6B7280;font-size:12px;">sodusecure.com · ${ePlanLabel}-Plan</div>
          </div>
        </body></html>
      `,
    });
    if (!adminRes.ok) {
      console.error('[get-started] Admin mail failed:', adminRes.error);
      return NextResponse.json({ error: 'Internal error', details: adminRes.error }, { status: 502 });
    }

    const userRes = await sendMail({
      to: email,
      replyTo: adminEmail,
      subject: `✅ Ihre ${info.label}-Anfrage ist bei uns angekommen`,
      html: `
        <!DOCTYPE html>
        <html><head><meta charset="UTF-8"></head>
        <body style="margin:0;padding:0;font-family:'Segoe UI',Arial,sans-serif;background:#f4f7fa;">
          <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,.1);">
            <div style="background:linear-gradient(135deg,#0A0A0B 0%,#FF3B30 100%);padding:40px 30px;text-align:center;">
              <div style="color:rgba(255,255,255,.75);font-size:11px;letter-spacing:.22em;text-transform:uppercase;">Sodu /AuditAI</div>
              <h1 style="color:#fff;margin:10px 0 0;font-size:28px;font-weight:600;">Anfrage erhalten</h1>
              <p style="color:rgba(255,255,255,.8);margin:8px 0 0;font-size:14px;">${ePlanLabel} · ${ePlanPrice}</p>
            </div>
            <div style="padding:36px 32px;">
              <p style="color:#0A0A0B;font-size:16px;margin:0 0 16px;line-height:1.6;">Hallo${eName ? ' ' + eName : ''},</p>
              <p style="color:#525866;font-size:15px;margin:0 0 20px;line-height:1.7;">
                vielen Dank für Ihr Interesse am <strong>${ePlanLabel}-Plan</strong>. Wir melden uns innerhalb
                von 24 Stunden mit den nächsten Schritten und einem Onboarding-Slot.
              </p>
              <div style="background:#FAFAFA;border-left:3px solid #FF3B30;padding:18px 20px;border-radius:8px;margin:24px 0;">
                <div style="color:#6B7280;font-size:11px;letter-spacing:.18em;text-transform:uppercase;margin-bottom:6px;">Ihr Plan</div>
                <div style="color:#0A0A0B;font-size:15px;font-weight:600;">${ePlanLabel} · ${ePlanPrice}</div>
                <div style="color:#525866;font-size:13px;margin-top:4px;">${ePlanCadence}</div>
              </div>
              <p style="color:#525866;font-size:13px;margin:24px 0 0;line-height:1.6;">Bei Rückfragen einfach auf diese E-Mail antworten.</p>
            </div>
            <div style="background:#FAFAFA;padding:20px 32px;text-align:center;color:#9AA0A6;font-size:12px;">sodusecure.com</div>
          </div>
        </body></html>
      `,
    });
    if (!userRes.ok) console.warn('[get-started] User confirmation mail failed (non-blocking):', userRes.error);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('get-started route error', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
