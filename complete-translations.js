const fs = require('fs');

const en = JSON.parse(fs.readFileSync('./messages/en.json'));
const de = JSON.parse(fs.readFileSync('./messages/de.json'));

// Complete careers translations
en.careers = {
  hero: {
    badge: "Join Our Team",
    title: "Build the Future of Cybersecurity",
    description: "Join SodoSecure and work with a talented team of security experts to protect organizations worldwide."
  },
  whyWorkWithUs: {
    title: "Why Work With Us",
    description: "We offer a competitive and inclusive workplace where security professionals can thrive.",
    benefits: {
      cuttingEdgeWork: {
        title: "Cutting-Edge Work",
        description: "Work on the latest security challenges and technologies in the industry."
      },
      continuousLearning: {
        title: "Continuous Learning",
        description: "Access training, certifications, and conferences to advance your skills."
      },
      workLifeBalance: {
        title: "Work-Life Balance",
        description: "Flexible working hours and remote options to maintain a healthy balance."
      },
      collaborativeCulture: {
        title: "Collaborative Culture",
        description: "Work with talented professionals who are passionate about security."
      },
      competitiveBenefits: {
        title: "Competitive Benefits",
        description: "Competitive salary, health insurance, and other perks."
      },
      makeAnImpact: {
        title: "Make an Impact",
        description: "Help organizations protect their critical assets and sensitive data."
      }
    }
  },
  openPositions: {
    title: "Open Positions",
    description: "positions available",
    viewDetails: "View Details",
    positions: {
      seniorPenetrationTester: {
        title: "Senior Penetration Tester",
        type: "Full-time",
        location: "Berlin / Remote",
        description: "Lead penetration testing projects and mentor junior team members. You'll work on complex security assessments for enterprise clients."
      },
      cloudSecuritySpecialist: {
        title: "Cloud Security Specialist",
        type: "Full-time",
        location: "Remote",
        description: "Specialize in AWS, Azure, and GCP security. Help organizations secure their cloud infrastructure and implement best practices."
      },
      securityConsultant: {
        title: "Security Consultant",
        type: "Full-time",
        location: "Berlin",
        description: "Work directly with clients to improve their overall security posture through assessments and consulting."
      },
      redTeamOperator: {
        title: "Red Team Operator",
        type: "Full-time",
        location: "Remote",
        description: "Simulate advanced adversaries to test organizational defenses through comprehensive red team engagements."
      },
      juniorPenetrationTester: {
        title: "Junior Penetration Tester",
        type: "Full-time",
        location: "Berlin",
        description: "Start your career in offensive security with comprehensive training and hands-on experience."
      },
      securityResearcher: {
        title: "Security Researcher",
        type: "Full-time",
        location: "Remote",
        description: "Discover new vulnerabilities, develop exploits, and contribute to the security research community."
      }
    }
  },
  cta: {
    title: "Ready to Join Us?",
    description: "Send us your application and let's discuss how you can make an impact on cybersecurity.",
    sendApplication: "Send Application",
    scheduleCall: "Schedule a Call",
    responseTime: "We typically respond within 2-3 business days"
  },
  applicationProcess: {
    title: "Our Application Process",
    steps: {
      submitApplication: {
        title: "Submit Your Application",
        description: "Send us your resume, portfolio, and a brief cover letter explaining your interest."
      },
      technicalInterview: {
        title: "Technical Interview",
        description: "Discuss your technical skills and experience in a focused technical assessment."
      },
      teamInterview: {
        title: "Team Interview",
        description: "Meet with our team to discuss culture fit and your career goals."
      },
      offerOnboarding: {
        title: "Offer & Onboarding",
        description: "Receive an offer and begin your onboarding journey with SodoSecure."
      }
    }
  }
};

de.careers = {
  hero: {
    badge: "Treten Sie unserem Team bei",
    title: "Die Zukunft der Cybersicherheit gestalten",
    description: "Treten Sie SodoSecure bei und arbeiten Sie mit einem talentierten Team von Sicherheitsexperten zusammen, um Organisationen weltweit zu schützen."
  },
  whyWorkWithUs: {
    title: "Warum bei uns arbeiten",
    description: "Wir bieten einen wettbewerbsfähigen und integrativen Arbeitsplatz, an dem Sicherheitsfachleute gedeihen können.",
    benefits: {
      cuttingEdgeWork: {
        title: "Modernste Arbeiten",
        description: "Arbeiten Sie an den neuesten Sicherheitsherausforderungen und Technologien in der Branche."
      },
      continuousLearning: {
        title: "Kontinuierliches Lernen",
        description: "Zugang zu Schulungen, Zertifizierungen und Konferenzen zur Weiterentwicklung Ihrer Fähigkeiten."
      },
      workLifeBalance: {
        title: "Work-Life-Balance",
        description: "Flexible Arbeitszeiten und Remote-Optionen für ein gesundes Gleichgewicht."
      },
      collaborativeCulture: {
        title: "Kooperative Kultur",
        description: "Arbeiten Sie mit talentierten Fachleuten zusammen, die leidenschaftlich für Sicherheit sind."
      },
      competitiveBenefits: {
        title: "Wettbewerbsfähige Leistungen",
        description: "Wettbewerbsfähiges Gehalt, Krankenversicherung und weitere Vorteile."
      },
      makeAnImpact: {
        title: "Einen Unterschied machen",
        description: "Helfen Sie Organisationen, ihre kritischen Vermögenswerte und vertraulichen Daten zu schützen."
      }
    }
  },
  openPositions: {
    title: "Offene Stellen",
    description: "Positionen verfügbar",
    viewDetails: "Details ansehen",
    positions: {
      seniorPenetrationTester: {
        title: "Senior-Penetrationstester",
        type: "Vollzeit",
        location: "Berlin / Remote",
        description: "Leiten Sie Penetrationstestprojekte und mentorieren Sie jüngere Teamkollegen. Sie arbeiten an komplexen Sicherheitsbewertungen für Unternehmenskunden."
      },
      cloudSecuritySpecialist: {
        title: "Cloud-Sicherheitsspezialist",
        type: "Vollzeit",
        location: "Remote",
        description: "Spezialisieren Sie sich auf AWS-, Azure- und GCP-Sicherheit. Helfen Sie Organisationen, ihre Cloud-Infrastruktur zu sichern und Best Practices umzusetzen."
      },
      securityConsultant: {
        title: "Sicherheitsberater",
        type: "Vollzeit",
        location: "Berlin",
        description: "Arbeiten Sie direkt mit Kunden zusammen, um ihre Gesamtsicherheitsposition durch Bewertungen und Beratung zu verbessern."
      },
      redTeamOperator: {
        title: "Red Team Operator",
        type: "Vollzeit",
        location: "Remote",
        description: "Simulieren Sie fortgeschrittene Gegner, um organisatorische Verteidigungen durch umfassende Red Team Engagements zu testen."
      },
      juniorPenetrationTester: {
        title: "Junior-Penetrationstester",
        type: "Vollzeit",
        location: "Berlin",
        description: "Starten Sie Ihre Karriere in Offensive Security mit umfassender Anleitung und praktischer Erfahrung."
      },
      securityResearcher: {
        title: "Sicherheitsforscher",
        type: "Vollzeit",
        location: "Remote",
        description: "Entdecken Sie neue Schwachstellen, entwickeln Sie Exploits und tragen Sie zur Sicherheitsforschungs-Community bei."
      }
    }
  },
  cta: {
    title: "Bereit, uns beizutreten?",
    description: "Senden Sie uns Ihre Bewerbung und lassen Sie uns besprechen, wie Sie die Cybersicherheit beeinflussen können.",
    sendApplication: "Bewerbung senden",
    scheduleCall: "Anruf vereinbaren",
    responseTime: "Wir antworten in der Regel innerhalb von 2-3 Werktagen"
  },
  applicationProcess: {
    title: "Unser Bewerbungsprozess",
    steps: {
      submitApplication: {
        title: "Senden Sie Ihre Bewerbung",
        description: "Senden Sie uns Ihren Lebenslauf, Ihr Portfolio und ein kurzes Anschreiben, das Ihr Interesse erklärt."
      },
      technicalInterview: {
        title: "Technisches Gespräch",
        description: "Besprechen Sie Ihre technischen Fähigkeiten und Erfahrung in einer fokussierten technischen Bewertung."
      },
      teamInterview: {
        title: "Team-Gespräch",
        description: "Treffen Sie sich mit unserem Team, um die Kulturpassung und Ihre Karriereziele zu besprechen."
      },
      offerOnboarding: {
        title: "Angebot & Onboarding",
        description: "Erhalten Sie ein Angebot und beginnen Sie Ihre Onboarding-Reise mit SodoSecure."
      }
    }
  }
};

// Add requestPentest categories
en.requestPentest.categories = {
  title: "Select Test Category",
  subtitle: "Choose the type of penetration test that best fits your security needs",
  notSure: "Not sure which test you need?",
  notSureDesc: "Our security experts can help you determine the right penetration test for your organization",
  items: [
    {
      title: "Web Application Pentest",
      description: "Comprehensive security testing of your web applications, including static and dynamic analysis",
      features: [
        "Black-box & Grey-box testing",
        "Multiple user roles testing",
        "OWASP Top 10 coverage",
        "Detailed vulnerability report"
      ]
    },
    {
      title: "API / Backend Pentest",
      description: "In-depth security assessment of your APIs and backend services",
      features: [
        "REST & GraphQL APIs",
        "Authentication & authorization",
        "Business logic testing",
        "Rate limiting & abuse cases"
      ]
    },
    {
      title: "Infrastructure Pentest",
      description: "Network and system security testing for public or internal infrastructure",
      features: [
        "Public & internal networks",
        "Server configuration review",
        "Network segmentation",
        "Privilege escalation testing"
      ]
    },
    {
      title: "Awareness (Training & Phishing)",
      description: "Security awareness training and phishing simulations for your team",
      features: [
        "Phishing simulations",
        "Security training sessions",
        "Online & on-site options",
        "Customized to your industry"
      ]
    }
  ]
};

de.requestPentest.categories = {
  title: "Test-Kategorie wählen",
  subtitle: "Wählen Sie die Art des Penetrationstests, die Ihren Sicherheitsanforderungen entspricht",
  notSure: "Sind Sie sich unsicher, welchen Test Sie benötigen?",
  notSureDesc: "Unsere Sicherheitsexperten können Ihnen helfen, den richtigen Penetrationstest für Ihre Organisation zu bestimmen",
  items: [
    {
      title: "Webanwendungs-Penetrationstest",
      description: "Umfassende Sicherheitstests von Webanwendungen, einschließlich statischer und dynamischer Analyse",
      features: [
        "Black-Box & Grey-Box Tests",
        "Tests mit mehreren Benutzerrollen",
        "OWASP Top 10 Abdeckung",
        "Detaillierter Schwachstellenbericht"
      ]
    },
    {
      title: "API / Backend Penetrationstest",
      description: "Tiefgehendes Sicherheitsaudit von APIs und Backend-Services",
      features: [
        "REST & GraphQL APIs",
        "Authentifizierung & Autorisierung",
        "Business-Logic-Tests",
        "Rate Limiting & Missbrauchsfälle"
      ]
    },
    {
      title: "Infrastruktur-Penetrationstest",
      description: "Netzwerk- und Systemsicherheitstests für öffentliche oder interne Infrastruktur",
      features: [
        "Öffentliche & interne Netzwerke",
        "Serverkonfigurationsüberprüfung",
        "Netzwerksegmentierung",
        "Privilege-Escalation-Tests"
      ]
    },
    {
      title: "Sicherheitsbewusstsein (Training & Phishing)",
      description: "Sicherheitsbewusstseinsschulung und Phishing-Simulationen für Ihr Team",
      features: [
        "Phishing-Simulationen",
        "Sicherheitsschulungen",
        "Online & vor Ort Optionen",
        "Nach Ihrer Branche angepasst"
      ]
    }
  ]
};

fs.writeFileSync('./messages/en.json', JSON.stringify(en, null, 2));
fs.writeFileSync('./messages/de.json', JSON.stringify(de, null, 2));

console.log('✓ All careers translations completed');
console.log('✓ All requestPentest categories added');
