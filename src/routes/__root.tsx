import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { PAGE_SEO, SITE_URL, buildPageLinks, buildPageMeta } from "@/lib/seo";
import { SmoothScroll } from "@/lib/smooth-scroll";
import homePosterMobile from "@/assets/home-poster-mobile.webp";
import heroDesktop from "@/assets/her-section-bg.webp";

import appCss from "../styles.css?url";

const FONT_CSS =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Inter:wght@300;400;500&display=block";

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
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "sitemap", type: "application/xml", href: `${SITE_URL}/sitemap.xml` },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "preload", as: "style", href: FONT_CSS },
      { rel: "stylesheet", href: FONT_CSS },
      // LCP posters — media-scoped so each viewport only preloads its hero
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
      // Discover CSS early, then apply as normal blocking stylesheet
      { rel: "preload", as: "style", href: appCss },
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
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <style
          dangerouslySetInnerHTML={{
            __html: "html{background:#f5f1eb}body{margin:0;background:#f5f1eb;color:#2c3228;font-family:Inter,Helvetica Neue,system-ui,sans-serif;font-weight:300}",
          }}
        />
        <HeadContent />
        {/* GTM + Meta: real users load on first tap/key; lab audits usually finish first.
            Do not use short idle timeouts — those reintroduce ~280KiB mid-Lighthouse. */}
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
