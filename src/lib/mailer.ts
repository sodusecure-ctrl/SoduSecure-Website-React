import { Resend } from 'resend';

export type SendMailInput = {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
  bcc?: string | string[];
  from?: string;
};

export type SendMailResult = {
  ok: boolean;
  id?: string;
  error?: string;
};

const SANDBOX_FROM = 'Sodu Secure <onboarding@resend.dev>';

export function getMailFrom(): string {
  const configured = process.env.MAIL_FROM?.trim();
  if (configured && configured.length > 0) return configured;
  if (process.env.NODE_ENV === 'production') {
    console.warn(
      '[mailer] MAIL_FROM is not set. Falling back to Resend sandbox sender. ' +
        'The sandbox can ONLY deliver to the verified Resend account owner. ' +
        'Verify a domain in Resend and set MAIL_FROM, e.g. "Sodu Secure <noreply@sodusecure.com>".',
    );
  }
  return SANDBOX_FROM;
}

export function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error('[mailer] RESEND_API_KEY is missing.');
    return null;
  }
  return new Resend(key);
}

export async function sendMail(
  input: SendMailInput,
  resend: Resend | null = getResend(),
): Promise<SendMailResult> {
  if (!resend) return { ok: false, error: 'RESEND_API_KEY missing' };

  const from = input.from ?? getMailFrom();
  const recipients = Array.isArray(input.to) ? input.to : [input.to];

  try {
    const result = await resend.emails.send({
      from,
      to: recipients,
      subject: input.subject,
      html: input.html,
      replyTo: input.replyTo,
      bcc: input.bcc,
    });

    if (result.error) {
      console.error('[mailer] Resend rejected the message', {
        from,
        to: recipients,
        subject: input.subject,
        error: result.error,
      });
      return { ok: false, error: result.error.message ?? String(result.error) };
    }

    console.log('[mailer] sent', {
      id: result.data?.id,
      from,
      to: recipients,
      subject: input.subject,
    });
    return { ok: true, id: result.data?.id };
  } catch (err) {
    console.error('[mailer] send threw', {
      from,
      to: recipients,
      subject: input.subject,
      err,
    });
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
