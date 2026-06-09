import { c as createComponent, a as createAstro, m as maybeRenderHead, d as addAttribute, b as renderTemplate, r as renderComponent, u as unescapeHTML } from './astro/server_Nkelmj2q.mjs';
import 'kleur/colors';
import { g as getI18N, $ as $$Layout } from './index_D1rPc4me.mjs';
import 'clsx';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useState, useRef, useEffect, useCallback } from 'react';

const $$Astro$1 = createAstro();
const $$SocialMediaBar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SocialMediaBar;
  const { currentLocale } = Astro2;
  const i18n = getI18N({ currentLocale });
  return renderTemplate`${maybeRenderHead()}<div class="flex justify-center gap-6"> <a href="https://www.linkedin.com/in/ivan-daniel-manrique-roa-978a29187"${addAttribute(i18n.SMB_LINKEDIN, "aria-label")} target="_blank" class="text-gray-400 hover:text-magneto-400 transition-colors duration-300"> <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg> </a> <a href="https://github.com/idmr023"${addAttribute(i18n.SMB_GITHUB, "aria-label")} target="_blank" class="text-gray-400 hover:text-magneto-400 transition-colors duration-300"> <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg> </a> <a href="https://drive.google.com/file/d/1Mq81JtWl-iGLedp_v-1fTYPfWUHaA8o6/view?usp=sharing" target="_blank"${addAttribute(i18n.SMB_CV, "aria-label")} class="text-gray-400 hover:text-magneto-400 transition-colors duration-300"> <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg> </a> </div>`;
}, "C:/Users/idmr_/OneDrive/Escritorio/portafolio/ivan-manrique-portafolio/src/components/Others/SocialMediaBar.astro", void 0);

const RESPONSES = {
  pt: {
    experiencia: [
      "Ivan atuou na Ripnel desenvolvendo um ERP do zero com React, Next.js e Supabase, otimizando processos em 30% com automação e IA Generativa.",
      "Na Teleperformance, foi promovido a Tier 4 Trilíngue, liderou equipes e implementou dashboards em Tableau que reduziram em 40% o tempo de geração de relatórios.",
      "Ele tem experiência prática tanto em desenvolvimento frontend quanto em análise de dados, construindo desde interfaces até dashboards de métricas."
    ],
    habilidades: [
      "Frontend: React, Next.js, TypeScript, Tailwind CSS, Astro, HTML5, CSS3, JavaScript.",
      "Data & IA: Python, SQL, Tableau, Power BI, Pandas, NumPy, Jupyter, IA Generativa.",
      "Soft Skills: Liderança, Inteligência Emocional, Resolução de Problemas, Comunicação Trilíngue (ES/EN/PT), Metodologias Ágeis."
    ],
    formacao: [
      "Ivan cursa Engenharia de Software na UTP, integra o Tercio Superior e participa do programa de talentos diretivos Impulsa UTP.",
      "Possui certificações do Google (Data Analysis), Oracle (Next Education Front-End) e Platzi (Data Analyst)."
    ],
    projetos: [
      "ERP Ripnel: Redução de 30% no tempo operacional e 45% no tempo de resposta ao cliente com chatbot IA multilíngue.",
      "Dashboard Teleperformance: Visualização de KPIs com Tableau e SQL, reduzindo em 40% o tempo de reportes.",
      "Plataforma Jurídica Digital: App web com autenticação, banco de dados e envio de e-mails.",
      "Análise de Dados com Python: Análise exploratória de redes sociais com Pandas, Matplotlib e Seaborn."
    ],
    contato: [
      "Você pode entrar em contato com Ivan pelo LinkedIn (linkedin.com/in/ivan-daniel-manrique-roa-978a29187) ou pelo e-mail. Ele está disponível para oportunidades como Desenvolvedor Frontend, Data Analyst ou posições híbridas."
    ],
    corredor: [
      "Ivan é corredor disciplinado e está se preparando para uma corrida de 35km no deserto de Marcona, com largada às 3AM. Ele aplica a mesma mentalidade de resiliência e melhoria contínua no código."
    ],
    default: [
      "Posso te ajudar com informações sobre experiência profissional, habilidades técnicas, formação acadêmica e projetos do Ivan. Sobre o que você gostaria de saber?",
      "Pergunte sobre a experiência do Ivan na Ripnel ou Teleperformance, suas habilidades em frontend e dados, ou seus projetos!"
    ]
  },
  es: {
    experiencia: [
      "Ivan trabajó en Ripnel desarrollando un ERP desde cero con React, Next.js y Supabase, optimizando procesos en un 30% con automatización e IA Generativa.",
      "En Teleperformance, fue promovido a Tier 4 Trilingüe, lideró equipos e implementó dashboards en Tableau que redujeron en 40% el tiempo de generación de reportes.",
      "Tiene experiencia práctica tanto en desarrollo frontend como en análisis de datos, construyendo desde interfaces hasta dashboards de métricas."
    ],
    habilidades: [
      "Frontend: React, Next.js, TypeScript, Tailwind CSS, Astro, HTML5, CSS3, JavaScript.",
      "Data & IA: Python, SQL, Tableau, Power BI, Pandas, NumPy, Jupyter, IA Generativa.",
      "Soft Skills: Liderazgo, Inteligencia Emocional, Resolución de Problemas, Comunicación Trilingüe (ES/EN/PT), Metodologías Ágiles."
    ],
    formacao: [
      "Ivan cursa Ingeniería de Software en la UTP, integra el Tercio Superior y participa en el programa de talentos directivos Impulsa UTP.",
      "Posee certificaciones de Google (Data Analysis), Oracle (Next Education Front-End) y Platzi (Data Analyst)."
    ],
    projetos: [
      "ERP Ripnel: Reducción del 30% en tiempo operativo y 45% en tiempo de respuesta al cliente con chatbot IA multilingüe.",
      "Dashboard Teleperformance: Visualización de KPIs con Tableau y SQL, reduciendo en 40% el tiempo de reportes.",
      "Plataforma Jurídica Digital: App web con autenticación, base de datos y envío de correos.",
      "Análisis de Datos con Python: Análisis exploratorio de redes sociales con Pandas, Matplotlib y Seaborn."
    ],
    contato: [
      "Puedes contactar a Ivan por LinkedIn (linkedin.com/in/ivan-daniel-manrique-roa-978a29187) o por correo. Está disponible para oportunidades como Desarrollador Frontend, Data Analyst o posiciones híbridas."
    ],
    corredor: [
      "Ivan es runner disciplinado y se prepara para una carrera de 35km en el desierto de Marcona, con largada a las 3AM. Aplica la misma mentalidad de resiliencia y mejora continua en el código."
    ],
    default: [
      "Puedo ayudarte con información sobre experiencia profesional, habilidades técnicas, formación académica y proyectos de Ivan. ¿Qué te gustaría saber?",
      "¡Pregunta sobre la experiencia de Ivan en Ripnel o Teleperformance, sus habilidades en frontend y datos, o sus proyectos!"
    ]
  },
  en: {
    experiencia: [
      "Ivan worked at Ripnel building an ERP from scratch with React, Next.js, and Supabase, optimizing processes by 30% through automation and Generative AI.",
      "At Teleperformance, he was promoted to Trilingual Tier 4, led teams, and implemented Tableau dashboards that reduced report generation time by 40%.",
      "He has hands-on experience in both frontend development and data analysis, building everything from interfaces to metric dashboards."
    ],
    habilidades: [
      "Frontend: React, Next.js, TypeScript, Tailwind CSS, Astro, HTML5, CSS3, JavaScript.",
      "Data & AI: Python, SQL, Tableau, Power BI, Pandas, NumPy, Jupyter, Generative AI.",
      "Soft Skills: Team Leadership, Emotional Intelligence, Problem-Solving, Trilingual Communication (ES/EN/PT), Agile Methodologies."
    ],
    formacao: [
      "Ivan is pursuing Software Engineering at UTP, ranks in the top third of his class, and participates in the Impulsa UTP executive talent program.",
      "He holds certifications from Google (Data Analysis), Oracle (Next Education Front-End), and Platzi (Data Analyst)."
    ],
    projetos: [
      "ERP Ripnel: 30% reduction in operational time and 45% reduction in customer response time with a multilingual AI chatbot.",
      "Teleperformance Dashboard: KPI visualization with Tableau and SQL, reducing reporting time by 40%.",
      "Digital Legal Platform: Web app with authentication, database integration, and email sending.",
      "Data Analysis with Python: Exploratory analysis of social media data using Pandas, Matplotlib, and Seaborn."
    ],
    contato: [
      "You can reach Ivan on LinkedIn (linkedin.com/in/ivan-daniel-manrique-roa-978a29187) or via email. He is open to opportunities as a Frontend Developer, Data Analyst, or hybrid roles."
    ],
    corredor: [
      "Ivan is a disciplined runner training for a 35km desert race in Marcona, starting at 3AM. He applies the same resilience and continuous improvement mindset to his code."
    ],
    default: [
      "I can help you with information about Ivan's professional experience, technical skills, education, and projects. What would you like to know?",
      "Ask about Ivan's experience at Ripnel or Teleperformance, his frontend and data skills, or his projects!"
    ]
  }
};
const INTENTS = {
  experiencia: ["experiência", "experiencia", "experience", "trabalho", "trabajo", "work", "trabalhou", "trabajó", "worked", "carreira", "carrera", "career", "profissional", "profesional", "professional", "ripnel", "teleperformance", "estágio", "estagio", "internship", "tier", "customer service", "empleo", "job", "employment"],
  habilidades: ["habilidade", "habilidad", "skill", "tecnologia", "tecnología", "technology", "tech", "stack", "ferramenta", "herramienta", "tool", "programação", "programacion", "programming", "framework", "linguagem", "lenguaje", "language", "frontend", "backend", "dados", "data", "soft skill", "língua", "idioma", "trilíngue", "trilingue", "trilingual", "qué sabes hacer", "what can you do", "que sabes fazer"],
  formacao: ["formação", "formacion", "education", "educação", "educacion", "universidade", "universidad", "university", "faculdade", "facultad", "college", "curso", "certificação", "certificacion", "certification", "utp", "impulsa", "google", "oracle", "platzi", "alura", "estudo", "estudio", "study", "degree", "bachelor", "ingeniería", "engenharia", "engineering"],
  projetos: ["projeto", "proyecto", "project", "portfolio", "portfólio", "portafolio", "case", "erp", "dashboard", "tableau", "analise", "análisis", "analysis", "python", "abogado", "law", "legal", "jurídico", "juridico", "what did you build", "que construiste", "o que construiu"],
  contato: ["contato", "contacto", "contact", "falar", "hablar", "talk", "email", "linkedin", "contratar", "hire", "oportunidade", "oportunidad", "opportunity", "vaga", "vacante", "job opening", "currículo", "curriculum", "cv", "resume", "entrevista", "interview", "how to reach", "cómo contacto", "como contato"],
  corredor: ["corredor", "runner", "corrida", "running", "maratona", "maratón", "marathon", "deserto", "desierto", "desert", "marcona", "medalha", "medalla", "medal", "inspiração", "inspiración", "inspiration", "resiliência", "resiliencia", "resilience", "disciplina", "discipline", "3am", "deporte", "esporte", "sport", "hobby", "passion"]
};
function getLocale(locale) {
  if (locale === "en") return "en";
  if (locale === "pt") return "pt";
  return "es";
}
function getIntent(input) {
  const lower = input.toLowerCase();
  for (const [key, keywords] of Object.entries(INTENTS)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return key;
    }
  }
  return "default";
}
function getRandomResponse(responses) {
  return responses[Math.floor(Math.random() * responses.length)];
}
function Chatbot({ i18n, locale }) {
  const lang = getLocale(locale);
  const responses = RESPONSES[lang] || RESPONSES.pt;
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: i18n.CHATBOT_WELCOME || "Olá! Como posso ajudar?" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg = { role: "user", text: trimmed };
    const intent = getIntent(trimmed);
    const intentResponses = responses[intent] || responses.default;
    const botMsg = { role: "bot", text: getRandomResponse(intentResponses) };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setOpen(!open),
        className: "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-magneto-500 to-magneto-700 text-white shadow-lg shadow-magneto-900/40 hover:scale-110 transition-all duration-300 flex items-center justify-center",
        "aria-label": i18n.CHATBOT_TITLE || "Abrir chat",
        children: open ? /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
          /* @__PURE__ */ jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
        ] }) : /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }) })
      }
    ),
    open && /* @__PURE__ */ jsxs("div", { className: "fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-8rem)] bg-surface border border-magneto-800/50 rounded-2xl shadow-2xl shadow-black/40 flex flex-col overflow-hidden animate-fade-in", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-r from-magneto-700 to-magneto-900 px-5 py-3.5 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-white font-display font-semibold text-sm", children: i18n.CHATBOT_TITLE || "Chat com Ivan" }),
          /* @__PURE__ */ jsx("p", { className: "text-magneto-300 text-xs", children: i18n.CHATBOT_SUBTITLE || "Assistente virtual" })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-green-400 animate-pulse" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-4 bg-surface", children: [
        messages.map((msg, i) => /* @__PURE__ */ jsx(
          "div",
          {
            className: `flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`,
            children: /* @__PURE__ */ jsx(
              "div",
              {
                className: `max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.role === "user" ? "bg-magneto-600 text-white rounded-br-md" : "bg-surface-lighter text-gray-200 rounded-bl-md border border-magneto-800/30"}`,
                children: msg.text
              }
            )
          },
          i
        )),
        /* @__PURE__ */ jsx("div", { ref: messagesEndRef })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "p-3 border-t border-magneto-800/50 bg-surface", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: input,
            onChange: (e) => setInput(e.target.value),
            onKeyDown: handleKeyDown,
            placeholder: i18n.CHATBOT_PLACEHOLDER || "Digite sua pergunta...",
            className: "flex-1 bg-surface-lighter border border-magneto-800/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-magneto-500 transition-colors"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleSend,
            className: "bg-magneto-600 hover:bg-magneto-500 text-white rounded-xl px-4 py-2.5 transition-colors",
            children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ jsx("line", { x1: "22", y1: "2", x2: "11", y2: "13" }),
              /* @__PURE__ */ jsx("polygon", { points: "22 2 15 22 11 13 2 9 22 2" })
            ] })
          }
        )
      ] }) })
    ] })
  ] });
}

const SEARCH_INDEX = [
  { label: "Início / Hero", section: "hero", href: "#hero", keywords: ["home", "início", "inicio", "topo", "hero"] },
  { label: "Sobre mim", section: "about", href: "#about", keywords: ["sobre", "about", "história", "historia", "runner", "corredor", "disciplina", "ultramaratona", "marcona"] },
  { label: "Experiência Profissional", section: "experience", href: "#experience", keywords: ["experiência", "experiencia", "trabalho", "carreira", "profissional", "ripnel", "teleperformance", "erp"] },
  { label: "Projetos em Destaque", section: "projects", href: "#projects", keywords: ["projetos", "projetos", "projects", "portfolio", "portfólio", "portifolio", "case", "dashboard", "python"] },
  { label: "Habilidades & Tecnologias", section: "skills", href: "#skills", keywords: ["habilidades", "skills", "tecnologia", "tech", "stack", "react", "python", "sql", "tableau", "frontend", "dados"] },
  { label: "Formação & Conquistas", section: "education", href: "#education", keywords: ["formação", "formacao", "educação", "educacao", "utp", "impulsa", "certificação", "certificacao", "universidade"] },
  { label: "Contato", section: "contact", href: "#contact", keywords: ["contato", "contact", "falar", "email", "linkedin", "contratar", "vaga"] }
];
function SearchModal({ i18n, currentLocale }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const modalRef = useRef(null);
  const filter = useCallback((q) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    const lower = q.toLowerCase();
    const matches = SEARCH_INDEX.filter(
      (item) => item.label.toLowerCase().includes(lower) || item.section.toLowerCase().includes(lower) || item.keywords.some((kw) => kw.includes(lower))
    );
    setResults(matches);
    setSelectedIndex(0);
  }, []);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      setQuery("");
      setResults([]);
    }
  }, [open]);
  useEffect(() => {
    filter(query);
  }, [query, filter]);
  const handleSelect = (item) => {
    setOpen(false);
    const base = currentLocale === "es" ? "" : `/${currentLocale}`;
    window.location.href = `${base}/${item.href}`;
  };
  const handleKeyNav = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      handleSelect(results[selectedIndex]);
    }
  };
  if (!open) return null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]",
      onClick: () => setOpen(false),
      children: [
        /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black/70 backdrop-blur-sm" }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            ref: modalRef,
            className: "relative w-full max-w-lg bg-surface border border-magneto-800/50 rounded-2xl shadow-2xl overflow-hidden animate-fade-in",
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-5 py-4 border-b border-magneto-800/30", children: [
                /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-magneto-400", children: [
                  /* @__PURE__ */ jsx("circle", { cx: "11", cy: "11", r: "8" }),
                  /* @__PURE__ */ jsx("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" })
                ] }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    ref: inputRef,
                    type: "text",
                    value: query,
                    onChange: (e) => setQuery(e.target.value),
                    onKeyDown: handleKeyNav,
                    placeholder: i18n.SEARCH_PLACEHOLDER || "Pesquisar...",
                    className: "flex-1 bg-transparent text-white text-sm placeholder-gray-500 focus:outline-none"
                  }
                ),
                /* @__PURE__ */ jsx("kbd", { className: "hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-lighter border border-magneto-800/50 text-xs text-gray-400 font-mono", children: "ESC" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "max-h-72 overflow-y-auto", children: [
                results.length === 0 && query.trim() !== "" && /* @__PURE__ */ jsx("div", { className: "px-5 py-8 text-center text-gray-500 text-sm", children: i18n.SEARCH_EMPTY || "Nenhum resultado encontrado." }),
                results.length === 0 && query.trim() === "" && /* @__PURE__ */ jsxs("div", { className: "px-5 py-8 text-center text-gray-500 text-sm", children: [
                  /* @__PURE__ */ jsx("p", { className: "mb-2", children: i18n.SEARCH_HINT || "Pressione Ctrl+K para buscar" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600", children: "Digite para encontrar seções do portfólio" })
                ] }),
                results.map((item, index) => /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => handleSelect(item),
                    onMouseEnter: () => setSelectedIndex(index),
                    className: `w-full text-left px-5 py-3 flex items-center gap-3 transition-colors ${index === selectedIndex ? "bg-magneto-700/30 text-white" : "text-gray-300 hover:bg-surface-lighter"}`,
                    children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xs text-magneto-400 font-mono uppercase w-20 shrink-0", children: item.section }),
                      /* @__PURE__ */ jsx("span", { className: "text-sm", children: item.label })
                    ]
                  },
                  item.section
                ))
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "px-5 py-2.5 border-t border-magneto-800/30 flex items-center gap-4 text-xs text-gray-600", children: [
                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx("kbd", { className: "px-1.5 py-0.5 rounded bg-surface-lighter border border-magneto-800/50 font-mono", children: "↑↓" }),
                  "Navegar"
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx("kbd", { className: "px-1.5 py-0.5 rounded bg-surface-lighter border border-magneto-800/50 font-mono", children: "↵" }),
                  "Selecionar"
                ] })
              ] })
            ]
          }
        )
      ]
    }
  );
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$App = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$App;
  const { currentLocale } = Astro2;
  const i18n = getI18N({ currentLocale });
  const langPrefix = currentLocale === "es" ? "" : `/${currentLocale}`;
  const experiencia = [
    {
      rol: i18n.EXP_RIPNEL_ROLE,
      periodo: i18n.EXP_RIPNEL_PERIOD,
      logo: "\u{1F3E2}",
      bullets: [i18n.EXP_RIPNEL_1, i18n.EXP_RIPNEL_2, i18n.EXP_RIPNEL_3, i18n.EXP_RIPNEL_4]
    },
    {
      rol: i18n.EXP_TP_ROLE,
      periodo: i18n.EXP_TP_PERIOD,
      logo: "\u{1F3A7}",
      bullets: [i18n.EXP_TP_1, i18n.EXP_TP_2, i18n.EXP_TP_3, i18n.EXP_TP_4]
    }
  ];
  const proyectos = [
    {
      titulo: i18n.PROJ_RIPNEL_TITLE,
      descripcion: i18n.PROJ_RIPNEL_DESC,
      resultado: i18n.PROJ_RIPNEL_RESULT,
      techs: i18n.PROJ_RIPNEL_TECHS,
      demo: i18n.PROJ_RIPNEL_DEMO,
      repo: i18n.PROJ_RIPNEL_REPO,
      icono: "\u2699\uFE0F",
      destacado: true
    },
    {
      titulo: i18n.PROJ_ABOGADO_TITLE,
      descripcion: i18n.PROJ_ABOGADO_DESC,
      resultado: i18n.PROJ_ABOGADO_RESULT,
      techs: i18n.PROJ_ABOGADO_TECHS,
      demo: i18n.PROJ_ABOGADO_DEMO,
      repo: i18n.PROJ_ABOGADO_REPO,
      icono: "\u2696\uFE0F",
      destacado: false
    },
    {
      titulo: i18n.PROJ_TP_TITLE,
      descripcion: i18n.PROJ_TP_DESC,
      resultado: i18n.PROJ_TP_RESULT,
      techs: i18n.PROJ_TP_TECHS,
      demo: i18n.PROJ_TP_DEMO,
      repo: i18n.PROJ_TP_REPO,
      icono: "\u{1F4CA}",
      destacado: false
    },
    {
      titulo: i18n.PROJ_DATA_TITLE,
      descripcion: i18n.PROJ_DATA_DESC,
      resultado: i18n.PROJ_DATA_RESULT,
      techs: i18n.PROJ_DATA_TECHS,
      demo: i18n.PROJ_DATA_DEMO,
      repo: i18n.PROJ_DATA_REPO,
      icono: "\u{1F4C8}",
      destacado: false
    }
  ];
  const certs = [
    { titulo: i18n.CERT_GOOGLE_TITLE, desc: i18n.CERT_GOOGLE_DESC, icono: "\u{1F4CA}" },
    { titulo: i18n.CERT_ORACLE_TITLE, desc: i18n.CERT_ORACLE_DESC, icono: "\u{1F4BB}" },
    { titulo: i18n.CERT_IBM_TITLE, desc: i18n.CERT_IBM_DESC, icono: "\u{1F4C8}" }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": i18n.WEBPAGE_TITLE, "description": i18n.HERO_H2 }, { "default": ($$result2) => renderTemplate(_a || (_a = __template(["  ", '<nav class="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-magneto-800/30"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="flex items-center justify-between h-16"> <a', ' class="flex items-center gap-2 text-white font-display font-bold text-lg no-underline hover:text-magneto-400 transition-colors"> <span class="text-magneto-500">&lt;</span>IM<span class="text-magneto-500">/&gt;</span> </a> <!-- Desktop Nav --> <div class="hidden lg:flex items-center gap-1"> <a href="#hero" class="px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-surface-lighter">', '</a> <a href="#about" class="px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-surface-lighter">', '</a> <a href="#experience" class="px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-surface-lighter">', '</a> <a href="#skills" class="px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-surface-lighter">', '</a> <a href="#education" class="px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-surface-lighter">', `</a> </div> <div class="hidden lg:flex items-center gap-3"> <button onclick="document.dispatchEvent(new KeyboardEvent('keydown', {ctrlKey:true, key:'k'}))" class="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-500 bg-surface-lighter border border-magneto-800/40 rounded-lg hover:border-magneto-600 transition-colors"> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg> <span class="hidden xl:inline">Buscar</span> <kbd class="px-1.5 py-0.5 rounded bg-surface border border-magneto-800/50 text-[10px] font-mono">Ctrl K</kbd> </button> <div class="flex items-center gap-1 bg-surface-lighter rounded-lg p-1 border border-magneto-800/30"> <a href="/"`, ">", '</a> <a href="/en"', ">", '</a> <a href="/pt"', ">", '</a> </div> <a href="https://drive.google.com/file/d/1Mq81JtWl-iGLedp_v-1fTYPfWUHaA8o6/view?usp=sharing" target="_blank" class="ml-2 bg-magneto-600 hover:bg-magneto-500 text-white text-sm font-medium px-4 py-2 rounded-xl transition-all no-underline flex items-center gap-2"> <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>\nCV\n</a> </div> <!-- Mobile menu button --> <button id="mobile-menu-btn" class="lg:hidden text-gray-400 hover:text-white p-2"> <svg id="menu-icon-open" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg> <svg id="menu-icon-close" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="hidden"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> </button> </div> <!-- Mobile Nav --> <div id="mobile-menu" class="hidden lg:hidden pb-4 border-t border-magneto-800/20 mt-1 pt-3 space-y-1"> <a href="#hero" class="block px-3 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-surface-lighter rounded-lg no-underline">', '</a> <a href="#about" class="block px-3 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-surface-lighter rounded-lg no-underline">', '</a> <a href="#experience" class="block px-3 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-surface-lighter rounded-lg no-underline">', '</a> <a href="#skills" class="block px-3 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-surface-lighter rounded-lg no-underline">', '</a> <a href="#education" class="block px-3 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-surface-lighter rounded-lg no-underline">', '</a> <a href="#contact" class="block px-3 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-surface-lighter rounded-lg no-underline">', '</a> <div class="flex gap-2 px-3 pt-2"> <a href="/"', ">", '</a> <a href="/en"', ">", '</a> <a href="/pt"', ">", '</a> </div> <div class="px-3 pt-2"> <a href="https://drive.google.com/file/d/1Mq81JtWl-iGLedp_v-1fTYPfWUHaA8o6/view?usp=sharing" target="_blank" class="block w-full text-center bg-magneto-600 hover:bg-magneto-500 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all no-underline">\n\u{1F4C4} ', ` </a> </div> </div> </div> </nav> <script>
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const iconOpen = document.getElementById('menu-icon-open');
    const iconClose = document.getElementById('menu-icon-close');
    btn?.addEventListener('click', () => {
      menu?.classList.toggle('hidden');
      iconOpen?.classList.toggle('hidden');
      iconClose?.classList.toggle('hidden');
    });
  <\/script>  <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"> <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-magneto-900/50 via-surface to-surface"></div> <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-magneto-700/20 rounded-full blur-[120px]"></div> <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-magneto-600/50 to-transparent"></div> <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center"> <div class="flex justify-center mb-8"> <img src="/profile.webp"`, ' class="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl border-2 border-magneto-600/40 shadow-2xl shadow-magneto-900/30 object-cover" width="192" height="192"> </div> <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-magneto-700/20 border border-magneto-600/30 text-magneto-300 text-sm mb-6 animate-fade-in"> <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> ', ' </div> <h1 class="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white leading-tight mb-4 animate-fade-in delay-100"> ', ' </h1> <p class="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-6 animate-fade-in delay-200"> ', ' </p> <div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in delay-300"> <a href="#projects" class="inline-flex items-center gap-2 bg-gradient-to-r from-magneto-600 to-magneto-500 hover:from-magneto-500 hover:to-magneto-400 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-magneto-700/30 hover:shadow-magneto-600/40 no-underline text-base"> ', ' <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg> </a> <a href="https://drive.google.com/file/d/1Mq81JtWl-iGLedp_v-1fTYPfWUHaA8o6/view?usp=sharing" target="_blank" class="inline-flex items-center gap-2 border border-magneto-700/60 text-white font-medium px-8 py-3.5 rounded-xl hover:bg-magneto-900/40 transition-all no-underline text-base"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> ', ' </a> </div> <div class="mt-8 flex justify-center"> ', ' </div> </div> </section>  <section id="about" class="py-8 sm:py-10 px-4 sm:px-6"> <div class="max-w-4xl mx-auto"> <div class="text-center mb-8"> <span class="text-magneto-400 text-sm font-mono uppercase tracking-widest">// ', '</span> <h2 class="text-3xl sm:text-4xl font-display font-bold text-white mt-3">', '</h2> </div> <div class="grid lg:grid-cols-5 gap-10 items-start"> <div class="lg:col-span-3 space-y-5 text-gray-300 leading-relaxed text-base sm:text-lg"> <p class="animate-on-scroll">', '</p> <p class="animate-on-scroll delay-200">', '</p> <p class="animate-on-scroll delay-300">', '</p> </div> <div class="lg:col-span-2 animate-on-scroll delay-300"> <div class="bg-surface-light border border-magneto-800/30 rounded-2xl p-6 space-y-5"> <h3 class="text-white font-display font-semibold text-lg flex items-center gap-2"> <span class="text-2xl">\u{1F3C3}</span> ', ' </h3> <p class="text-gray-400 italic text-sm leading-relaxed border-l-2 border-magneto-600 pl-4"> ', ' </p> <p class="text-gray-500 text-sm"> ', ' </p> <div class="grid grid-cols-3 gap-3 pt-3"> <div class="text-center"> <div class="text-2xl font-display font-bold text-magneto-400">', '</div> <div class="text-xs text-gray-500 mt-1">', '</div> </div> <div class="text-center"> <div class="text-2xl font-display font-bold text-magneto-400">', '</div> <div class="text-xs text-gray-500 mt-1">', '</div> </div> <div class="text-center"> <div class="text-2xl font-display font-bold text-magneto-400">', '</div> <div class="text-xs text-gray-500 mt-1">', '</div> </div> </div> </div> </div> </div> </div> </section>  <section id="experience" class="py-16 sm:py-20 px-4 sm:px-6 bg-surface-light/50"> <div class="max-w-4xl mx-auto"> <div class="text-center mb-5"> <span class="text-magneto-400 text-sm font-mono uppercase tracking-widest">// ', '</span> <h2 class="text-3xl sm:text-4xl font-display font-bold text-white mt-3">', '</h2> <p class="text-gray-500 text-sm mt-2">', '</p> </div> <div class="space-y-6 mt-8"> ', ' </div> </div> </section>  <section id="projects" class="py-8 sm:py-10 px-4 sm:px-6"> <div class="max-w-5xl mx-auto"> <div class="text-center mb-8"> <span class="text-magneto-400 text-sm font-mono uppercase tracking-widest">// ', '</span> <h2 class="text-3xl sm:text-4xl font-display font-bold text-white mt-3">', '</h2> <p class="text-gray-500 text-sm mt-2">', '</p> </div> <div class="space-y-6"> ', ' </div> </div> </section>  <section id="skills" class="py-16 sm:py-20 px-4 sm:px-6 bg-surface-light/50"> <div class="max-w-5xl mx-auto"> <div class="text-center mb-8"> <span class="text-magneto-400 text-sm font-mono uppercase tracking-widest">// ', '</span> <h2 class="text-3xl sm:text-4xl font-display font-bold text-white mt-3">', '</h2> <p class="text-gray-500 text-sm mt-2">', '</p> </div> <div class="grid sm:grid-cols-2 gap-6"> <div class="bg-surface border border-magneto-800/30 rounded-2xl p-6 hover:border-magneto-700/40 transition-all animate-on-scroll"> <div class="flex items-center gap-3 mb-4"> <span class="text-2xl">\u{1F3A8}</span> <h3 class="text-lg font-display font-semibold text-white">', '</h3> </div> <div class="flex flex-wrap gap-2"> ', ' </div> </div> <div class="bg-surface border border-magneto-800/30 rounded-2xl p-6 hover:border-magneto-700/40 transition-all animate-on-scroll delay-100"> <div class="flex items-center gap-3 mb-4"> <span class="text-2xl">\u{1F4CA}</span> <h3 class="text-lg font-display font-semibold text-white">', '</h3> </div> <div class="flex flex-wrap gap-2"> ', ' </div> </div> <div class="bg-surface border border-magneto-800/30 rounded-2xl p-6 hover:border-magneto-700/40 transition-all animate-on-scroll delay-200"> <div class="flex items-center gap-3 mb-4"> <span class="text-2xl">\u{1F9E0}</span> <h3 class="text-lg font-display font-semibold text-white">', '</h3> </div> <div class="flex flex-wrap gap-2"> ', ' </div> </div> <div class="bg-surface border border-magneto-800/30 rounded-2xl p-6 hover:border-magneto-700/40 transition-all animate-on-scroll delay-300"> <div class="flex items-center gap-3 mb-4"> <span class="text-2xl">\u{1F6E0}\uFE0F</span> <h3 class="text-lg font-display font-semibold text-white">', '</h3> </div> <div class="flex flex-wrap gap-2"> ', ' </div> </div> </div> </div> </section>  <section id="education" class="py-8 sm:py-10 px-4 sm:px-6"> <div class="max-w-4xl mx-auto"> <div class="text-center mb-8"> <span class="text-magneto-400 text-sm font-mono uppercase tracking-widest">// ', '</span> <h2 class="text-3xl sm:text-4xl font-display font-bold text-white mt-3">', '</h2> </div> <div class="space-y-4 mb-10"> <div class="bg-surface-light border border-magneto-800/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-5 animate-on-scroll"> <div class="w-14 h-14 rounded-xl bg-magneto-700/20 flex items-center justify-center text-2xl shrink-0">\n\u{1F393}\n</div> <div class="flex-1"> <div class="flex flex-col sm:flex-row sm:items-center gap-2 mb-2"> <h3 class="text-xl font-display font-semibold text-white">', '</h3> <span class="px-2.5 py-0.5 text-xs rounded-full bg-green-500/20 text-green-400 border border-green-500/30 w-fit">', '</span> </div> <p class="text-gray-400 text-sm leading-relaxed">', '</p> </div> </div> <div class="bg-surface-light border border-magneto-800/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-5 animate-on-scroll delay-200"> <div class="w-14 h-14 rounded-xl bg-magneto-700/20 flex items-center justify-center text-2xl shrink-0">\n\u{1F680}\n</div> <div class="flex-1"> <div class="flex flex-col sm:flex-row sm:items-center gap-2 mb-2"> <h3 class="text-xl font-display font-semibold text-white">', '</h3> <span class="px-2.5 py-0.5 text-xs rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 w-fit">', '</span> </div> <p class="text-gray-400 text-sm leading-relaxed">', '</p> </div> </div> </div> <div class="mb-10"> <h3 class="text-2xl font-display font-bold text-white text-center mb-8">', '</h3> <div class="grid sm:grid-cols-3 gap-5"> ', ' </div> </div> </div> </section>  <section id="contact" class="py-8 sm:py-10 px-4 sm:px-6"> <div class="max-w-3xl mx-auto text-center"> <div class="bg-gradient-to-br from-magneto-900/50 to-magneto-950/80 border border-magneto-700/30 rounded-3xl p-8 sm:p-12 animate-on-scroll"> <h2 class="text-3xl sm:text-4xl font-display font-bold text-white mb-4">', '</h2> <p class="text-gray-400 text-base leading-relaxed mb-8 max-w-xl mx-auto"> ', ' </p> <div class="flex flex-col sm:flex-row items-center justify-center gap-4"> <a href="mailto:ivanmanrique@email.com" class="inline-flex items-center gap-2 bg-gradient-to-r from-magneto-600 to-magneto-500 hover:from-magneto-500 hover:to-magneto-400 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-magneto-700/30 no-underline text-base w-full sm:w-auto justify-center"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> ', ' </a> <a href="https://drive.google.com/file/d/1Mq81JtWl-iGLedp_v-1fTYPfWUHaA8o6/view?usp=sharing" target="_blank" class="inline-flex items-center gap-2 border border-magneto-700/60 text-white font-medium px-8 py-3.5 rounded-xl hover:bg-magneto-900/40 transition-all no-underline text-base w-full sm:w-auto justify-center"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> ', ' </a> </div> </div> </div> </section>  <footer class="border-t border-magneto-800/30 py-10 px-4 sm:px-6"> <div class="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6"> <div class="text-center sm:text-left"> <a', ' class="text-white font-display font-bold text-lg no-underline"> <span class="text-magneto-500">&lt;</span>IM<span class="text-magneto-500">/&gt;</span> </a> <p class="text-gray-600 text-xs mt-1">', " &copy; ", '</p> </div> <div class="flex items-center gap-6"> <a href="https://www.linkedin.com/in/ivan-daniel-manrique-roa-978a29187" target="_blank" class="text-gray-500 hover:text-magneto-400 transition-colors"', '> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg> </a> <a href="https://github.com/idmr023" target="_blank" class="text-gray-500 hover:text-magneto-400 transition-colors"', '> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg> </a> <a href="mailto:ivanmanrique@email.com" class="text-gray-500 hover:text-magneto-400 transition-colors" aria-label="Email"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> </a> </div> </div> </footer>  ', " ", " "])), maybeRenderHead(), addAttribute(langPrefix, "href"), i18n.NAV_HOME, i18n.NAV_ABOUT, i18n.NAV_EXPERIENCE, i18n.NAV_SKILLS, i18n.NAV_EDUCATION, addAttribute(`px-2.5 py-1 text-xs rounded-md transition-colors no-underline ${currentLocale === "es" ? "bg-magneto-700 text-white" : "text-gray-400 hover:text-white"}`, "class"), i18n.LANG_ES, addAttribute(`px-2.5 py-1 text-xs rounded-md transition-colors no-underline ${currentLocale === "en" ? "bg-magneto-700 text-white" : "text-gray-400 hover:text-white"}`, "class"), i18n.LANG_EN, addAttribute(`px-2.5 py-1 text-xs rounded-md transition-colors no-underline ${currentLocale === "pt" ? "bg-magneto-700 text-white" : "text-gray-400 hover:text-white"}`, "class"), i18n.LANG_PT, i18n.NAV_HOME, i18n.NAV_ABOUT, i18n.NAV_EXPERIENCE, i18n.NAV_SKILLS, i18n.NAV_EDUCATION, i18n.NAV_CONTACT, addAttribute(`px-3 py-1.5 text-xs rounded-md no-underline ${currentLocale === "es" ? "bg-magneto-700 text-white" : "text-gray-400 bg-surface-lighter"}`, "class"), i18n.LANG_ES, addAttribute(`px-3 py-1.5 text-xs rounded-md no-underline ${currentLocale === "en" ? "bg-magneto-700 text-white" : "text-gray-400 bg-surface-lighter"}`, "class"), i18n.LANG_EN, addAttribute(`px-3 py-1.5 text-xs rounded-md no-underline ${currentLocale === "pt" ? "bg-magneto-700 text-white" : "text-gray-400 bg-surface-lighter"}`, "class"), i18n.LANG_PT, i18n.NAV_CV, addAttribute(i18n.HERO_IMG_ALT, "alt"), i18n.HERO_BADGE, i18n.HERO_H1, i18n.HERO_H2, i18n.HERO_CTA_PRIMARY, i18n.HERO_CTA_SECONDARY, renderComponent($$result2, "SocialMediaBar", $$SocialMediaBar, {}), i18n.ABOUT_TITLE, i18n.ABOUT_TITLE, i18n.ABOUT_P1, unescapeHTML(i18n.ABOUT_P2), unescapeHTML(i18n.ABOUT_P3), i18n.RUNNING_TITLE, i18n.RUNNING_QUOTE, i18n.RUNNING_DESC, i18n.RUNNING_STATS_1, i18n.RUNNING_LABEL_1, i18n.RUNNING_STATS_2, i18n.RUNNING_LABEL_2, i18n.RUNNING_STATS_3, i18n.RUNNING_LABEL_3, i18n.EXPERIENCE_TITLE, i18n.EXPERIENCE_TITLE, i18n.EXPERIENCE_SUBTITLE, experiencia.map((exp) => renderTemplate`<div class="bg-surface border border-magneto-800/30 rounded-2xl p-6 sm:p-8 hover:border-magneto-700/40 transition-all animate-on-scroll"> <div class="flex items-start gap-4 mb-5"> <span class="text-3xl">${exp.logo}</span> <div class="flex-1"> <h3 class="text-xl font-display font-semibold text-white">${exp.rol}</h3> <p class="text-magneto-400 text-sm">${exp.periodo}</p> </div> </div> <ul class="space-y-3"> ${exp.bullets.map((bullet) => renderTemplate`<li class="flex items-start gap-3 text-gray-300 text-sm leading-relaxed"> <span class="text-magneto-500 mt-1 shrink-0"> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> </span> ${bullet} </li>`)} </ul> </div>`), i18n.PROJECTS_TITLE, i18n.PROJECTS_TITLE, i18n.PROJECTS_SUBTITLE, proyectos.map((proj) => renderTemplate`<div${addAttribute(`bg-surface-light border rounded-2xl overflow-hidden transition-all hover:border-magneto-700/40 animate-on-scroll ${proj.destacado ? "border-magneto-600/40 ring-1 ring-magneto-700/20" : "border-magneto-800/20"}`, "class")}> ${proj.destacado && renderTemplate`<div class="bg-gradient-to-r from-magneto-700 to-magneto-900 px-5 py-1.5 text-xs text-magneto-200 font-medium flex items-center gap-2"> <span>⭐</span> Projeto em destaque
</div>`} <div class="p-6 sm:p-8"> <div class="flex items-start gap-4 mb-4"> <span class="text-3xl">${proj.icono}</span> <div class="flex-1"> <h3 class="text-xl font-display font-semibold text-white mb-2">${proj.titulo}</h3> <p class="text-gray-400 text-sm leading-relaxed mb-3">${proj.descripcion}</p> <div class="bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 mb-4"> <p class="text-green-400 text-sm font-medium flex items-center gap-2"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> ${proj.resultado} </p> </div> <div class="flex flex-wrap gap-2 mb-5"> ${proj.techs.split(" | ").map((tech) => renderTemplate`<span class="px-2.5 py-1 text-xs rounded-lg bg-magneto-900/40 text-magneto-300 border border-magneto-800/40 font-mono">${tech}</span>`)} </div> <div class="flex gap-4"> ${proj.demo !== "#" && renderTemplate`<a${addAttribute(proj.demo, "href")} target="_blank" class="text-sm text-magneto-400 hover:text-magneto-300 font-medium no-underline flex items-center gap-1.5 transition-colors">
Live Demo <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg> </a>`} ${proj.repo !== "#" && renderTemplate`<a${addAttribute(proj.repo, "href")} target="_blank" class="text-sm text-gray-500 hover:text-gray-300 font-medium no-underline flex items-center gap-1.5 transition-colors"> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
Repositório
</a>`} </div> </div> </div> </div> </div>`), i18n.SKILLS_TITLE, i18n.SKILLS_TITLE, i18n.SKILLS_SUBTITLE, i18n.SKILLS_FRONTEND_TITLE, i18n.SKILLS_FRONTEND_ITEMS.split(" | ").map((skill) => renderTemplate`<span class="px-3 py-1.5 text-sm rounded-lg bg-magneto-900/30 text-gray-300 border border-magneto-800/30">${skill}</span>`), i18n.SKILLS_DATA_TITLE, i18n.SKILLS_DATA_ITEMS.split(" | ").map((skill) => renderTemplate`<span class="px-3 py-1.5 text-sm rounded-lg bg-magneto-900/30 text-gray-300 border border-magneto-800/30">${skill}</span>`), i18n.SKILLS_SOFT_TITLE, i18n.SKILLS_SOFT_ITEMS.split(" | ").map((skill) => renderTemplate`<span class="px-3 py-1.5 text-sm rounded-lg bg-magneto-900/30 text-gray-300 border border-magneto-800/30">${skill}</span>`), i18n.SKILLS_TOOLS_TITLE, i18n.SKILLS_TOOLS_ITEMS.split(" | ").map((skill) => renderTemplate`<span class="px-3 py-1.5 text-sm rounded-lg bg-magneto-900/30 text-gray-300 border border-magneto-800/30">${skill}</span>`), i18n.EDUCATION_TITLE, i18n.EDUCATION_TITLE, i18n.EDUCATION_UTP_TITLE, i18n.EDUCATION_UTP_STATUS, i18n.EDUCATION_UTP_DESC, i18n.EDUCATION_IMPULSA_TITLE, i18n.EDUCATION_IMPULSA_STATUS, i18n.EDUCATION_IMPULSA_DESC, i18n.CERTIFICATIONS_TITLE, certs.map((cert) => renderTemplate`<div class="bg-surface-light border border-magneto-800/30 rounded-2xl p-5 hover:border-magneto-700/40 transition-all animate-on-scroll"> <span class="text-2xl mb-3 block">${cert.icono}</span> <h4 class="text-sm font-semibold text-white mb-2">${cert.titulo}</h4> <p class="text-xs text-gray-500 leading-relaxed">${cert.desc}</p> </div>`), i18n.CONTACT_TITLE, i18n.CONTACT_SUBTITLE, i18n.CONTACT_CTA_PRIMARY, i18n.CONTACT_CTA_SECONDARY, addAttribute(langPrefix, "href"), i18n.FOOTER_TEXT, (/* @__PURE__ */ new Date()).getFullYear(), addAttribute(i18n.SMB_LINKEDIN, "aria-label"), addAttribute(i18n.SMB_GITHUB, "aria-label"), renderComponent($$result2, "Chatbot", Chatbot, { "i18n": i18n, "locale": currentLocale || "es", "client:load": true, "client:component-hydration": "load", "client:component-path": "@components/Chat/Chatbot", "client:component-export": "default" }), renderComponent($$result2, "SearchModal", SearchModal, { "i18n": i18n, "currentLocale": currentLocale || "es", "client:load": true, "client:component-hydration": "load", "client:component-path": "@components/Search/SearchModal", "client:component-export": "default" })) })}`;
}, "C:/Users/idmr_/OneDrive/Escritorio/portafolio/ivan-manrique-portafolio/src/components/App.astro", void 0);

export { $$App as $ };
