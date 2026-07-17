/**
 * Trust strip with scrolling certification marquee – same markup as the
 * homepage TRUST STRIP (HomeClient). Drop directly below a landing page hero.
 */
export default function TrustCertMarquee({
  eyebrow = 'Made in Germany · OSCP-zertifiziert · Hand-getestet',
}: {
  eyebrow?: string;
}) {
  const certs = ['OSCP+', 'OSWE', 'CEH', 'ISO 27001', 'BSI TR-03161', 'OWASP', 'NIST', 'GDPR', 'NIS2', 'DORA', 'MDR', 'BSIG'];
  return (
    <section className="premium-section">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-6">
        <div className="flex items-center gap-8">
          <p className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">{eyebrow}</p>
          <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
            <div className="premium-marquee flex w-max items-center gap-12 text-[13px] font-medium text-white/55">
              {[...Array(2)].map((_, dup) => (
                <div key={dup} className="flex items-center gap-12 pr-12">
                  {certs.map((label, i) => (
                    <span key={label} className="flex items-center gap-12">
                      <span className="tracking-tight">{label}</span>
                      {i < certs.length - 1 && <span className="h-1 w-1 rounded-full bg-[#0A0A0B]/15" />}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
