import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { PAGE_SEO, SITE_URL, buildPageLinks, buildPageMeta } from "@/lib/seo";
import { SmoothScroll } from "@/lib/smooth-scroll";
import homePosterMobile from "@/assets/home-poster-mobile.webp";
import heroDesktop from "@/assets/her-section-bg.webp";

import appCss from "../styles.css?url";

const FONT_CSS =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Inter:wght@400;500&display=optional";

/**
 * Mobile-only critical CSS (scoped ≤1023px). Desktop never uses this path —
 * full Tailwind stays render-blocking via media="(min-width:1024px)".
 * Do NOT use a{color:inherit} — that made CTA text invisible on olive.
 */
const CRITICAL_MOBILE_CSS = `
@media (max-width:1023px){
html{background:#f5f1eb}
body{margin:0;background:#f5f1eb;color:#4d5645;font-family:Georgia,"Times New Roman",serif}
img{max-width:100%;height:auto}
.ora-m-header{position:sticky;top:0;z-index:40;background:rgba(245,241,235,.92);border-bottom:1px solid rgba(77,86,69,.12)}
.ora-m-header>div{display:flex;align-items:center;justify-content:space-between;padding:1rem 1.5rem;box-sizing:border-box}
.ora-m-header img{height:2rem;width:auto}
.ora-m-hero{position:relative;display:flex;flex-direction:column;min-height:520px;max-height:720px;height:calc(100svh - 7.75rem);overflow:hidden;background:#f5f1eb}
.ora-m-hero-media{position:absolute;inset:0;overflow:hidden;pointer-events:none}
.ora-m-hero-media>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 28%}
.ora-m-hero-wash{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(245,241,235,.7),rgba(245,241,235,.45),rgba(245,241,235,.85))}
.ora-m-hero-copy{position:relative;z-index:10;display:flex;flex:1;flex-direction:column;justify-content:flex-end;padding:2rem 1.25rem 2.5rem;text-align:center;color:#4d5645;box-sizing:border-box}
.ora-m-cta{display:flex;align-items:center;justify-content:center;gap:.6rem;width:100%;max-width:24rem;margin:.75rem auto 0;padding:1rem 1.5rem;border-radius:999px;background:#4d5645!important;color:#f5f1eb!important;font-family:system-ui,sans-serif;font-size:11px;letter-spacing:.16em;text-transform:uppercase;text-decoration:none;box-sizing:border-box}
.ora-m-cta svg{color:#f5f1eb!important;stroke:#f5f1eb}
.ora-d-hero{display:none!important}
.splash-screen{display:none!important}
}
`.replace(/\n/g, "");

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
      { rel: "image_src", href: `${SITE_URL}/google-logo.webp` },
      { rel: "manifest", href: `${SITE_URL}/site.webmanifest` },
      { rel: "sitemap", type: "application/xml", href: `${SITE_URL}/sitemap.xml` },
      {
        rel: "preload",
        as: "image",
        href: homePosterMobile,
        fetchPriority: "high",
        media: "(max-width: 1023px)",
      },
      {
        rel: "preload",
        as: "image",
        href: heroDesktop,
        fetchPriority: "high",
        media: "(min-width: 1024px)",
      },
      { rel: "preload", as: "style", href: appCss },
      // Stylesheets applied in RootShell with viewport-specific media (desktop blocks, mobile async)
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
        <style dangerouslySetInnerHTML={{ __html: CRITICAL_MOBILE_CSS }} />
        {/* Desktop: render-blocking Tailwind (keeps ~95 desktop score) */}
        <link rel="stylesheet" href={appCss} media="(min-width: 1024px)" />
        {/* Mobile: non-blocking — critical CSS + inline hero styles cover first paint */}
        <link id="ora-css-m" rel="stylesheet" href={appCss} media="print" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var l=document.getElementById('ora-css-m');if(!l)return;var go=function(){l.media='all'};if(window.matchMedia('(min-width:1024px)').matches){l.media='all';return;}l.onload=go;if(l.sheet)go();})();`,
          }}
        />
        <noscript>
          <link rel="stylesheet" href={appCss} />
        </noscript>
        {/* Non-blocking fonts */}
        <link id="ora-fonts" rel="stylesheet" href={FONT_CSS} media="print" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var l=document.getElementById('ora-fonts');if(!l)return;l.onload=function(){l.media='all'};if(l.sheet)l.media='all';})();`,
          }}
        />
        <noscript>
          <link rel="stylesheet" href={FONT_CSS} />
        </noscript>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){function loadTags(){if(window.__oraTagsLoaded)return;window.__oraTagsLoaded=1;
['pointerdown','keydown','touchstart'].forEach(function(e){window.removeEventListener(e,loadTags);});
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NVCC7DPD');
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init','2916628175360380');fbq('track','PageView');}
function arm(){['pointerdown','keydown','touchstart'].forEach(function(e){
window.addEventListener(e,loadTags,{once:true,passive:true});});
setTimeout(loadTags,12000);}
if(document.readyState==='complete')arm();else window.addEventListener('load',arm);})();`,
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
  return (
    <>
      <SmoothScroll />
      <Outlet />
    </>
  );
}
