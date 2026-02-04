import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { fullName, company, email, phone, message } = await request.json();

    // Validate required fields
    if (!fullName || !email || !message) {
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

    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    // Send email to admin
    console.log('Sending admin email to:', adminEmail);
    await resend.emails.send({
      from: 'Sodu Secure <onboarding@resend.dev>',
      to: adminEmail,
      replyTo: email,
      subject: `New Contact Form Submission from ${fullName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>This message was sent from your contact form at Sodu Secure website</em></p>
      `,
    });
    console.log('Admin email sent successfully');
    
    // Send confirmation email to user
    console.log('Sending confirmation email to:', email);
    await resend.emails.send({
      from: 'Sodu Secure <onboarding@resend.dev>',
      to: email,
      subject: '✅ Ihre Nachricht wurde empfangen - Sodu Secure',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f7fa;">
          <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">✓ Nachricht erhalten!</h1>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px;">
              <p style="color: #333333; font-size: 18px; margin: 0 0 20px 0; line-height: 1.6;">
                Hallo ${fullName},
              </p>
              
              <p style="color: #555555; font-size: 16px; margin: 0 0 25px 0; line-height: 1.6;">
                vielen Dank für Ihre Nachricht! Wir haben Ihre Anfrage erfolgreich erhalten und freuen uns über Ihr Interesse.
              </p>
              
              <div style="background-color: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin: 25px 0; border-radius: 6px;">
                <p style="color: #667eea; font-weight: 600; margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Ihre Nachricht:</p>
                <p style="color: #444444; font-size: 15px; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message.replace(/\n/g, '<br>')}</p>
              </div>
              
              <div style="background-color: #e8f5e9; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <p style="color: #2e7d32; margin: 0; font-size: 15px; line-height: 1.6;">
                  <strong>⏱️ Antwortzeit:</strong> Unser Team wird sich innerhalb von <strong>24-48 Stunden</strong> bei Ihnen melden.
                </p>
              </div>
              
              <p style="color: #555555; font-size: 15px; margin: 25px 0 0 0; line-height: 1.6;">
                Falls Sie weitere Fragen haben, können Sie uns jederzeit kontaktieren.
              </p>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
              <p style="color: #333333; font-size: 16px; margin: 0 0 10px 0; font-weight: 600;">
                Mit freundlichen Grüßen<br>
                <span style="color: #667eea;">Das Sodu Secure Team</span>
              </p>
              <p style="color: #888888; font-size: 13px; margin: 15px 0 0 0; line-height: 1.5;">
                🔒 Ihre Cybersecurity-Experten<br>
                <a href="https://sodusecure.com" style="color: #667eea; text-decoration: none;">www.sodusecure.com</a>
              </p>
            </div>
          </div>
          
          <!-- Legal Footer -->
          <div style="max-width: 600px; margin: 20px auto; text-align: center;">
            <p style="color: #999999; font-size: 12px; line-height: 1.5;">
              Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht direkt auf diese E-Mail.
            </p>
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
    console.error('Email sending error details:', {
      message: err.message,
      code: err.code,
      command: err.command,
      response: err.response,
      responseCode: err.responseCode,
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
