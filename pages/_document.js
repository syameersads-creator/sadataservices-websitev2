import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
  {/* Favicon */}
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="apple-touch-icon" href="/favicon.ico" />

  {/* Primary Meta Tags */}
  <title>S&A Data Services | Your Project. Smarter. Faster. Digital.</title>
  <meta
    name="description"
    content="S&A Data Services is a digital transformation partner for the construction and built environment sectors. We specialize in BIM modelling, analytical dashboards, automation & AI solutions."
  />
  <meta name="theme-color" content="#0097E6" />

  {/* Open Graph / Facebook / LinkedIn */}
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://sadataservices.com.my" />
  <meta property="og:title" content="S&A Data Services" />
  <meta
    property="og:description"
    content="Your Project. Smarter. Faster. Digital."
  />
  <meta property="og:image" content="/og-image.png" />

  {/* Twitter / WhatsApp Preview */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="S&A Data Services" />
  <meta
    name="twitter:description"
    content="Your Project. Smarter. Faster. Digital."
  />
  <meta name="twitter:image" content="/og-image.png" />

  {/* SEO Keywords */}
  <meta
    name="keywords"
    content="S&A Data Services, BIM Modelling, Automation AI, Dashboard Development, Construction Technology, Digital Twin Malaysia, Scan to BIM"
  />
</Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
