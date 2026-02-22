import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impressum – SODU Secure GmbH',
  description: 'Impressum der SODU Secure GmbH gemäß § 5 TMG',
  robots: { index: false, follow: false },
};

export default function Impressum() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Impressum</h1>
          <p className="text-gray-500 text-sm">Angaben gemäß § 5 TMG</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 divide-y divide-gray-100">

          {/* Anbieter */}
          <section className="p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Angaben zum Unternehmen</h2>
            <address className="not-italic text-gray-700 space-y-1 leading-relaxed">
              <p className="font-semibold text-gray-900">SODU Secure GmbH</p>
              <p>Riemannstr. 8</p>
              <p>10961 Berlin</p>
              <p>Deutschland</p>
            </address>
          </section>

          {/* Kontakt */}
          <section className="p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Kontakt</h2>
            <div className="text-gray-700 space-y-2">
              <p>
                <span className="font-medium">Telefon:</span>{' '}
                <a href="tel:+4917923962949" className="text-red-600 hover:underline">
                  +49 179 239 6294
                </a>
              </p>
              <p>
                <span className="font-medium">E-Mail:</span>{' '}
                <a href="mailto:sodusecure@gmail.com" className="text-red-600 hover:underline">
                  sodusecure@gmail.com
                </a>
              </p>
            </div>
          </section>

          {/* Geschäftsführer */}
          <section className="p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Vertretungsberechtigter Geschäftsführer</h2>
            <p className="text-gray-700">Kerim Koc</p>
          </section>

          {/* Registereintrag */}
          <section className="p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Registereintrag</h2>
            <div className="text-gray-700 space-y-2">
              <p>
                <span className="font-medium">Registergericht:</span> Amtsgericht Charlottenburg Berlin
              </p>
              <p>
                <span className="font-medium">Registernummer:</span> HRB 123456 B
              </p>
            </div>
          </section>

          {/* USt-IdNr. */}
          <section className="p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Umsatzsteuer-Identifikationsnummer</h2>
            <p className="text-gray-700">
              Gemäß § 27a Umsatzsteuergesetz:{' '}
              <span className="font-medium">DE123456789</span>
            </p>
          </section>

          {/* Haftungsausschluss */}
          <section className="p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Haftungsausschluss</h2>
            <div className="text-gray-600 text-sm space-y-4 leading-relaxed">
              <div>
                <p className="font-medium text-gray-700 mb-1">Haftung für Inhalte</p>
                <p>
                  Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach
                  den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter
                  jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen
                  oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-700 mb-1">Haftung für Links</p>
                <p>
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss
                  haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die
                  Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
                  verantwortlich.
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-700 mb-1">Urheberrecht</p>
                <p>
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
                  deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                  Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
                  jeweiligen Autors bzw. Erstellers.
                </p>
              </div>
            </div>
          </section>

        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          © {new Date().getFullYear()} SODU Secure GmbH · Berlin
        </p>
      </div>
    </div>
  );
}
