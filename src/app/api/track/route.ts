import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { action, timestamp } = await request.json();
    console.log('Received tracking:', action, timestamp);

    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    if (!adminEmail) {
      console.error('Admin email not set');
      return NextResponse.json({ error: 'Admin email not configured' }, { status: 500 });
    }

    await resend.emails.send({
      from: 'Sodu Secure <onboarding@resend.dev>',
      to: adminEmail,
      subject: `Tracking: ${action}`,
      html: `<p>Action: ${action}</p><p>Timestamp: ${timestamp}</p>`,
    });

    console.log('Tracking email sent for:', action);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Tracking error:', error);
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 });
  }
}