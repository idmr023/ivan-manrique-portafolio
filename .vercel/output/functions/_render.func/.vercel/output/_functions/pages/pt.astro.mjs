/* empty css                                 */
import { c as createComponent, r as renderComponent, b as renderTemplate } from '../chunks/astro/server_Nkelmj2q.mjs';
import 'kleur/colors';
import { $ as $$App } from '../chunks/App_-AHU-KKU.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "App", $$App, {})}`;
}, "C:/Users/idmr_/OneDrive/Escritorio/portafolio/ivan-manrique-portafolio/src/pages/pt/index.astro", void 0);

const $$file = "C:/Users/idmr_/OneDrive/Escritorio/portafolio/ivan-manrique-portafolio/src/pages/pt/index.astro";
const $$url = "/pt";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
