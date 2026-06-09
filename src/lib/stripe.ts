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
export type BillingInterval = 'month' | 'year';

export const MAX_REPOS_PER_PLAN: Record<AuditPlan, number> = {
  starter: 1,
  studio: 1,
  pro: 4,
};

/** Einmalige Setup-/Onboarding-Gebühr (Repo-Anbindung, Baseline-Audit, Slack/Teams-Integration). */
export const SETUP_FEE_CENTS = 50000;
export const SETUP_FEE_LABEL = '500 € einmalig';

type PlanPricing = {
  amountCents: number;
  priceLabel: string;
};

type PlanInfo = {
  label: string;
  cadence: string;
  monthly: PlanPricing;
  yearly: PlanPricing;
};

export const AUDIT_PLAN_INFO: Record<AuditPlan, PlanInfo> = {
  starter: {
    label: 'Starter',
    cadence: '1 Audit-Lauf pro Monat · 1 Contributor',
    monthly: { amountCents: 9900, priceLabel: '99 €/Monat' },
    yearly: { amountCents: 106800, priceLabel: '1.068 €/Jahr' },
  },
  studio: {
    label: 'Studio',
    cadence: 'Wöchentlicher Bericht · 1 Repo · unbegrenzte Contributoren',
    monthly: { amountCents: 19900, priceLabel: '199 €/Monat' },
    yearly: { amountCents: 214800, priceLabel: '2.148 €/Jahr' },
  },
  pro: {
    label: 'Pro+',
    cadence: 'Wöchentlich · bis zu 4 Repos (1 Projekt) · quartalsweise Voll-Pentest',
    monthly: { amountCents: 44900, priceLabel: '449 €/Monat' },
    yearly: { amountCents: 484800, priceLabel: '4.848 €/Jahr' },
  },
};

export function getPlanPricing(plan: AuditPlan, interval: BillingInterval): PlanPricing {
  return interval === 'year' ? AUDIT_PLAN_INFO[plan].yearly : AUDIT_PLAN_INFO[plan].monthly;
}

export function isAuditPlan(v: unknown): v is AuditPlan {
  return v === 'starter' || v === 'studio' || v === 'pro';
}

export function isBillingInterval(v: unknown): v is BillingInterval {
  return v === 'month' || v === 'year';
}

/**
 * Resolve the Stripe Price ID for a plan + interval from environment variables.
 * Monthly:  STRIPE_PRICE_STARTER / STRIPE_PRICE_STUDIO / STRIPE_PRICE_PRO
 * Yearly:   STRIPE_PRICE_STARTER_YEARLY / STRIPE_PRICE_STUDIO_YEARLY / STRIPE_PRICE_PRO_YEARLY
 * Returns null when not configured so callers can fall back to inline price_data.
 */
export function getPlanPriceId(plan: AuditPlan, interval: BillingInterval = 'month'): string | null {
  const monthly: Record<AuditPlan, string | undefined> = {
    starter: process.env.STRIPE_PRICE_STARTER,
    studio: process.env.STRIPE_PRICE_STUDIO,
    pro: process.env.STRIPE_PRICE_PRO,
  };
  const yearly: Record<AuditPlan, string | undefined> = {
    starter: process.env.STRIPE_PRICE_STARTER_YEARLY,
    studio: process.env.STRIPE_PRICE_STUDIO_YEARLY,
    pro: process.env.STRIPE_PRICE_PRO_YEARLY,
  };
  return (interval === 'year' ? yearly[plan] : monthly[plan]) || null;
}

/**
 * Stable identifier for our auto-managed VAT tax rate. Used to find an existing
 * tax rate in the Stripe account so we don't create a duplicate on every cold start.
 */
const SODU_VAT_METADATA_KEY = 'sodu_audit_ai_vat_de_19';
let cachedVatRateId: string | null = null;

/**
 * Returns a Stripe Tax Rate ID for German 19 % VAT (exclusive / netto).
 * Resolution order:
 *   1. STRIPE_TAX_RATE_ID env var (explicit override).
 *   2. In-memory cache from a previous call.
 *   3. Look up an existing tax rate in the connected Stripe account
 *      that we previously created (matched via metadata).
 *   4. Create a new tax rate (display name "MwSt. Deutschland", 19 %, exclusive)
 *      and cache it for the lifetime of the Node process.
 *
 * This means the integrator does not need to configure anything in Stripe -
 * the first checkout creates the tax rate automatically.
 */
export async function getOrCreateVatTaxRateId(): Promise<string> {
  const envId = process.env.STRIPE_TAX_RATE_ID;
  if (envId) return envId;
  if (cachedVatRateId) return cachedVatRateId;

  const stripe = getStripe();

  // Look for an existing active rate we created earlier (Stripe lists up to 100 by default).
  const list = await stripe.taxRates.list({ active: true, limit: 100 });
  const existing = list.data.find(
    (r) =>
      r.metadata?.source === SODU_VAT_METADATA_KEY ||
      (r.country === 'DE' && r.percentage === 19 && r.inclusive === false && r.active),
  );
  if (existing) {
    cachedVatRateId = existing.id;
    return existing.id;
  }

  const created = await stripe.taxRates.create({
    display_name: 'MwSt.',
    description: 'Deutsche Umsatzsteuer (19 %, netto)',
    jurisdiction: 'DE',
    country: 'DE',
    percentage: 19,
    inclusive: false,
    tax_type: 'vat',
    metadata: { source: SODU_VAT_METADATA_KEY },
  });
  cachedVatRateId = created.id;
  return created.id;
}
