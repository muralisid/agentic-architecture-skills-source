import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Newsreader, Sora } from 'next/font/google';
import type { Metadata } from 'next';
import { appName, appDescription, author, siteUrl } from '@/lib/shared';
import { jsonLd, siteGraph } from '@/lib/structured-data';
import { ScrollToTop } from '@/components/site/scroll-to-top';

// Body in Sora, display headings in Newsreader: the same pairing as the fn7
// marketing site, so the guide reads as part of the same family.
const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
});


export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: appName,
    template: `%s | ${appName}`,
  },
  description: appDescription,
  applicationName: appName,
  // Authorship on every page, so a crawler never has to infer it.
  authors: [{ name: author.name, url: author.url }],
  creator: author.name,
  publisher: author.name,
  // The Markdown index was reachable only by guessing the convention, since
  // nothing linked it. Declaring it as an alternate representation lets a
  // crawler find it from any page.
  alternates: { canonical: '/', types: { 'text/markdown': '/llms.txt' } },
  openGraph: {
    title: appName,
    description: appDescription,
    url: siteUrl,
    siteName: appName,
    type: 'website',
    locale: 'en',
  },
  twitter: {
    card: 'summary_large_image',
    title: appName,
    description: appDescription,
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${sora.variable} ${newsreader.variable} ${sora.className}`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        {/* Who wrote this site, as one entity every page refers back to. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(siteGraph()) }}
        />
        <a
          href="#main-content"
          className="fixed left-3 top-3 z-[100] -translate-y-24 rounded-full bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground transition-transform focus:translate-y-0"
        >
          Skip to main content
        </a>
        <RootProvider theme={{ defaultTheme: 'light', enableSystem: false }}>
          <ScrollToTop />
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
