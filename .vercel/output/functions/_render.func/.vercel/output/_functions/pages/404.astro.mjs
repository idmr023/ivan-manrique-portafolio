/* empty css                                 */
import { c as createComponent, a as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_Nkelmj2q.mjs';
import 'kleur/colors';
import { g as getI18N, $ as $$Layout } from '../chunks/index_D1rPc4me.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$404 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  const { currentLocale } = Astro2;
  const i18n = getI18N({ currentLocale });
  const langPrefix = currentLocale === "es" ? "" : `/${currentLocale}`;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": i18n.NOTFOUND_404 }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen flex flex-col items-center justify-center px-4 text-center"> <h1 class="text-8xl font-display font-black text-magneto-600 mb-4">404</h1> <p class="text-gray-400 text-lg mb-10">${i18n.NOTFOUND_404}</p> <a${addAttribute(langPrefix || "/", "href")} class="inline-flex items-center gap-2 bg-gradient-to-r from-magneto-600 to-magneto-500 text-white font-semibold px-6 py-3 rounded-xl no-underline hover:from-magneto-500 hover:to-magneto-400 transition-all"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> ${i18n.NAV_HOME} </a> </div> ` })}`;
}, "C:/Users/idmr_/OneDrive/Escritorio/portafolio/ivan-manrique-portafolio/src/pages/404.astro", void 0);

const $$file = "C:/Users/idmr_/OneDrive/Escritorio/portafolio/ivan-manrique-portafolio/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
