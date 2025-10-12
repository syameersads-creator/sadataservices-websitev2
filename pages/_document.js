import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.ico" />

        {/* Meta tags */}
        <meta name="theme-color" content="#0097E6" />
        <meta
          name="description"
          content="S&A Data Services - Digital transformation partner for the construction and built environment sectors."
        />
        <meta property="og:title" content="S&A Data Services" />
        <meta
          property="og:description"
          content="Your Project. Smarter. Faster. Digital."
        />
        <meta property="og:image" content="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
