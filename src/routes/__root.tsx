import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { PAGE_SEO, SITE_URL, buildPageLinks, buildPageMeta } from "@/lib/seo";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

const rootPage = PAGE_SEO.home;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      ...buildPageMeta(rootPage),
    ],
    links: [
      ...buildPageLinks(rootPage),
      // Google Search favicon — stable URLs (no cache-bust query). Must be ≥48×48 square PNG.
      // Small sizes use ORA-only crop (clearer in SERP); google-logo.png stays full brand for schema.
      {
        rel: "icon",
        href: `${SITE_URL}/favicon-48x48.png`,
        type: "image/png",
        sizes: "48x48",
      },
      {
        rel: "icon",
        href: `${SITE_URL}/favicon-96x96.png`,
        type: "image/png",
        sizes: "96x96",
      },
      {
        rel: "icon",
        href: `${SITE_URL}/favicon-192x192.png`,
        type: "image/png",
        sizes: "192x192",
      },
      {
        rel: "icon",
        href: `${SITE_URL}/favicon.png`,
        type: "image/png",
        sizes: "512x512",
      },
      {
        rel: "shortcut icon",
        href: `${SITE_URL}/favicon.ico`,
        type: "image/x-icon",
      },
      {
        rel: "apple-touch-icon",
        href: `${SITE_URL}/apple-touch-icon.png`,
        sizes: "180x180",
      },
      { rel: "image_src", href: `${SITE_URL}/google-logo.png` },
      { rel: "manifest", href: `${SITE_URL}/site.webmanifest` },
      { rel: "sitemap", type: "application/xml", href: `${SITE_URL}/sitemap.xml` },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Inter:wght@300;400;500;600&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-PK">
      <head>
        {/* Google Tag Manager — keep as high in <head> as possible */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NVCC7DPD');`,
          }}
        />
        {/* Meta (Facebook) Pixel base code — every page */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init','2916628175360380');
fbq('track','PageView');`,
          }}
        />
        <noscript>
          <img
            height={1}
            width={1}
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2916628175360380&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <HeadContent />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NVCC7DPD"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
