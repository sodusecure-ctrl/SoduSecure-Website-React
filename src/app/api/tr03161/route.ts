import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const {
      fullName,
      company,
      email,
      phone,
      applicationType,
      developmentStage,
      message,
    } = await request.json();

    // Validate required fields
    if (!fullName || !company || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
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

    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    const resend = new Resend(process.env.RESEND_API_KEY);

    const applicationTypeLabel = applicationType || 'Nicht angegeben';
    const developmentStageLabel = developmentStage || 'Nicht angegeben';

    // Send email to admin
    await resend.emails.send({
      from: 'Sodu Secure <onboarding@resend.dev>',
      to: adminEmail,
      replyTo: email,
      subject: `Neue TR-03161 Anfrage von ${fullName} (${company})`,
      html: `
        <h2>Neue BSI TR-03161 Anfrage</h2>
        <table style="border-collapse: collapse; width: 100%;">
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Name:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${fullName}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Unternehmen:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${company}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">E-Mail:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${email}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Telefon:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${phone || 'Nicht angegeben'}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Art der Anwendung:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${applicationTypeLabel}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Entwicklungsstand:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${developmentStageLabel}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Nachricht:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${message ? message.replace(/\n/g, '<br>') : 'Keine Nachricht'}</td></tr>
        </table>
        <hr>
        <p><em>Diese Nachricht wurde über das BSI TR-03161 Anfrageformular auf der Sodu Secure Website gesendet.</em></p>
      `,
    });

    // Send confirmation email to user
    await resend.emails.send({
      from: 'Sodu Secure <onboarding@resend.dev>',
      to: email,
      subject: '✅ Ihre TR-03161 Anfrage wurde empfangen – Sodu Secure',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f7fa;">
          <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">✓ Anfrage erhalten!</h1>
            </div>
            <div style="padding: 40px 30px;">
              <p style="color: #333333; font-size: 18px; margin: 0 0 20px 0; line-height: 1.6;">
                Hallo ${fullName},
              </p>
              <p style="color: #555555; font-size: 16px; margin: 0 0 25px 0; line-height: 1.6;">
                vielen Dank für Ihre Anfrage bezüglich der BSI TR-03161 Sicherheitsprüfung! Wir haben Ihre Nachricht erfolgreich erhalten und freuen uns über Ihr Interesse.
              </p>
              <div style="background-color: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin: 25px 0; border-radius: 6px;">
                <p style="color: #667eea; font-weight: 600; margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Ihre Angaben:</p>
                <p style="color: #444444; font-size: 15px; margin: 0; line-height: 1.8;">
                  <strong>Unternehmen:</strong> ${company}<br>
                  <strong>Art der Anwendung:</strong> ${applicationTypeLabel}<br>
                  <strong>Entwicklungsstand:</strong> ${developmentStageLabel}
                </p>
              </div>
              <div style="background-color: #e8f5e9; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <p style="color: #2e7d32; margin: 0; font-size: 15px; line-height: 1.6;">
                  <strong>⏱️ Nächste Schritte:</strong> Unser Team wird sich innerhalb von <strong>1–2 Werktagen</strong> bei Ihnen melden, um ein unverbindliches Erstgespräch zu vereinbaren.
                </p>
              </div>
              <p style="color: #555555; font-size: 15px; margin: 25px 0 0 0; line-height: 1.6;">
                Falls Sie in der Zwischenzeit Fragen haben, können Sie uns jederzeit kontaktieren.
              </p>
            </div>
            <div style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="color: #333333; font-size: 16px; margin: 0 0 10px 0; font-weight: 600;">
                Mit freundlichen Grüßen<br>
                <span style="color: #667eea;">Das Sodu Secure Team</span>
              </p>
              <p style="color: #888888; font-size: 13px; margin: 15px 0 0 0; line-height: 1.5;">
                🔒 Ihre Cybersecurity-Experten<br>
                <a href="https://www.sodusecure.com" style="color: #667eea; text-decoration: none;">www.sodusecure.com</a>
              </p>
            </div>
          </div>
          <div style="max-width: 600px; margin: 20px auto; text-align: center;">
            <p style="color: #999999; font-size: 12px; line-height: 1.5;">
              Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht direkt auf diese E-Mail.
            </p>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error: unknown) {
    const err = error as Error & { code?: string; command?: string; response?: string; responseCode?: string };
    console.error('TR-03161 form email error:', {
      message: err.message,
      code: err.code,
    });
    return NextResponse.json(
      {
        error: 'Failed to send email',
        details: err.message
      },
      { status: 500 }
    );
  }
}
