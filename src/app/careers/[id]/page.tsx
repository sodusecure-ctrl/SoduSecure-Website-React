"use client";
import { ArrowLeft, Briefcase, MapPin, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function JobDetailPage() {
  const router = useRouter();
  const responsibilities = [
    'Conduct comprehensive penetration tests on web applications, mobile apps, and infrastructure',
    'Identify and document security vulnerabilities with detailed remediation guidance',
    'Develop custom exploit code and testing methodologies',
    'Collaborate with clients to explain findings and security best practices',
    'Mentor junior team members and contribute to internal knowledge base'
  ];

  const requirements = [
    '5+ years of experience in penetration testing or offensive security',
    'OSCP, CEH, or equivalent certifications',
    'Deep understanding of OWASP Top 10 and common vulnerability classes',
    'Proficiency with Burp Suite, Metasploit, and other security tools',
    'Strong written and verbal communication skills',
    'Experience with at least one scripting language (Python, Ruby, etc.)'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-6 sm:py-8 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <button 
            onClick={() => router.push('/careers')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4 sm:mb-6 text-sm sm:text-base"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Back to Careers
          </button>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
                Senior Penetration Tester
              </h1>

              <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm">
                <div className="flex items-center gap-1.5 sm:gap-2 text-gray-300 bg-gray-900/50 px-3 py-1.5 rounded-full">
                  <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>Full-time</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-gray-300 bg-gray-900/50 px-3 py-1.5 rounded-full">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>Berlin / Remote</span>
                </div>
              </div>
            </div>

            {/* Share button for mobile/tablet */}
            <button className="sm:hidden flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2.5 rounded-lg transition-colors">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-6 sm:py-8 lg:py-12 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {/* Left Column - Job Details */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8 lg:space-y-10">
            {/* Role Summary */}
            <section className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">Role Summary</h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Join our team as a Senior Penetration Tester and help secure enterprise applications worldwide.
              </p>
            </section>

            {/* Responsibilities */}
            <section className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">Responsibilities</h2>
              <ul className="space-y-2.5 sm:space-y-3">
                {responsibilities.map((item, index) => (
                  <li key={index} className="flex items-start gap-2.5 sm:gap-3">
                    <span className="text-red-600 mt-1.5 sm:mt-2 flex-shrink-0 text-lg">•</span>
                    <span className="text-gray-700 text-sm sm:text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Requirements */}
            <section className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">Requirements</h2>
              <ul className="space-y-2.5 sm:space-y-3">
                {requirements.map((item, index) => (
                  <li key={index} className="flex items-start gap-2.5 sm:gap-3">
                    <span className="text-red-600 mt-1.5 sm:mt-2 flex-shrink-0 text-lg">•</span>
                    <span className="text-gray-700 text-sm sm:text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* About Company */}
            <section className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">About Sodu Secure</h2>
              <div className="space-y-3 sm:space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
                <p>
                  Sodu Secure is a leading cybersecurity firm specializing in penetration testing and security
                  assessments. We work with organizations across all industries to identify and fix security vulnerabilities
                  before they can be exploited.
                </p>
                <p>
                  Our team consists of highly skilled security professionals who are passionate about offensive security
                  and helping organizations improve their security posture. We foster a culture of continuous learning,
                  collaboration, and technical excellence.
                </p>
              </div>
            </section>

            {/* Mobile Apply Button - Only visible on mobile/tablet */}
            <div className="lg:hidden bg-red-600 text-white rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">Interessiert?</h3>
              <p className="text-sm mb-4 opacity-90">Sende deine Bewerbung an:</p>
              <a 
                href="mailto:careers@sodusecure.com"
                className="block w-full bg-white text-red-600 hover:bg-gray-100 font-semibold py-6 text-base rounded-lg text-center transition-colors"
              >
                careers@sodusecure.com
              </a>
            </div>
          </div>

          {/* Right Column - Application Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-4 sm:space-y-6">
              {/* Apply Card */}
              <div className="bg-red-600 text-white p-4 sm:p-6 lg:p-8 rounded-lg">
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Interessiert?</h3>
                <p className="text-xs sm:text-sm mb-4 sm:mb-6 opacity-90">
                  Sende deine Bewerbung an:
                </p>
                <a 
                  href="mailto:careers@sodusecure.com"
                  className="block w-full bg-white text-red-600 hover:bg-gray-100 font-semibold py-4 sm:py-6 text-sm sm:text-base rounded-lg text-center transition-colors"
                >
                  careers@sodusecure.com
                </a>
              </div>

              {/* Quick Information */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 space-y-3 sm:space-y-4">
                <h3 className="text-lg font-bold mb-3 sm:mb-4">Quick Information</h3>

                <div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">Department</p>
                  <p className="font-semibold text-sm sm:text-base">Security Testing</p>
                </div>

                <div className="border-t border-gray-200 pt-3 sm:pt-4">
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">Employment Type</p>
                  <p className="font-semibold text-sm sm:text-base">Full-time</p>
                </div>

                <div className="border-t border-gray-200 pt-3 sm:pt-4">
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">Location</p>
                  <p className="font-semibold text-sm sm:text-base">Berlin / Remote</p>
                </div>

                <div className="border-t border-gray-200 pt-3 sm:pt-4">
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">Experience Level</p>
                  <p className="font-semibold text-sm sm:text-base">Senior</p>
                </div>

                <div className="border-t border-gray-200 pt-3 sm:pt-4">
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">Posted</p>
                  <p className="font-semibold text-sm sm:text-base">December 15, 2024</p>
                </div>

                <div className="border-t border-gray-200 pt-3 sm:pt-4">
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">Application Deadline</p>
                  <p className="font-semibold text-sm sm:text-base">January 15, 2025</p>
                </div>
              </div>

              {/* Share Section - Hidden on mobile, visible on desktop */}
              <div className="hidden sm:block bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
                <h3 className="text-lg font-bold mb-3 sm:mb-4">Share this Job</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  <button className="w-full justify-center text-xs sm:text-sm border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors">
                    LinkedIn
                  </button>
                  <button className="w-full justify-center text-xs sm:text-sm border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors">
                    Twitter
                  </button>
                </div>
              </div>

              {/* Contact for Questions */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6">
                <h3 className="text-lg font-bold mb-2 sm:mb-3">Questions?</h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
                  Contact our recruitment team for more information.
                </p>
                <a
                  href="mailto:careers@sodusecure.com"
                  className="text-red-600 hover:text-red-700 text-sm sm:text-base font-medium"
                >
                  careers@sodusecure.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Apply Button for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-sm">Senior Penetration Tester</p>
              <p className="text-gray-600 text-xs">Full-time • Berlin / Remote</p>
            </div>
            <a 
              href="mailto:careers@sodusecure.com"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 text-sm rounded-lg transition-colors"
            >
              Bewerben
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}