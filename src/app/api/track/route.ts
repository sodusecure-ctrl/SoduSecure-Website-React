import { NextRequest, NextResponse } from 'next/server';
import { sendMail } from '@/lib/mailer';

export async function POST(request: NextRequest) {
  try {
    const { action, timestamp } = await request.json();
    console.log('Received tracking:', action, timestamp);

    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    if (!adminEmail) {
      console.error('Admin email not set');
      return NextResponse.json({ error: 'Admin email not configured' }, { status: 500 });
    }

    const result = await sendMail({
      to: adminEmail,
      subject: `Tracking: ${action}`,
      html: `<p>Action: ${action}</p><p>Timestamp: ${timestamp}</p>`,
    });

    if (!result.ok) {
      console.error('[track] Mail failed:', result.error);
      return NextResponse.json({ error: 'Failed to track', details: result.error }, { status: 502 });
    }
    return NextResponse.json({ success: true, id: result.id });
  } catch (error) {
    console.error('Tracking error:', error);
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 });
  }
}