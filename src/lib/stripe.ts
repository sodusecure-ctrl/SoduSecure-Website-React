import Stripe from 'stripe';

let stripeSingleton: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeSingleton) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY is not configured');
    }
    stripeSingleton = new Stripe(key, {
      apiVersion: '2026-05-27.dahlia',
      typescript: true,
    });
  }
  return stripeSingleton;
}

export type AuditPlan = 'starter' | 'studio' | 'pro';

export const AUDIT_PLAN_INFO: Record<
  AuditPlan,
  { label: string; priceLabel: string; cadence: string; amountCents: number }
> = {
  starter: {
    label: 'Starter',
    priceLabel: '99 €/Monat',
    cadence: '1 Audit-Lauf pro Monat · 1 Contributor',
    amountCents: 9900,
  },
  studio: {
    label: 'Studio',
    priceLabel: '199 €/Monat',
    cadence: 'Wöchentlicher Bericht · 1 Repo · unbegrenzte Contributoren',
    amountCents: 19900,
  },
  pro: {
    label: 'Pro+',
    priceLabel: '449 €/Monat',
    cadence: 'Wöchentlich · mehrere Repos · quartalsweise Voll-Pentest',
    amountCents: 44900,
  },
};

export function isAuditPlan(v: unknown): v is AuditPlan {
  return v === 'starter' || v === 'studio' || v === 'pro';
}

/**
 * Resolve the Stripe Price ID for a plan from environment variables.
 * Set STRIPE_PRICE_STARTER / STRIPE_PRICE_STUDIO / STRIPE_PRICE_PRO in your env.
 * Returns null when not configured so callers can fall back to inline price_data.
 */
export function getPlanPriceId(plan: AuditPlan): string | null {
  const map: Record<AuditPlan, string | undefined> = {
    starter: process.env.STRIPE_PRICE_STARTER,
    studio: process.env.STRIPE_PRICE_STUDIO,
    pro: process.env.STRIPE_PRICE_PRO,
  };
  return map[plan] || null;
}
