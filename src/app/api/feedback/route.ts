import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { rating, feedback } = await request.json();

    if (!process.env.RESEND_API_KEY || !process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      console.error('Resend API key or admin email missing.');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    const resend = new Resend(process.env.RESEND_API_KEY);

    const ratingEmojis = ['😡', '😕', '😐', '🙂', '😄'];
    const ratingDisplay = rating
      ? `${ratingEmojis[rating - 1]} ${rating}/5`
      : 'Nicht bewertet';

    await resend.emails.send({
      from: 'Sodu Secure <onboarding@resend.dev>',
      to: adminEmail,
      subject: `Website Feedback – Bewertung: ${ratingDisplay}`,
      html: `
        <h2>Neues Website-Feedback</h2>
        <p><strong>Bewertung:</strong> ${ratingDisplay}</p>
        <p><strong>Kommentar:</strong></p>
        <p>${feedback ? feedback.replace(/\n/g, '<br>') : 'Keine Angabe'}</p>
        <hr>
        <p><em>Gesendet von der Danke-Seite (SoduSecure Website)</em></p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Feedback email error:', error);
    return NextResponse.json(
      { error: 'Failed to send feedback' },
      { status: 500 }
    );
  }
}
