import 'cookie';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_x7blKMPV.mjs';
import 'es-module-lexer';
import { e as decodeKey } from './chunks/astro/server_Nkelmj2q.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/idmr_/OneDrive/Escritorio/portafolio/ivan-manrique-portafolio/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.GkPHJAKB.css"},{"type":"inline","content":"*,*:before,*:after{box-sizing:border-box}html{scroll-behavior:smooth;background:#0a1a30}body{margin:0;padding:0;min-height:100vh}::-moz-selection{background-color:#2e75d366;color:#fff}::selection{background-color:#2e75d366;color:#fff}::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:#0b1424}::-webkit-scrollbar-thumb{background:#174a94;border-radius:3px}::-webkit-scrollbar-thumb:hover{background:#1e5fba}@keyframes fade-in-up{0%{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}@keyframes fade-in{0%{opacity:0}to{opacity:1}}.animate-on-scroll{opacity:0;animation:fade-in-up .7s ease-out forwards}.delay-100{animation-delay:.1s}.delay-200{animation-delay:.2s}.delay-300{animation-delay:.3s}.delay-400{animation-delay:.4s}.delay-500{animation-delay:.5s}\n"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.GkPHJAKB.css"},{"type":"inline","content":"*,*:before,*:after{box-sizing:border-box}html{scroll-behavior:smooth;background:#0a1a30}body{margin:0;padding:0;min-height:100vh}::-moz-selection{background-color:#2e75d366;color:#fff}::selection{background-color:#2e75d366;color:#fff}::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:#0b1424}::-webkit-scrollbar-thumb{background:#174a94;border-radius:3px}::-webkit-scrollbar-thumb:hover{background:#1e5fba}@keyframes fade-in-up{0%{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}@keyframes fade-in{0%{opacity:0}to{opacity:1}}.animate-on-scroll{opacity:0;animation:fade-in-up .7s ease-out forwards}.delay-100{animation-delay:.1s}.delay-200{animation-delay:.2s}.delay-300{animation-delay:.3s}.delay-400{animation-delay:.4s}.delay-500{animation-delay:.5s}\n"}],"routeData":{"route":"/en","isIndex":true,"type":"page","pattern":"^\\/en\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/index.astro","pathname":"/en","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.GkPHJAKB.css"},{"type":"inline","content":"*,*:before,*:after{box-sizing:border-box}html{scroll-behavior:smooth;background:#0a1a30}body{margin:0;padding:0;min-height:100vh}::-moz-selection{background-color:#2e75d366;color:#fff}::selection{background-color:#2e75d366;color:#fff}::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:#0b1424}::-webkit-scrollbar-thumb{background:#174a94;border-radius:3px}::-webkit-scrollbar-thumb:hover{background:#1e5fba}@keyframes fade-in-up{0%{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}@keyframes fade-in{0%{opacity:0}to{opacity:1}}.animate-on-scroll{opacity:0;animation:fade-in-up .7s ease-out forwards}.delay-100{animation-delay:.1s}.delay-200{animation-delay:.2s}.delay-300{animation-delay:.3s}.delay-400{animation-delay:.4s}.delay-500{animation-delay:.5s}\n"}],"routeData":{"route":"/pt","isIndex":true,"type":"page","pattern":"^\\/pt\\/?$","segments":[[{"content":"pt","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/pt/index.astro","pathname":"/pt","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.GkPHJAKB.css"},{"type":"inline","content":"*,*:before,*:after{box-sizing:border-box}html{scroll-behavior:smooth;background:#0a1a30}body{margin:0;padding:0;min-height:100vh}::-moz-selection{background-color:#2e75d366;color:#fff}::selection{background-color:#2e75d366;color:#fff}::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:#0b1424}::-webkit-scrollbar-thumb{background:#174a94;border-radius:3px}::-webkit-scrollbar-thumb:hover{background:#1e5fba}@keyframes fade-in-up{0%{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}@keyframes fade-in{0%{opacity:0}to{opacity:1}}.animate-on-scroll{opacity:0;animation:fade-in-up .7s ease-out forwards}.delay-100{animation-delay:.1s}.delay-200{animation-delay:.2s}.delay-300{animation-delay:.3s}.delay-400{animation-delay:.4s}.delay-500{animation-delay:.5s}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/idmr_/OneDrive/Escritorio/portafolio/ivan-manrique-portafolio/src/pages/en/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/idmr_/OneDrive/Escritorio/portafolio/ivan-manrique-portafolio/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/idmr_/OneDrive/Escritorio/portafolio/ivan-manrique-portafolio/src/pages/pt/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/idmr_/OneDrive/Escritorio/portafolio/ivan-manrique-portafolio/src/pages/404.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/en/index@_@astro":"pages/en.astro.mjs","\u0000@astro-page:src/pages/pt/index@_@astro":"pages/pt.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-manifest":"manifest_BzK_na4-.mjs","@components/Chat/Chatbot":"_astro/Chatbot.BY-rdhSs.js","@components/Search/SearchModal":"_astro/SearchModal.BRoIG3yt.js","@astrojs/react/client.js":"_astro/client.CYqr5LZe.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/index.GkPHJAKB.css","/antares.png","/asteroids.jpg","/data_analysis.png","/favicon.svg","/profile.webp","/proyabogado.png","/videogame_unity.jpeg","/_astro/Chatbot.BY-rdhSs.js","/_astro/client.CYqr5LZe.js","/_astro/index.CVf8TyFT.js","/_astro/jsx-runtime.TBa3i5EZ.js","/_astro/SearchModal.BRoIG3yt.js"],"i18n":{"fallbackType":"redirect","strategy":"pathname-prefix-other-locales","locales":["es","en","pt"],"defaultLocale":"es","domainLookupTable":{}},"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"XCdmWVyTISfIVhqtUYpdS47QNH+RYaJSCtPgzS44URk=","experimentalEnvGetSecretEnabled":false});

export { manifest };
