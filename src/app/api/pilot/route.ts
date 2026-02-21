import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { company, contactName, email, phone, employees, itStructure, description } =
      await request.json();

    // Validate required fields
    if (!company || !email || !contactName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate environment variables
    if (!process.env.RESEND_API_KEY || !process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      console.error('Resend API key or admin email missing. Please check .env.local');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    // Send email to admin
    console.log('Sending admin email to:', adminEmail);
    await resend.emails.send({
      from: 'Sodu Secure <onboarding@resend.dev>',
      to: adminEmail,
      replyTo: email,
      subject: `🔐 Neue Pilotprogramm-Bewerbung von ${contactName} (${company})`,
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="UTF-8"></head>
        <body style="margin:0;padding:0;font-family:'Segoe UI',Arial,sans-serif;background:#f4f7fa;">
          <div style="max-width:700px;margin:30px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,.1);">
            <div style="background:linear-gradient(135deg,#111827 0%,#dc2626 100%);padding:30px;text-align:center;">
              <h1 style="color:#fff;margin:0;font-size:26px;font-weight:600;">🔐 Neue Pilotprogramm-Bewerbung</h1>
              <p style="color:#fca5a5;margin:8px 0 0;font-size:14px;">Berlin KMU Cybersecurity Pilotprogramm 2026</p>
            </div>
            <div style="padding:30px;">
              <div style="background:#f8f9fa;padding:20px;border-radius:8px;margin-bottom:20px;">
                <h2 style="color:#333;margin:0 0 15px;font-size:18px;border-bottom:2px solid #dc2626;padding-bottom:8px;">📋 Kontaktinformationen</h2>
                <table style="width:100%;border-collapse:collapse;">
                  <tr><td style="padding:8px 0;color:#666;font-size:14px;width:160px;"><strong>Ansprechpartner:</strong></td><td style="padding:8px 0;color:#333;font-size:14px;">${contactName}</td></tr>
                  <tr><td style="padding:8px 0;color:#666;font-size:14px;"><strong>Unternehmen:</strong></td><td style="padding:8px 0;color:#333;font-size:14px;">${company}</td></tr>
                  <tr><td style="padding:8px 0;color:#666;font-size:14px;"><strong>E-Mail:</strong></td><td style="padding:8px 0;color:#333;font-size:14px;"><a href="mailto:${email}" style="color:#dc2626;">${email}</a></td></tr>
                  <tr><td style="padding:8px 0;color:#666;font-size:14px;"><strong>Telefon:</strong></td><td style="padding:8px 0;color:#333;font-size:14px;">${phone || 'Nicht angegeben'}</td></tr>
                  <tr><td style="padding:8px 0;color:#666;font-size:14px;"><strong>Mitarbeiterzahl:</strong></td><td style="padding:8px 0;color:#333;font-size:14px;">${employees || 'Nicht angegeben'}</td></tr>
                  <tr><td style="padding:8px 0;color:#666;font-size:14px;"><strong>IT-Struktur:</strong></td><td style="padding:8px 0;color:#333;font-size:14px;">${itStructure || 'Nicht angegeben'}</td></tr>
                </table>
              </div>
              <div style="background:#fef2f2;border-left:4px solid #dc2626;padding:20px;border-radius:6px;">
                <p style="color:#dc2626;font-weight:600;margin:0 0 8px;font-size:14px;">IT-UMGEBUNG / BESCHREIBUNG:</p>
                <p style="color:#444;font-size:14px;margin:0;line-height:1.6;white-space:pre-wrap;">${(description || 'Nicht angegeben').replace(/\n/g, '<br>')}</p>
              </div>
            </div>
            <div style="background:#f8f9fa;padding:20px 30px;text-align:center;border-top:1px solid #e0e0e0;">
              <p style="color:#888;font-size:12px;margin:0;">sodusecure.com · Berlin KMU Cybersecurity Pilotprogramm 2026</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });
    console.log('Admin email sent successfully');

    // Send confirmation email to applicant
    console.log('Sending confirmation email to:', email);
    await resend.emails.send({
      from: 'Sodu Secure <onboarding@resend.dev>',
      to: email,
      subject: '✅ Ihre Bewerbung wurde erhalten – Berlin KMU Pilotprogramm 2026',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin:0;padding:0;font-family:'Segoe UI',Arial,sans-serif;background:#f4f7fa;">
          <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,.1);">
            <div style="background:linear-gradient(135deg,#111827 0%,#dc2626 100%);padding:40px 30px;text-align:center;">
              <h1 style="color:#fff;margin:0;font-size:28px;font-weight:600;">✓ Bewerbung erhalten!</h1>
              <p style="color:#fca5a5;margin:8px 0 0;font-size:15px;">Berlin KMU Cybersecurity Pilotprogramm 2026</p>
            </div>
            <div style="padding:40px 30px;">
              <p style="color:#333;font-size:18px;margin:0 0 20px;line-height:1.6;">Hallo ${contactName},</p>
              <p style="color:#555;font-size:16px;margin:0 0 25px;line-height:1.6;">
                vielen Dank für Ihre Bewerbung beim <strong>SODU Secure Berlin KMU Cybersecurity Pilotprogramm 2026</strong>!
                Wir haben Ihre Anfrage erfolgreich erhalten.
              </p>
              <div style="background:#fef2f2;border-left:4px solid #dc2626;padding:20px;margin:25px 0;border-radius:6px;">
                <p style="color:#dc2626;font-weight:600;margin:0 0 10px;font-size:14px;text-transform:uppercase;letter-spacing:.5px;">⏱️ Nächste Schritte:</p>
                <p style="color:#444;font-size:15px;margin:0;line-height:1.6;">
                  Unser Team prüft Ihre Bewerbung und meldet sich <strong>innerhalb von 48 Stunden</strong> persönlich bei Ihnen.
                  Bei dringenden Fragen erreichen Sie uns direkt:
                </p>
              </div>
              <div style="background:#f8f9fa;padding:20px;border-radius:8px;margin:25px 0;text-align:center;">
                <p style="color:#333;font-weight:600;margin:0 0 8px;font-size:15px;">📞 +49 179 239 6294</p>
                <p style="color:#666;font-size:14px;margin:0;">sodusecure@gmail.com</p>
              </div>
              <p style="color:#555;font-size:15px;margin:25px 0 0;line-height:1.6;">
                Mit freundlichen Grüßen,<br/>
                <strong>Kerim Koc</strong><br/>
                Geschäftsführer, SODU Secure GmbH · Berlin
              </p>
            </div>
            <div style="background:#f8f9fa;padding:30px;text-align:center;border-top:1px solid #e0e0e0;">
              <p style="color:#333;font-size:16px;margin:0 0 10px;font-weight:600;">SODU Secure GmbH</p>
              <p style="color:#888;font-size:13px;margin:15px 0 0;line-height:1.5;">
                🔒 Ihre Cybersecurity-Experten aus Berlin<br/>
                <a href="https://sodusecure.com" style="color:#dc2626;text-decoration:none;">www.sodusecure.com</a>
              </p>
            </div>
          </div>
          <div style="max-width:600px;margin:20px auto;text-align:center;">
            <p style="color:#999;font-size:12px;line-height:1.5;">Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht direkt auf diese E-Mail.</p>
          </div>
        </body>
        </html>
      `,
    });
    console.log('User confirmation email sent successfully');

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error: unknown) {
    const err = error as Error & { code?: string; command?: string; response?: string; responseCode?: string };
    console.error('Pilot form email error:', {
      message: err.message,
      code: err.code,
      command: err.command,
      response: err.response,
      responseCode: err.responseCode,
    });
    return NextResponse.json(
      {
        error: 'Failed to send email',
        details: err.message,
      },
      { status: 500 }
    );
  }
}
