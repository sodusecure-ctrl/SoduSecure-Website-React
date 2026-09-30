import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://sodusecure.com';

  // Nur reine Redirect-/API-Endpunkte per robots.txt sperren.
  // Seiten, die aus dem Index sollen, bekommen stattdessen ein noindex-Meta-Tag —
  // dafür muss Google sie crawlen dürfen, also hier NICHT sperren.
  const disallow = ['/api/', '/t/', '/lang/'];

  // KI-Crawler bewusst und explizit erlauben.
  //
  // Warum explizit, obwohl die '*'-Regel sie ohnehin durchlässt:
  // Eine eigene Regel pro Token dokumentiert die Absicht und verhindert, dass ein
  // später aktivierter pauschaler "Block AI Bots"-Schalter (CDN/WAF) unbemerkt als
  // gewollt durchgeht. robots.txt bleibt damit die verbindliche Referenz.
  //
  // Warum erlauben statt blocken: Wer die Retrieval-Bots sperrt, verschwindet aus
  // ChatGPT-/Perplexity-/Copilot-Antworten und verliert die Zitierungen — Training
  // lässt sich damit ohnehin nicht zuverlässig verhindern.
  //
  // Zwei Gruppen, absichtlich beide erlaubt:
  //   Retrieval/Zitierung (entscheidet über Sichtbarkeit in KI-Antworten):
  //     OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User,
  //     PerplexityBot, Perplexity-User, Bingbot (Copilot), Googlebot, Applebot
  //   Training/Grounding (Steuertokens ohne eigenen Abruf bzw. Trainings-Crawler):
  //     GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot,
  //     meta-externalagent, OAI-AdsBot
  const aiCrawlers = [
    // OpenAI
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'OAI-AdsBot',
    // Anthropic
    'ClaudeBot',
    'Claude-SearchBot',
    'Claude-User',
    // Perplexity
    'PerplexityBot',
    'Perplexity-User',
    // Google (Google-Extended steuert nur Gemini-Training/Grounding,
    // nicht die Sichtbarkeit in Google Search oder AI Overviews)
    'Googlebot',
    'Google-Extended',
    // Microsoft / Copilot
    'Bingbot',
    // Apple (Applebot-Extended steuert nur die Trainingsnutzung)
    'Applebot',
    'Applebot-Extended',
    // Meta
    'meta-externalagent',
    // Common Crawl (Datenquelle mehrerer Modelle)
    'CCBot',
  ];

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow },
      { userAgent: aiCrawlers, allow: '/', disallow },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
