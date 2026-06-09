import { c as createComponent, a as createAstro, d as addAttribute, f as renderHead, g as renderSlot, b as renderTemplate } from './astro/server_Nkelmj2q.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                         */

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description } = Astro2.props;
  const metaDescription = description || "Portafolio profesional de Ivan Manrique \u2014 Desarrollador Frontend & Data Analyst especializado en React, Next.js, Python y Data Analysis. Conecta conmigo.";
  return renderTemplate`<html lang="pt"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description"${addAttribute(metaDescription, "content")}><meta name="keywords" content="Frontend Developer, Data Analyst, React, Next.js, Python, SQL, Tableau, Portfolio, Desarrollador, Analista de Datos"><meta name="author" content="Ivan Daniel Manrique Roa"><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(metaDescription, "content")}><meta property="og:type" content="website"><meta property="og:image" content="/profile.webp"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(title, "content")}><meta name="twitter:description"${addAttribute(metaDescription, "content")}><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Montserrat:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body class="bg-surface text-white font-sans antialiased"> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/Users/idmr_/OneDrive/Escritorio/portafolio/ivan-manrique-portafolio/src/layouts/Layout.astro", void 0);

const WEBPAGE_TITLE$2 = "Portafolio, Ivan Manrique | Dev Frontend & Data Analyst";
const NAV_HOME$2 = "Inicio";
const NAV_ABOUT$2 = "Sobre mí";
const NAV_EXPERIENCE$2 = "Experiencia";
const NAV_SKILLS$2 = "Habilidades";
const NAV_EDUCATION$2 = "Formación";
const NAV_CONTACT$2 = "Contacto";
const NAV_CV$2 = "Descargar CV";
const LANG_ES$2 = "ES";
const LANG_EN$2 = "EN";
const LANG_PT$2 = "PT";
const HERO_H1$2 = "Código, datos y kilómetros: construyo soluciones que rinden.";
const HERO_H2$2 = "Desarrollador Frontend & Data Analyst. Transformo datos en decisiones e ideas en interfaces de alto impacto, con la misma disciplina de quien corre largas distancias en el desierto.";
const HERO_CTA_PRIMARY$2 = "Ver Proyectos";
const HERO_CTA_SECONDARY$2 = "Descargar CV";
const HERO_IMG_ALT$2 = "Foto de perfil de Ivan Manrique";
const HERO_BADGE$2 = "Disponible para oportunidades";
const ABOUT_TITLE$2 = "Sobre mí";
const ABOUT_P1$2 = "Soy Ivan Daniel Manrique Roa, Desarrollador Frontend y Data Analyst. Construyo puentes entre el mundo de los datos y la experiencia del usuario, transformando requisitos complejos en productos digitales que generan resultados medibles.";
const ABOUT_P2$2 = "Actualmente curso Ingeniería de Software en la UTP, donde fui seleccionado para el programa de talentos directivos <strong>Impulsa UTP</strong> e integro el Tercio Superior. Mi trayectoria une dos mundos: la precisión analítica de los datos y el arte de desarrollar interfaces que enamoran.";
const ABOUT_P3$2 = "Fuera de las pantallas, soy runner disciplinado. Me preparo para una carrera de 35km en el desierto de Marcona, con largada a las 3 de la mañana, y estoy en camino a obtener la <strong>\"Medalla de la Inspiración\"</strong>. Cada kilómetro recorrido refuerza las mismas competencias que aplico en el código: resiliencia, foco bajo presión, gestión del tiempo y mejora continua. Un sprint a la vez, un commit a la vez.";
const ABOUT_CTA$2 = "Conoce mi historia completa";
const EXPERIENCE_TITLE$2 = "Experiencia Profesional";
const EXPERIENCE_SUBTITLE$2 = "Resultados comprobados con método STAR";
const EXP_RIPNEL_ROLE$2 = "Desarrollador Frontend, Ripnel";
const EXP_RIPNEL_PERIOD$2 = "Prácticas Profesionales | 2026";
const EXP_RIPNEL_1$2 = "Desarrollé desde cero un ERP corporativo completo utilizando React, Next.js y Supabase, entregando una plataforma funcional que centraliza las operaciones internas de la empresa.";
const EXP_RIPNEL_2$2 = "Implementé pipelines de automatización con IA Generativa para validación y procesamiento de datos, reduciendo en un 30% el tiempo de registro y eliminando errores manuales recurrentes.";
const EXP_RIPNEL_3$2 = "Diseñé e integré un chatbot inteligente con soporte multilingüe, disminuyendo el tiempo de respuesta al cliente en un 45% y mejorando los índices de satisfacción del soporte interno.";
const EXP_RIPNEL_4$2 = "Colaboré directamente con stakeholders para traducir requisitos de negocio en funcionalidades técnicas, aplicando metodologías ágiles con entregas iterativas.";
const EXP_TP_ROLE$2 = "Customer Service Agent, Teleperformance";
const EXP_TP_PERIOD$2 = "2024 – Presente";
const EXP_TP_1$2 = "Fui promovido a Tier 4 Trilingüe (Español, Inglés, Portugués), liderando equipos de soporte y actuando como punto de escalación para casos de alta complejidad.";
const EXP_TP_2$2 = "Implementé dashboards interactivos con Tableau para el análisis de métricas operacionales, optimizando la visualización de KPIs y reduciendo el tiempo de reporte semanal en un 40%.";
const EXP_TP_3$2 = "Lideré sesiones de entrenamiento y mentoría para más de 20 agentes, elevando los índices de resolución en el primer contacto (FCR) en un 25% mediante documentación y estandarización de procesos.";
const EXP_TP_4$2 = "Gestioné datos de clientes con foco en calidad e integridad, aplicando técnicas de Data Cleaning y análisis exploratorio para identificar patrones de recurrencia y proponer soluciones preventivas.";
const PROJECTS_TITLE$2 = "Proyectos Destacados";
const PROJECTS_SUBTITLE$2 = "Casos reales con impacto medible";
const PROJ_RIPNEL_TITLE$2 = "ERP Corporativo, Ripnel";
const PROJ_RIPNEL_DESC$2 = "ERP completo desarrollado desde cero con React, Next.js y Supabase. Incluye gestión de inventario, autenticación, chatbot multilingüe con IA y dashboards de métricas.";
const PROJ_RIPNEL_RESULT$2 = "Reducción del 30% en tiempo operativo y 45% en tiempo de respuesta al cliente.";
const PROJ_RIPNEL_TECHS$2 = "React | Next.js | Supabase | Tailwind CSS | TypeScript | IA Generativa";
const PROJ_RIPNEL_DEMO$2 = "#";
const PROJ_RIPNEL_REPO$2 = "#";
const PROJ_TP_TITLE$2 = "Dashboard de Métricas, Teleperformance";
const PROJ_TP_DESC$2 = "Sistema de dashboards interactivos en Tableau conectados a bases SQL Server. Visualización de KPIs de atención, FCR, CSAT y tiempos medios de resolución.";
const PROJ_TP_RESULT$2 = "Reducción del 40% en tiempo de generación de reportes y aumento del 18% en toma de decisiones orientada por datos.";
const PROJ_TP_TECHS$2 = "Tableau | SQL | Excel | ETL | Métricas de CX";
const PROJ_TP_DEMO$2 = "#";
const PROJ_TP_REPO$2 = "#";
const PROJ_DATA_TITLE$2 = "Análisis de Datos con Python";
const PROJ_DATA_DESC$2 = "Proyecto de análisis exploratorio y limpieza de datos de redes sociales utilizando Python, Pandas y visualización con Matplotlib y Seaborn.";
const PROJ_DATA_RESULT$2 = "Identificación del año con menor engagement y recomendación estratégica basada en datos.";
const PROJ_DATA_TECHS$2 = "Python | Pandas | NumPy | Matplotlib | Seaborn | Jupyter";
const PROJ_DATA_DEMO$2 = "https://www.kaggle.com/code/ivanedasdsada/social-media-exploratory-analisis";
const PROJ_DATA_REPO$2 = "https://www.kaggle.com/code/ivanedasdsada/social-media-exploratory-analisis";
const PROJ_ABOGADO_TITLE$2 = "Plataforma Jurídica Digital";
const PROJ_ABOGADO_DESC$2 = "Plataforma web con rutas protegidas, autenticación de usuarios, listado de servicios desde base de datos y envío de correos de contacto. Desarrollada con React y base de datos relacional.";
const PROJ_ABOGADO_RESULT$2 = "Sistema funcional con autenticación completa e integración de base de datos para gestión de servicios jurídicos.";
const PROJ_ABOGADO_TECHS$2 = "React | MySQL | Node.js | HTML5 | CSS3 | JavaScript";
const PROJ_ABOGADO_DEMO$2 = "https://proyecto-abogado.vercel.app/";
const PROJ_ABOGADO_REPO$2 = "https://github.com/idmr023/ProyectoAbogado";
const SKILLS_TITLE$2 = "Habilidades & Tecnologías";
const SKILLS_SUBTITLE$2 = "Stack técnico y competencias interpersonales";
const SKILLS_FRONTEND_TITLE$2 = "Frontend Development";
const SKILLS_FRONTEND_ITEMS$2 = "React | Next.js | TypeScript | Astro | Tailwind CSS | HTML5 | CSS3 | JavaScript (ES6+) | Bootstrap";
const SKILLS_DATA_TITLE$2 = "Data & IA";
const SKILLS_DATA_ITEMS$2 = "Python | SQL | Tableau | Power BI | Pandas | NumPy | Jupyter | ETL | Data Cleaning | IA Generativa";
const SKILLS_SOFT_TITLE$2 = "Soft Skills & Liderazgo";
const SKILLS_SOFT_ITEMS$2 = "Liderazgo de Equipos | Inteligencia Emocional | Resolución de Problemas | Comunicación Trilingüe | Gestión del Tiempo | Metodologías Ágiles | Mentoría | Adaptabilidad";
const SKILLS_TOOLS_TITLE$2 = "Herramientas & Infra";
const SKILLS_TOOLS_ITEMS$2 = "Git | GitHub | Supabase | Vercel | Figma | Trello | Excel Avanzado | VS Code | Docker";
const EDUCATION_TITLE$2 = "Formación & Logros";
const EDUCATION_UTP_TITLE$2 = "Ingeniería de Software, UTP";
const EDUCATION_UTP_DESC$2 = "Tercio Superior. Seleccionado para el programa de talentos directivos Impulsa UTP.";
const EDUCATION_UTP_STATUS$2 = "En curso";
const EDUCATION_IMPULSA_TITLE$2 = "Programa Impulsa UTP";
const EDUCATION_IMPULSA_DESC$2 = "Programa de talentos directivos con foco en liderazgo, innovación y visión estratégica de negocios.";
const EDUCATION_IMPULSA_STATUS$2 = "En curso";
const CERTIFICATIONS_TITLE$2 = "Certificaciones";
const CERT_GOOGLE_TITLE$2 = "Análisis de Datos, Google";
const CERT_GOOGLE_DESC$2 = "Hojas de Cálculo | Tableau | R | Data Cleaning | Visualización de Datos | Storytelling con Datos";
const CERT_ORACLE_TITLE$2 = "Oracle Next Education Front-End, Alura Latam, 2023";
const CERT_ORACLE_DESC$2 = "HTML5 | CSS3 | JavaScript | ReactJS | PHP | MySQL | Git & GitHub | Figma | Agilidad Empresarial";
const CERT_IBM_TITLE$2 = "Data Analyst, Platzi, 2025";
const CERT_IBM_DESC$2 = "Python | NumPy | Pandas | Matplotlib | Seaborn | Jupyter Notebook | Limpieza de Datos";
const RUNNING_TITLE$2 = "Mentalidad Runner";
const RUNNING_QUOTE$2 = "\"Cada kilómetro es una iteración. Cada carrera es un deploy. Lo imposible es solo cuestión de cadencia.\"";
const RUNNING_DESC$2 = "Preparación para carrera de 35km en el desierto de Marcona. Largada a las 3AM. En busca de la Medalla de la Inspiración.";
const RUNNING_STATS_1$2 = "35km";
const RUNNING_LABEL_1$2 = "Distancia en desierto";
const RUNNING_STATS_2$2 = "Marcona";
const RUNNING_LABEL_2$2 = "Desierto recorrido";
const RUNNING_STATS_3$2 = "3AM";
const RUNNING_LABEL_3$2 = "Largada nocturna";
const CONTACT_TITLE$2 = "¿Construimos algo juntos?";
const CONTACT_SUBTITLE$2 = "Si buscas un profesional que combina excelencia técnica con una mentalidad de alto rendimiento, estás en el lugar correcto. Estoy abierto a oportunidades como Desarrollador Frontend, Data Analyst o posiciones híbridas donde tecnología y datos se encuentran.";
const CONTACT_CTA_PRIMARY$2 = "Hablemos";
const CONTACT_CTA_SECONDARY$2 = "Descargar CV";
const CONTACT_EMAIL$2 = "ivanmanrique@email.com";
const FOOTER_TEXT$2 = "Desarrollado con disciplina por Ivan Manrique";
const FOOTER_RIGHTS$2 = "Todos los derechos reservados.";
const SMB_LINKEDIN$2 = "Conecta conmigo en LinkedIn";
const SMB_GITHUB$2 = "Ve mis proyectos en GitHub";
const SMB_CV$2 = "Descargar Currículum";
const CHATBOT_TITLE$2 = "Chat con Ivan";
const CHATBOT_SUBTITLE$2 = "Resuelve tus dudas sobre mi experiencia, habilidades y proyectos.";
const CHATBOT_PLACEHOLDER$2 = "Pregunta sobre mi experiencia, skills o proyectos...";
const CHATBOT_WELCOME$2 = "Hola! Soy el asistente virtual de Ivan. Puedo ayudarte con información sobre experiencia profesional, habilidades técnicas, formación académica o proyectos. ¿Qué te gustaría saber?";
const SEARCH_PLACEHOLDER$2 = "Buscar en el portafolio...";
const SEARCH_EMPTY$2 = "Sin resultados encontrados.";
const SEARCH_HINT$2 = "Presiona Ctrl+K para buscar";
const NOTFOUND_404$2 = "404, Página no encontrada";
const spanish = {
	WEBPAGE_TITLE: WEBPAGE_TITLE$2,
	NAV_HOME: NAV_HOME$2,
	NAV_ABOUT: NAV_ABOUT$2,
	NAV_EXPERIENCE: NAV_EXPERIENCE$2,
	NAV_SKILLS: NAV_SKILLS$2,
	NAV_EDUCATION: NAV_EDUCATION$2,
	NAV_CONTACT: NAV_CONTACT$2,
	NAV_CV: NAV_CV$2,
	LANG_ES: LANG_ES$2,
	LANG_EN: LANG_EN$2,
	LANG_PT: LANG_PT$2,
	HERO_H1: HERO_H1$2,
	HERO_H2: HERO_H2$2,
	HERO_CTA_PRIMARY: HERO_CTA_PRIMARY$2,
	HERO_CTA_SECONDARY: HERO_CTA_SECONDARY$2,
	HERO_IMG_ALT: HERO_IMG_ALT$2,
	HERO_BADGE: HERO_BADGE$2,
	ABOUT_TITLE: ABOUT_TITLE$2,
	ABOUT_P1: ABOUT_P1$2,
	ABOUT_P2: ABOUT_P2$2,
	ABOUT_P3: ABOUT_P3$2,
	ABOUT_CTA: ABOUT_CTA$2,
	EXPERIENCE_TITLE: EXPERIENCE_TITLE$2,
	EXPERIENCE_SUBTITLE: EXPERIENCE_SUBTITLE$2,
	EXP_RIPNEL_ROLE: EXP_RIPNEL_ROLE$2,
	EXP_RIPNEL_PERIOD: EXP_RIPNEL_PERIOD$2,
	EXP_RIPNEL_1: EXP_RIPNEL_1$2,
	EXP_RIPNEL_2: EXP_RIPNEL_2$2,
	EXP_RIPNEL_3: EXP_RIPNEL_3$2,
	EXP_RIPNEL_4: EXP_RIPNEL_4$2,
	EXP_TP_ROLE: EXP_TP_ROLE$2,
	EXP_TP_PERIOD: EXP_TP_PERIOD$2,
	EXP_TP_1: EXP_TP_1$2,
	EXP_TP_2: EXP_TP_2$2,
	EXP_TP_3: EXP_TP_3$2,
	EXP_TP_4: EXP_TP_4$2,
	PROJECTS_TITLE: PROJECTS_TITLE$2,
	PROJECTS_SUBTITLE: PROJECTS_SUBTITLE$2,
	PROJ_RIPNEL_TITLE: PROJ_RIPNEL_TITLE$2,
	PROJ_RIPNEL_DESC: PROJ_RIPNEL_DESC$2,
	PROJ_RIPNEL_RESULT: PROJ_RIPNEL_RESULT$2,
	PROJ_RIPNEL_TECHS: PROJ_RIPNEL_TECHS$2,
	PROJ_RIPNEL_DEMO: PROJ_RIPNEL_DEMO$2,
	PROJ_RIPNEL_REPO: PROJ_RIPNEL_REPO$2,
	PROJ_TP_TITLE: PROJ_TP_TITLE$2,
	PROJ_TP_DESC: PROJ_TP_DESC$2,
	PROJ_TP_RESULT: PROJ_TP_RESULT$2,
	PROJ_TP_TECHS: PROJ_TP_TECHS$2,
	PROJ_TP_DEMO: PROJ_TP_DEMO$2,
	PROJ_TP_REPO: PROJ_TP_REPO$2,
	PROJ_DATA_TITLE: PROJ_DATA_TITLE$2,
	PROJ_DATA_DESC: PROJ_DATA_DESC$2,
	PROJ_DATA_RESULT: PROJ_DATA_RESULT$2,
	PROJ_DATA_TECHS: PROJ_DATA_TECHS$2,
	PROJ_DATA_DEMO: PROJ_DATA_DEMO$2,
	PROJ_DATA_REPO: PROJ_DATA_REPO$2,
	PROJ_ABOGADO_TITLE: PROJ_ABOGADO_TITLE$2,
	PROJ_ABOGADO_DESC: PROJ_ABOGADO_DESC$2,
	PROJ_ABOGADO_RESULT: PROJ_ABOGADO_RESULT$2,
	PROJ_ABOGADO_TECHS: PROJ_ABOGADO_TECHS$2,
	PROJ_ABOGADO_DEMO: PROJ_ABOGADO_DEMO$2,
	PROJ_ABOGADO_REPO: PROJ_ABOGADO_REPO$2,
	SKILLS_TITLE: SKILLS_TITLE$2,
	SKILLS_SUBTITLE: SKILLS_SUBTITLE$2,
	SKILLS_FRONTEND_TITLE: SKILLS_FRONTEND_TITLE$2,
	SKILLS_FRONTEND_ITEMS: SKILLS_FRONTEND_ITEMS$2,
	SKILLS_DATA_TITLE: SKILLS_DATA_TITLE$2,
	SKILLS_DATA_ITEMS: SKILLS_DATA_ITEMS$2,
	SKILLS_SOFT_TITLE: SKILLS_SOFT_TITLE$2,
	SKILLS_SOFT_ITEMS: SKILLS_SOFT_ITEMS$2,
	SKILLS_TOOLS_TITLE: SKILLS_TOOLS_TITLE$2,
	SKILLS_TOOLS_ITEMS: SKILLS_TOOLS_ITEMS$2,
	EDUCATION_TITLE: EDUCATION_TITLE$2,
	EDUCATION_UTP_TITLE: EDUCATION_UTP_TITLE$2,
	EDUCATION_UTP_DESC: EDUCATION_UTP_DESC$2,
	EDUCATION_UTP_STATUS: EDUCATION_UTP_STATUS$2,
	EDUCATION_IMPULSA_TITLE: EDUCATION_IMPULSA_TITLE$2,
	EDUCATION_IMPULSA_DESC: EDUCATION_IMPULSA_DESC$2,
	EDUCATION_IMPULSA_STATUS: EDUCATION_IMPULSA_STATUS$2,
	CERTIFICATIONS_TITLE: CERTIFICATIONS_TITLE$2,
	CERT_GOOGLE_TITLE: CERT_GOOGLE_TITLE$2,
	CERT_GOOGLE_DESC: CERT_GOOGLE_DESC$2,
	CERT_ORACLE_TITLE: CERT_ORACLE_TITLE$2,
	CERT_ORACLE_DESC: CERT_ORACLE_DESC$2,
	CERT_IBM_TITLE: CERT_IBM_TITLE$2,
	CERT_IBM_DESC: CERT_IBM_DESC$2,
	RUNNING_TITLE: RUNNING_TITLE$2,
	RUNNING_QUOTE: RUNNING_QUOTE$2,
	RUNNING_DESC: RUNNING_DESC$2,
	RUNNING_STATS_1: RUNNING_STATS_1$2,
	RUNNING_LABEL_1: RUNNING_LABEL_1$2,
	RUNNING_STATS_2: RUNNING_STATS_2$2,
	RUNNING_LABEL_2: RUNNING_LABEL_2$2,
	RUNNING_STATS_3: RUNNING_STATS_3$2,
	RUNNING_LABEL_3: RUNNING_LABEL_3$2,
	CONTACT_TITLE: CONTACT_TITLE$2,
	CONTACT_SUBTITLE: CONTACT_SUBTITLE$2,
	CONTACT_CTA_PRIMARY: CONTACT_CTA_PRIMARY$2,
	CONTACT_CTA_SECONDARY: CONTACT_CTA_SECONDARY$2,
	CONTACT_EMAIL: CONTACT_EMAIL$2,
	FOOTER_TEXT: FOOTER_TEXT$2,
	FOOTER_RIGHTS: FOOTER_RIGHTS$2,
	SMB_LINKEDIN: SMB_LINKEDIN$2,
	SMB_GITHUB: SMB_GITHUB$2,
	SMB_CV: SMB_CV$2,
	CHATBOT_TITLE: CHATBOT_TITLE$2,
	CHATBOT_SUBTITLE: CHATBOT_SUBTITLE$2,
	CHATBOT_PLACEHOLDER: CHATBOT_PLACEHOLDER$2,
	CHATBOT_WELCOME: CHATBOT_WELCOME$2,
	SEARCH_PLACEHOLDER: SEARCH_PLACEHOLDER$2,
	SEARCH_EMPTY: SEARCH_EMPTY$2,
	SEARCH_HINT: SEARCH_HINT$2,
	NOTFOUND_404: NOTFOUND_404$2
};

const WEBPAGE_TITLE$1 = "Portfolio, Ivan Manrique | Frontend Dev & Data Analyst";
const NAV_HOME$1 = "Home";
const NAV_ABOUT$1 = "About";
const NAV_EXPERIENCE$1 = "Experience";
const NAV_SKILLS$1 = "Skills";
const NAV_EDUCATION$1 = "Education";
const NAV_CONTACT$1 = "Contact";
const NAV_CV$1 = "Download CV";
const LANG_ES$1 = "ES";
const LANG_EN$1 = "EN";
const LANG_PT$1 = "PT";
const HERO_H1$1 = "Code, data and miles: I build solutions that perform.";
const HERO_H2$1 = "Frontend Developer & Data Analyst. I turn data into decisions and ideas into high-impact interfaces, with the same discipline as someone who runs long distances across the desert.";
const HERO_CTA_PRIMARY$1 = "View Projects";
const HERO_CTA_SECONDARY$1 = "Download CV";
const HERO_IMG_ALT$1 = "Profile picture of Ivan Manrique";
const HERO_BADGE$1 = "Open to opportunities";
const ABOUT_TITLE$1 = "About Me";
const ABOUT_P1$1 = "I'm Ivan Daniel Manrique Roa, Frontend Developer and Data Analyst. I build bridges between the data world and user experience, turning complex requirements into digital products that deliver measurable results.";
const ABOUT_P2$1 = "I'm currently pursuing a Software Engineering degree at UTP, where I was selected for the executive talent program <strong>Impulsa UTP</strong> and rank in the top third of my class. My journey blends two worlds: the analytical precision of data and the art of crafting interfaces that delight.";
const ABOUT_P3$1 = "Away from the screen, I'm a disciplined runner. I'm training for a 35km desert race in Marcona, starting at 3AM, and am on track to earn the <strong>\"Medal of Inspiration\"</strong>. Every kilometer reinforces the same skills I apply in code: resilience, focus under pressure, time management, and continuous improvement. One sprint at a time, one commit at a time.";
const ABOUT_CTA$1 = "Learn my full story";
const EXPERIENCE_TITLE$1 = "Professional Experience";
const EXPERIENCE_SUBTITLE$1 = "Proven results with the STAR method";
const EXP_RIPNEL_ROLE$1 = "Frontend Developer, Ripnel";
const EXP_RIPNEL_PERIOD$1 = "Internship | 2026";
const EXP_RIPNEL_1$1 = "Built a full corporate ERP from scratch using React, Next.js, and Supabase, delivering a functional platform that centralizes the company's internal operations.";
const EXP_RIPNEL_2$1 = "Implemented automation pipelines with Generative AI for data validation and processing, reducing registration time by 30% and eliminating recurring manual errors.";
const EXP_RIPNEL_3$1 = "Designed and integrated an intelligent multilingual chatbot, decreasing customer response time by 45% and improving internal support satisfaction scores.";
const EXP_RIPNEL_4$1 = "Collaborated directly with stakeholders to translate business requirements into technical features, applying agile methodologies with iterative deliveries.";
const EXP_TP_ROLE$1 = "Customer Service Agent, Teleperformance";
const EXP_TP_PERIOD$1 = "2024 – Present";
const EXP_TP_1$1 = "Promoted to Trilingual Tier 4 (Spanish, English, Portuguese), leading support teams and serving as the escalation point for high-complexity cases.";
const EXP_TP_2$1 = "Deployed interactive dashboards with Tableau for operational metric analysis, optimizing KPI visualization and reducing weekly reporting time by 40%.";
const EXP_TP_3$1 = "Led training and mentoring sessions for over 20 agents, increasing First Contact Resolution (FCR) rates by 25% through documentation and process standardization.";
const EXP_TP_4$1 = "Managed customer data with a focus on quality and integrity, applying Data Cleaning techniques and exploratory analysis to identify recurrence patterns and propose preventive solutions.";
const PROJECTS_TITLE$1 = "Featured Projects";
const PROJECTS_SUBTITLE$1 = "Real cases with measurable impact";
const PROJ_RIPNEL_TITLE$1 = "Corporate ERP, Ripnel";
const PROJ_RIPNEL_DESC$1 = "Complete ERP built from scratch with React, Next.js, and Supabase. Includes inventory management, authentication, multilingual AI chatbot, and metric dashboards.";
const PROJ_RIPNEL_RESULT$1 = "30% reduction in operational time and 45% reduction in customer response time.";
const PROJ_RIPNEL_TECHS$1 = "React | Next.js | Supabase | Tailwind CSS | TypeScript | Generative AI";
const PROJ_RIPNEL_DEMO$1 = "#";
const PROJ_RIPNEL_REPO$1 = "#";
const PROJ_TP_TITLE$1 = "Metrics Dashboard, Teleperformance";
const PROJ_TP_DESC$1 = "Interactive dashboard system in Tableau connected to SQL Server databases. Visualization of service KPIs: FCR, CSAT, and average resolution times.";
const PROJ_TP_RESULT$1 = "40% reduction in report generation time and 18% increase in data-driven decision making.";
const PROJ_TP_TECHS$1 = "Tableau | SQL | Excel | ETL | CX Metrics";
const PROJ_TP_DEMO$1 = "#";
const PROJ_TP_REPO$1 = "#";
const PROJ_DATA_TITLE$1 = "Data Analysis with Python";
const PROJ_DATA_DESC$1 = "Exploratory data analysis and cleaning project on social media data using Python, Pandas, and visualization with Matplotlib and Seaborn.";
const PROJ_DATA_RESULT$1 = "Identified the year with the lowest engagement and delivered a data-driven strategic recommendation.";
const PROJ_DATA_TECHS$1 = "Python | Pandas | NumPy | Matplotlib | Seaborn | Jupyter";
const PROJ_DATA_DEMO$1 = "https://www.kaggle.com/code/ivanedasdsada/social-media-exploratory-analisis";
const PROJ_DATA_REPO$1 = "https://www.kaggle.com/code/ivanedasdsada/social-media-exploratory-analisis";
const PROJ_ABOGADO_TITLE$1 = "Digital Legal Platform";
const PROJ_ABOGADO_DESC$1 = "Web platform with protected routes, user authentication, service listings from database, and contact email sending. Built with React and a relational database.";
const PROJ_ABOGADO_RESULT$1 = "Functional system with complete authentication and database integration for legal services management.";
const PROJ_ABOGADO_TECHS$1 = "React | MySQL | Node.js | HTML5 | CSS3 | JavaScript";
const PROJ_ABOGADO_DEMO$1 = "https://proyecto-abogado.vercel.app/";
const PROJ_ABOGADO_REPO$1 = "https://github.com/idmr023/ProyectoAbogado";
const SKILLS_TITLE$1 = "Skills & Technologies";
const SKILLS_SUBTITLE$1 = "Technical stack and soft skills";
const SKILLS_FRONTEND_TITLE$1 = "Frontend Development";
const SKILLS_FRONTEND_ITEMS$1 = "React | Next.js | TypeScript | Astro | Tailwind CSS | HTML5 | CSS3 | JavaScript (ES6+) | Bootstrap";
const SKILLS_DATA_TITLE$1 = "Data & AI";
const SKILLS_DATA_ITEMS$1 = "Python | SQL | Tableau | Power BI | Pandas | NumPy | Jupyter | ETL | Data Cleaning | Generative AI";
const SKILLS_SOFT_TITLE$1 = "Soft Skills & Leadership";
const SKILLS_SOFT_ITEMS$1 = "Team Leadership | Emotional Intelligence | Problem-Solving | Trilingual Communication | Time Management | Agile Methodologies | Mentoring | Adaptability";
const SKILLS_TOOLS_TITLE$1 = "Tools & Infra";
const SKILLS_TOOLS_ITEMS$1 = "Git | GitHub | Supabase | Vercel | Figma | Trello | Advanced Excel | VS Code | Docker";
const EDUCATION_TITLE$1 = "Education & Achievements";
const EDUCATION_UTP_TITLE$1 = "Software Engineering, UTP";
const EDUCATION_UTP_DESC$1 = "Top third of class. Selected for the Impulsa UTP executive talent program.";
const EDUCATION_UTP_STATUS$1 = "Ongoing";
const EDUCATION_IMPULSA_TITLE$1 = "Impulsa UTP Program";
const EDUCATION_IMPULSA_DESC$1 = "Executive talent program focused on leadership, innovation, and strategic business vision.";
const EDUCATION_IMPULSA_STATUS$1 = "Ongoing";
const CERTIFICATIONS_TITLE$1 = "Certifications";
const CERT_GOOGLE_TITLE$1 = "Data Analysis, Google";
const CERT_GOOGLE_DESC$1 = "Spreadsheets | Tableau | R | Data Cleaning | Data Visualization | Data Storytelling";
const CERT_ORACLE_TITLE$1 = "Oracle Next Education Front-End, Alura Latam, 2023";
const CERT_ORACLE_DESC$1 = "HTML5 | CSS3 | JavaScript | ReactJS | PHP | MySQL | Git & GitHub | Figma | Business Agility";
const CERT_IBM_TITLE$1 = "Data Analyst, Platzi, 2025";
const CERT_IBM_DESC$1 = "Python | NumPy | Pandas | Matplotlib | Seaborn | Jupyter Notebook | Data Cleaning";
const RUNNING_TITLE$1 = "Runner Mindset";
const RUNNING_QUOTE$1 = "\"Every kilometer is an iteration. Every race is a deploy. Impossible is just a matter of cadence.\"";
const RUNNING_DESC$1 = "Training for a 35km desert race in Marcona. Starting at 3AM. Pursuing the Medal of Inspiration.";
const RUNNING_STATS_1$1 = "35km";
const RUNNING_LABEL_1$1 = "Desert distance";
const RUNNING_STATS_2$1 = "Marcona";
const RUNNING_LABEL_2$1 = "Desert crossed";
const RUNNING_STATS_3$1 = "3AM";
const RUNNING_LABEL_3$1 = "Night start";
const CONTACT_TITLE$1 = "Let's build something together?";
const CONTACT_SUBTITLE$1 = "If you're looking for a professional who combines technical excellence with a high-performance mindset, you're in the right place. I'm open to opportunities as a Frontend Developer, Data Analyst, or hybrid roles where tech and data meet.";
const CONTACT_CTA_PRIMARY$1 = "Let's Talk";
const CONTACT_CTA_SECONDARY$1 = "Download CV";
const CONTACT_EMAIL$1 = "ivanmanrique@email.com";
const FOOTER_TEXT$1 = "Built with discipline by Ivan Manrique";
const FOOTER_RIGHTS$1 = "All rights reserved.";
const SMB_LINKEDIN$1 = "Connect with me on LinkedIn";
const SMB_GITHUB$1 = "Check my projects on GitHub";
const SMB_CV$1 = "Download Resume";
const CHATBOT_TITLE$1 = "Chat with Ivan";
const CHATBOT_SUBTITLE$1 = "Ask me about my experience, skills, and projects.";
const CHATBOT_PLACEHOLDER$1 = "Ask about my experience, skills or projects...";
const CHATBOT_WELCOME$1 = "Hey! I'm Ivan's virtual assistant. I can help you with info about professional experience, technical skills, education, or projects. What would you like to know?";
const SEARCH_PLACEHOLDER$1 = "Search portfolio...";
const SEARCH_EMPTY$1 = "No results found.";
const SEARCH_HINT$1 = "Press Ctrl+K to search";
const NOTFOUND_404$1 = "404, Page Not Found";
const english = {
	WEBPAGE_TITLE: WEBPAGE_TITLE$1,
	NAV_HOME: NAV_HOME$1,
	NAV_ABOUT: NAV_ABOUT$1,
	NAV_EXPERIENCE: NAV_EXPERIENCE$1,
	NAV_SKILLS: NAV_SKILLS$1,
	NAV_EDUCATION: NAV_EDUCATION$1,
	NAV_CONTACT: NAV_CONTACT$1,
	NAV_CV: NAV_CV$1,
	LANG_ES: LANG_ES$1,
	LANG_EN: LANG_EN$1,
	LANG_PT: LANG_PT$1,
	HERO_H1: HERO_H1$1,
	HERO_H2: HERO_H2$1,
	HERO_CTA_PRIMARY: HERO_CTA_PRIMARY$1,
	HERO_CTA_SECONDARY: HERO_CTA_SECONDARY$1,
	HERO_IMG_ALT: HERO_IMG_ALT$1,
	HERO_BADGE: HERO_BADGE$1,
	ABOUT_TITLE: ABOUT_TITLE$1,
	ABOUT_P1: ABOUT_P1$1,
	ABOUT_P2: ABOUT_P2$1,
	ABOUT_P3: ABOUT_P3$1,
	ABOUT_CTA: ABOUT_CTA$1,
	EXPERIENCE_TITLE: EXPERIENCE_TITLE$1,
	EXPERIENCE_SUBTITLE: EXPERIENCE_SUBTITLE$1,
	EXP_RIPNEL_ROLE: EXP_RIPNEL_ROLE$1,
	EXP_RIPNEL_PERIOD: EXP_RIPNEL_PERIOD$1,
	EXP_RIPNEL_1: EXP_RIPNEL_1$1,
	EXP_RIPNEL_2: EXP_RIPNEL_2$1,
	EXP_RIPNEL_3: EXP_RIPNEL_3$1,
	EXP_RIPNEL_4: EXP_RIPNEL_4$1,
	EXP_TP_ROLE: EXP_TP_ROLE$1,
	EXP_TP_PERIOD: EXP_TP_PERIOD$1,
	EXP_TP_1: EXP_TP_1$1,
	EXP_TP_2: EXP_TP_2$1,
	EXP_TP_3: EXP_TP_3$1,
	EXP_TP_4: EXP_TP_4$1,
	PROJECTS_TITLE: PROJECTS_TITLE$1,
	PROJECTS_SUBTITLE: PROJECTS_SUBTITLE$1,
	PROJ_RIPNEL_TITLE: PROJ_RIPNEL_TITLE$1,
	PROJ_RIPNEL_DESC: PROJ_RIPNEL_DESC$1,
	PROJ_RIPNEL_RESULT: PROJ_RIPNEL_RESULT$1,
	PROJ_RIPNEL_TECHS: PROJ_RIPNEL_TECHS$1,
	PROJ_RIPNEL_DEMO: PROJ_RIPNEL_DEMO$1,
	PROJ_RIPNEL_REPO: PROJ_RIPNEL_REPO$1,
	PROJ_TP_TITLE: PROJ_TP_TITLE$1,
	PROJ_TP_DESC: PROJ_TP_DESC$1,
	PROJ_TP_RESULT: PROJ_TP_RESULT$1,
	PROJ_TP_TECHS: PROJ_TP_TECHS$1,
	PROJ_TP_DEMO: PROJ_TP_DEMO$1,
	PROJ_TP_REPO: PROJ_TP_REPO$1,
	PROJ_DATA_TITLE: PROJ_DATA_TITLE$1,
	PROJ_DATA_DESC: PROJ_DATA_DESC$1,
	PROJ_DATA_RESULT: PROJ_DATA_RESULT$1,
	PROJ_DATA_TECHS: PROJ_DATA_TECHS$1,
	PROJ_DATA_DEMO: PROJ_DATA_DEMO$1,
	PROJ_DATA_REPO: PROJ_DATA_REPO$1,
	PROJ_ABOGADO_TITLE: PROJ_ABOGADO_TITLE$1,
	PROJ_ABOGADO_DESC: PROJ_ABOGADO_DESC$1,
	PROJ_ABOGADO_RESULT: PROJ_ABOGADO_RESULT$1,
	PROJ_ABOGADO_TECHS: PROJ_ABOGADO_TECHS$1,
	PROJ_ABOGADO_DEMO: PROJ_ABOGADO_DEMO$1,
	PROJ_ABOGADO_REPO: PROJ_ABOGADO_REPO$1,
	SKILLS_TITLE: SKILLS_TITLE$1,
	SKILLS_SUBTITLE: SKILLS_SUBTITLE$1,
	SKILLS_FRONTEND_TITLE: SKILLS_FRONTEND_TITLE$1,
	SKILLS_FRONTEND_ITEMS: SKILLS_FRONTEND_ITEMS$1,
	SKILLS_DATA_TITLE: SKILLS_DATA_TITLE$1,
	SKILLS_DATA_ITEMS: SKILLS_DATA_ITEMS$1,
	SKILLS_SOFT_TITLE: SKILLS_SOFT_TITLE$1,
	SKILLS_SOFT_ITEMS: SKILLS_SOFT_ITEMS$1,
	SKILLS_TOOLS_TITLE: SKILLS_TOOLS_TITLE$1,
	SKILLS_TOOLS_ITEMS: SKILLS_TOOLS_ITEMS$1,
	EDUCATION_TITLE: EDUCATION_TITLE$1,
	EDUCATION_UTP_TITLE: EDUCATION_UTP_TITLE$1,
	EDUCATION_UTP_DESC: EDUCATION_UTP_DESC$1,
	EDUCATION_UTP_STATUS: EDUCATION_UTP_STATUS$1,
	EDUCATION_IMPULSA_TITLE: EDUCATION_IMPULSA_TITLE$1,
	EDUCATION_IMPULSA_DESC: EDUCATION_IMPULSA_DESC$1,
	EDUCATION_IMPULSA_STATUS: EDUCATION_IMPULSA_STATUS$1,
	CERTIFICATIONS_TITLE: CERTIFICATIONS_TITLE$1,
	CERT_GOOGLE_TITLE: CERT_GOOGLE_TITLE$1,
	CERT_GOOGLE_DESC: CERT_GOOGLE_DESC$1,
	CERT_ORACLE_TITLE: CERT_ORACLE_TITLE$1,
	CERT_ORACLE_DESC: CERT_ORACLE_DESC$1,
	CERT_IBM_TITLE: CERT_IBM_TITLE$1,
	CERT_IBM_DESC: CERT_IBM_DESC$1,
	RUNNING_TITLE: RUNNING_TITLE$1,
	RUNNING_QUOTE: RUNNING_QUOTE$1,
	RUNNING_DESC: RUNNING_DESC$1,
	RUNNING_STATS_1: RUNNING_STATS_1$1,
	RUNNING_LABEL_1: RUNNING_LABEL_1$1,
	RUNNING_STATS_2: RUNNING_STATS_2$1,
	RUNNING_LABEL_2: RUNNING_LABEL_2$1,
	RUNNING_STATS_3: RUNNING_STATS_3$1,
	RUNNING_LABEL_3: RUNNING_LABEL_3$1,
	CONTACT_TITLE: CONTACT_TITLE$1,
	CONTACT_SUBTITLE: CONTACT_SUBTITLE$1,
	CONTACT_CTA_PRIMARY: CONTACT_CTA_PRIMARY$1,
	CONTACT_CTA_SECONDARY: CONTACT_CTA_SECONDARY$1,
	CONTACT_EMAIL: CONTACT_EMAIL$1,
	FOOTER_TEXT: FOOTER_TEXT$1,
	FOOTER_RIGHTS: FOOTER_RIGHTS$1,
	SMB_LINKEDIN: SMB_LINKEDIN$1,
	SMB_GITHUB: SMB_GITHUB$1,
	SMB_CV: SMB_CV$1,
	CHATBOT_TITLE: CHATBOT_TITLE$1,
	CHATBOT_SUBTITLE: CHATBOT_SUBTITLE$1,
	CHATBOT_PLACEHOLDER: CHATBOT_PLACEHOLDER$1,
	CHATBOT_WELCOME: CHATBOT_WELCOME$1,
	SEARCH_PLACEHOLDER: SEARCH_PLACEHOLDER$1,
	SEARCH_EMPTY: SEARCH_EMPTY$1,
	SEARCH_HINT: SEARCH_HINT$1,
	NOTFOUND_404: NOTFOUND_404$1
};

const WEBPAGE_TITLE = "Portfólio, Ivan Manrique | Dev Frontend & Data Analyst";
const NAV_HOME = "Início";
const NAV_ABOUT = "Sobre";
const NAV_EXPERIENCE = "Experiência";
const NAV_SKILLS = "Habilidades";
const NAV_EDUCATION = "Formação";
const NAV_CONTACT = "Contato";
const NAV_CV = "Baixar CV";
const LANG_ES = "ES";
const LANG_EN = "EN";
const LANG_PT = "PT";
const HERO_H1 = "Código, dados e quilômetros: construo soluções que performam.";
const HERO_H2 = "Desenvolvedor Frontend & Data Analyst. Transformo dados em decisões e ideias em interfaces de alto impacto, com a mesma disciplina de quem corre longas distâncias no deserto.";
const HERO_CTA_PRIMARY = "Ver Projetos";
const HERO_CTA_SECONDARY = "Baixar CV";
const HERO_IMG_ALT = "Foto de perfil de Ivan Manrique";
const HERO_BADGE = "Disponível para oportunidades";
const ABOUT_TITLE = "Sobre mim";
const ABOUT_P1 = "Sou Ivan Daniel Manrique Roa, Desenvolvedor Frontend e Data Analyst. Construo pontes entre o mundo dos dados e a experiência do usuário, transformando requisitos complexos em produtos digitais que geram resultados mensuráveis.";
const ABOUT_P2 = "Atualmente, curso Engenharia de Software na UTP, onde fui selecionado para o programa de talentos diretivos <strong>Impulsa UTP</strong> e integro o Tercio Superior. Minha trajetória une dois mundos: a precisão analítica dos dados e a arte de desenvolver interfaces que encantam.";
const ABOUT_P3 = "Fora das telas, sou corredor disciplinado. Estou me preparando para uma corrida de 35km no deserto de Marcona, com largada às 3 da manhã, e estou no caminho para conquistar a <strong>\"Medalha da Inspiração\"</strong>. Cada quilômetro percorrido reforça as mesmas competências que aplico no código: resiliência, foco sob pressão, gestão do tempo e melhoria contínua. Uma sprint de cada vez, um commit de cada vez.";
const ABOUT_CTA = "Conheça minha história completa";
const EXPERIENCE_TITLE = "Experiência Profissional";
const EXPERIENCE_SUBTITLE = "Resultados comprovados com método STAR";
const EXP_RIPNEL_ROLE = "Desenvolvedor Frontend, Ripnel";
const EXP_RIPNEL_PERIOD = "Práticas Profissionais | 2026";
const EXP_RIPNEL_1 = "Desenvolvi do zero um ERP corporativo completo utilizando React, Next.js e Supabase, entregando uma plataforma funcional que centraliza operações internas da empresa.";
const EXP_RIPNEL_2 = "Implementei pipelines de automação com IA Generativa para validação e processamento de dados, reduzindo em 30% o tempo de registro e eliminando erros manuais recorrentes.";
const EXP_RIPNEL_3 = "Projetei e integrei um chatbot inteligente com suporte a múltiplos idiomas, diminuindo o tempo de resposta ao cliente em 45% e melhorando os índices de satisfação do suporte interno.";
const EXP_RIPNEL_4 = "Colaborei diretamente com stakeholders para traduzir requisitos de negócio em funcionalidades técnicas, aplicando metodologias ágeis com entregas iterativas.";
const EXP_TP_ROLE = "Customer Service Agent, Teleperformance";
const EXP_TP_PERIOD = "2024 – Presente";
const EXP_TP_1 = "Fui promovido a Tier 4 Trilíngue (Espanhol, Inglês, Português), passando a liderar equipes de suporte e atuar como ponto de escalação para casos de alta complexidade.";
const EXP_TP_2 = "Implementei dashboards interativos com Tableau para análise de métricas operacionais, otimizando a visualização de KPIs e reduzindo o tempo de reporte semanal em 40%.";
const EXP_TP_3 = "Liderei sessões de treinamento e mentoria para mais de 20 agentes, elevando os índices de resolução no primeiro contato (FCR) em 25% por meio de documentação e padronização de processos.";
const EXP_TP_4 = "Gerenciei dados de clientes com foco em qualidade e integridade, aplicando técnicas de Data Cleaning e análise exploratória para identificar padrões de recorrência e propor soluções preventivas.";
const PROJECTS_TITLE = "Projetos em Destaque";
const PROJECTS_SUBTITLE = "Cases reais com impacto mensurável";
const PROJ_RIPNEL_TITLE = "ERP Corporativo, Ripnel";
const PROJ_RIPNEL_DESC = "ERP completo desenvolvido do zero com React, Next.js e Supabase. Inclui gestão de inventário, autenticação, chatbot multilíngue com IA e dashboards de métricas.";
const PROJ_RIPNEL_RESULT = "Redução de 30% no tempo operacional e 45% no tempo de resposta ao cliente.";
const PROJ_RIPNEL_TECHS = "React | Next.js | Supabase | Tailwind CSS | TypeScript | IA Generativa";
const PROJ_RIPNEL_DEMO = "#";
const PROJ_RIPNEL_REPO = "#";
const PROJ_TP_TITLE = "Dashboard de Métricas, Teleperformance";
const PROJ_TP_DESC = "Sistema de dashboards interativos em Tableau conectados a bases SQL Server. Visualização de KPIs de atendimento, FCR, CSAT e tempos médios de resolução.";
const PROJ_TP_RESULT = "Redução de 40% no tempo de geração de relatórios e aumento de 18% na tomada de decisão orientada por dados.";
const PROJ_TP_TECHS = "Tableau | SQL | Excel | ETL | Métricas de CX";
const PROJ_TP_DEMO = "#";
const PROJ_TP_REPO = "#";
const PROJ_DATA_TITLE = "Análise de Dados com Python";
const PROJ_DATA_DESC = "Projeto de análise exploratória e limpeza de dados de redes sociais utilizando Python, Pandas e visualização com Matplotlib e Seaborn.";
const PROJ_DATA_RESULT = "Identificação do ano com menor engajamento e recomendação estratégica baseada em dados.";
const PROJ_DATA_TECHS = "Python | Pandas | NumPy | Matplotlib | Seaborn | Jupyter";
const PROJ_DATA_DEMO = "https://www.kaggle.com/code/ivanedasdsada/social-media-exploratory-analisis";
const PROJ_DATA_REPO = "https://www.kaggle.com/code/ivanedasdsada/social-media-exploratory-analisis";
const PROJ_ABOGADO_TITLE = "Plataforma Jurídica Digital";
const PROJ_ABOGADO_DESC = "Plataforma web com rotas protegidas, autenticação de usuários, listagem de serviços via banco de dados e envio de e-mails de contato. Desenvolvida com React e banco de dados relacional.";
const PROJ_ABOGADO_RESULT = "Sistema funcional com autenticação completa e integração de banco de dados para gestão de serviços jurídicos.";
const PROJ_ABOGADO_TECHS = "React | MySQL | Node.js | HTML5 | CSS3 | JavaScript";
const PROJ_ABOGADO_DEMO = "https://proyecto-abogado.vercel.app/";
const PROJ_ABOGADO_REPO = "https://github.com/idmr023/ProyectoAbogado";
const SKILLS_TITLE = "Habilidades & Tecnologias";
const SKILLS_SUBTITLE = "Stack técnica e competências interpessoais";
const SKILLS_FRONTEND_TITLE = "Frontend Development";
const SKILLS_FRONTEND_ITEMS = "React | Next.js | TypeScript | Astro | Tailwind CSS | HTML5 | CSS3 | JavaScript (ES6+) | Bootstrap";
const SKILLS_DATA_TITLE = "Data & IA";
const SKILLS_DATA_ITEMS = "Python | SQL | Tableau | Power BI | Pandas | NumPy | Jupyter | ETL | Data Cleaning | IA Generativa";
const SKILLS_SOFT_TITLE = "Soft Skills & Liderança";
const SKILLS_SOFT_ITEMS = "Liderança de Equipes | Inteligência Emocional | Resolução de Problemas | Comunicação Trilíngue | Gestão do Tempo | Metodologias Ágeis | Mentoria | Adaptabilidade";
const SKILLS_TOOLS_TITLE = "Ferramentas & Infra";
const SKILLS_TOOLS_ITEMS = "Git | GitHub | Supabase | Vercel | Figma | Trello | Excel Avançado | VS Code | Docker";
const EDUCATION_TITLE = "Formação & Conquistas";
const EDUCATION_UTP_TITLE = "Engenharia de Software, UTP";
const EDUCATION_UTP_DESC = "Tercio Superior. Selecionado para o programa de talentos diretivos Impulsa UTP.";
const EDUCATION_UTP_STATUS = "Em andamento";
const EDUCATION_IMPULSA_TITLE = "Programa Impulsa UTP";
const EDUCATION_IMPULSA_DESC = "Programa de talentos diretivos com foco em liderança, inovação e visão estratégica de negócios.";
const EDUCATION_IMPULSA_STATUS = "Em andamento";
const CERTIFICATIONS_TITLE = "Certificações";
const CERT_GOOGLE_TITLE = "Análise de Dados, Google";
const CERT_GOOGLE_DESC = "Planilhas | Tableau | R | Data Cleaning | Visualização de Dados | Storytelling com Dados";
const CERT_ORACLE_TITLE = "Oracle Next Education Front-End, Alura Latam, 2023";
const CERT_ORACLE_DESC = "HTML5 | CSS3 | JavaScript | ReactJS | PHP | MySQL | Git & GitHub | Figma | Agilidade Empresarial";
const CERT_IBM_TITLE = "Data Analyst, Platzi, 2025";
const CERT_IBM_DESC = "Python | NumPy | Pandas | Matplotlib | Seaborn | Jupyter Notebook | Limpeza de Dados";
const RUNNING_TITLE = "Mentalidade Runner";
const RUNNING_QUOTE = "\"Cada quilômetro é uma iteração. Cada prova é um deploy. O impossível é só uma questão de cadência.\"";
const RUNNING_DESC = "Preparação para corrida de 35km no deserto de Marcona. Largada às 3AM. Em busca da Medalha da Inspiração.";
const RUNNING_STATS_1 = "35km";
const RUNNING_LABEL_1 = "Distância no deserto";
const RUNNING_STATS_2 = "Marcona";
const RUNNING_LABEL_2 = "Deserto percorrido";
const RUNNING_STATS_3 = "3AM";
const RUNNING_LABEL_3 = "Largada noturna";
const CONTACT_TITLE = "Vamos construir algo juntos?";
const CONTACT_SUBTITLE = "Se você busca um profissional que combina excelência técnica com uma mentalidade de alto desempenho, está no lugar certo. Estou aberto a oportunidades como Desenvolvedor Frontend, Data Analyst ou posições híbridas onde tecnologia e dados se encontram.";
const CONTACT_CTA_PRIMARY = "Fale Comigo";
const CONTACT_CTA_SECONDARY = "Baixar CV";
const CONTACT_EMAIL = "ivanmanrique@email.com";
const FOOTER_TEXT = "Desenvolvido com disciplina por Ivan Manrique";
const FOOTER_RIGHTS = "Todos os direitos reservados.";
const SMB_LINKEDIN = "Conecte-se comigo no LinkedIn";
const SMB_GITHUB = "Veja meus projetos no GitHub";
const SMB_CV = "Baixar Currículo";
const CHATBOT_TITLE = "Chat com Ivan";
const CHATBOT_SUBTITLE = "Tire suas dúvidas sobre minha experiência, habilidades e projetos.";
const CHATBOT_PLACEHOLDER = "Pergunte sobre minha experiência, skills ou projetos...";
const CHATBOT_WELCOME = "Olá! Sou o assistente virtual do Ivan. Posso te ajudar com informações sobre experiência profissional, habilidades técnicas, formação acadêmica ou projetos. O que você gostaria de saber?";
const SEARCH_PLACEHOLDER = "Pesquisar no portfólio...";
const SEARCH_EMPTY = "Nenhum resultado encontrado.";
const SEARCH_HINT = "Pressione Ctrl+K para buscar";
const NOTFOUND_404 = "404, Página não encontrada";
const portuguese = {
	WEBPAGE_TITLE: WEBPAGE_TITLE,
	NAV_HOME: NAV_HOME,
	NAV_ABOUT: NAV_ABOUT,
	NAV_EXPERIENCE: NAV_EXPERIENCE,
	NAV_SKILLS: NAV_SKILLS,
	NAV_EDUCATION: NAV_EDUCATION,
	NAV_CONTACT: NAV_CONTACT,
	NAV_CV: NAV_CV,
	LANG_ES: LANG_ES,
	LANG_EN: LANG_EN,
	LANG_PT: LANG_PT,
	HERO_H1: HERO_H1,
	HERO_H2: HERO_H2,
	HERO_CTA_PRIMARY: HERO_CTA_PRIMARY,
	HERO_CTA_SECONDARY: HERO_CTA_SECONDARY,
	HERO_IMG_ALT: HERO_IMG_ALT,
	HERO_BADGE: HERO_BADGE,
	ABOUT_TITLE: ABOUT_TITLE,
	ABOUT_P1: ABOUT_P1,
	ABOUT_P2: ABOUT_P2,
	ABOUT_P3: ABOUT_P3,
	ABOUT_CTA: ABOUT_CTA,
	EXPERIENCE_TITLE: EXPERIENCE_TITLE,
	EXPERIENCE_SUBTITLE: EXPERIENCE_SUBTITLE,
	EXP_RIPNEL_ROLE: EXP_RIPNEL_ROLE,
	EXP_RIPNEL_PERIOD: EXP_RIPNEL_PERIOD,
	EXP_RIPNEL_1: EXP_RIPNEL_1,
	EXP_RIPNEL_2: EXP_RIPNEL_2,
	EXP_RIPNEL_3: EXP_RIPNEL_3,
	EXP_RIPNEL_4: EXP_RIPNEL_4,
	EXP_TP_ROLE: EXP_TP_ROLE,
	EXP_TP_PERIOD: EXP_TP_PERIOD,
	EXP_TP_1: EXP_TP_1,
	EXP_TP_2: EXP_TP_2,
	EXP_TP_3: EXP_TP_3,
	EXP_TP_4: EXP_TP_4,
	PROJECTS_TITLE: PROJECTS_TITLE,
	PROJECTS_SUBTITLE: PROJECTS_SUBTITLE,
	PROJ_RIPNEL_TITLE: PROJ_RIPNEL_TITLE,
	PROJ_RIPNEL_DESC: PROJ_RIPNEL_DESC,
	PROJ_RIPNEL_RESULT: PROJ_RIPNEL_RESULT,
	PROJ_RIPNEL_TECHS: PROJ_RIPNEL_TECHS,
	PROJ_RIPNEL_DEMO: PROJ_RIPNEL_DEMO,
	PROJ_RIPNEL_REPO: PROJ_RIPNEL_REPO,
	PROJ_TP_TITLE: PROJ_TP_TITLE,
	PROJ_TP_DESC: PROJ_TP_DESC,
	PROJ_TP_RESULT: PROJ_TP_RESULT,
	PROJ_TP_TECHS: PROJ_TP_TECHS,
	PROJ_TP_DEMO: PROJ_TP_DEMO,
	PROJ_TP_REPO: PROJ_TP_REPO,
	PROJ_DATA_TITLE: PROJ_DATA_TITLE,
	PROJ_DATA_DESC: PROJ_DATA_DESC,
	PROJ_DATA_RESULT: PROJ_DATA_RESULT,
	PROJ_DATA_TECHS: PROJ_DATA_TECHS,
	PROJ_DATA_DEMO: PROJ_DATA_DEMO,
	PROJ_DATA_REPO: PROJ_DATA_REPO,
	PROJ_ABOGADO_TITLE: PROJ_ABOGADO_TITLE,
	PROJ_ABOGADO_DESC: PROJ_ABOGADO_DESC,
	PROJ_ABOGADO_RESULT: PROJ_ABOGADO_RESULT,
	PROJ_ABOGADO_TECHS: PROJ_ABOGADO_TECHS,
	PROJ_ABOGADO_DEMO: PROJ_ABOGADO_DEMO,
	PROJ_ABOGADO_REPO: PROJ_ABOGADO_REPO,
	SKILLS_TITLE: SKILLS_TITLE,
	SKILLS_SUBTITLE: SKILLS_SUBTITLE,
	SKILLS_FRONTEND_TITLE: SKILLS_FRONTEND_TITLE,
	SKILLS_FRONTEND_ITEMS: SKILLS_FRONTEND_ITEMS,
	SKILLS_DATA_TITLE: SKILLS_DATA_TITLE,
	SKILLS_DATA_ITEMS: SKILLS_DATA_ITEMS,
	SKILLS_SOFT_TITLE: SKILLS_SOFT_TITLE,
	SKILLS_SOFT_ITEMS: SKILLS_SOFT_ITEMS,
	SKILLS_TOOLS_TITLE: SKILLS_TOOLS_TITLE,
	SKILLS_TOOLS_ITEMS: SKILLS_TOOLS_ITEMS,
	EDUCATION_TITLE: EDUCATION_TITLE,
	EDUCATION_UTP_TITLE: EDUCATION_UTP_TITLE,
	EDUCATION_UTP_DESC: EDUCATION_UTP_DESC,
	EDUCATION_UTP_STATUS: EDUCATION_UTP_STATUS,
	EDUCATION_IMPULSA_TITLE: EDUCATION_IMPULSA_TITLE,
	EDUCATION_IMPULSA_DESC: EDUCATION_IMPULSA_DESC,
	EDUCATION_IMPULSA_STATUS: EDUCATION_IMPULSA_STATUS,
	CERTIFICATIONS_TITLE: CERTIFICATIONS_TITLE,
	CERT_GOOGLE_TITLE: CERT_GOOGLE_TITLE,
	CERT_GOOGLE_DESC: CERT_GOOGLE_DESC,
	CERT_ORACLE_TITLE: CERT_ORACLE_TITLE,
	CERT_ORACLE_DESC: CERT_ORACLE_DESC,
	CERT_IBM_TITLE: CERT_IBM_TITLE,
	CERT_IBM_DESC: CERT_IBM_DESC,
	RUNNING_TITLE: RUNNING_TITLE,
	RUNNING_QUOTE: RUNNING_QUOTE,
	RUNNING_DESC: RUNNING_DESC,
	RUNNING_STATS_1: RUNNING_STATS_1,
	RUNNING_LABEL_1: RUNNING_LABEL_1,
	RUNNING_STATS_2: RUNNING_STATS_2,
	RUNNING_LABEL_2: RUNNING_LABEL_2,
	RUNNING_STATS_3: RUNNING_STATS_3,
	RUNNING_LABEL_3: RUNNING_LABEL_3,
	CONTACT_TITLE: CONTACT_TITLE,
	CONTACT_SUBTITLE: CONTACT_SUBTITLE,
	CONTACT_CTA_PRIMARY: CONTACT_CTA_PRIMARY,
	CONTACT_CTA_SECONDARY: CONTACT_CTA_SECONDARY,
	CONTACT_EMAIL: CONTACT_EMAIL,
	FOOTER_TEXT: FOOTER_TEXT,
	FOOTER_RIGHTS: FOOTER_RIGHTS,
	SMB_LINKEDIN: SMB_LINKEDIN,
	SMB_GITHUB: SMB_GITHUB,
	SMB_CV: SMB_CV,
	CHATBOT_TITLE: CHATBOT_TITLE,
	CHATBOT_SUBTITLE: CHATBOT_SUBTITLE,
	CHATBOT_PLACEHOLDER: CHATBOT_PLACEHOLDER,
	CHATBOT_WELCOME: CHATBOT_WELCOME,
	SEARCH_PLACEHOLDER: SEARCH_PLACEHOLDER,
	SEARCH_EMPTY: SEARCH_EMPTY,
	SEARCH_HINT: SEARCH_HINT,
	NOTFOUND_404: NOTFOUND_404
};

const LANGUAGES = {
  ENGLISH: "en",
  SPANISH: "es",
  PORTUGUESE: "pt"
};
const getI18N = ({ currentLocale = "es" }) => {
  if (currentLocale === LANGUAGES.ENGLISH) return english;
  if (currentLocale === LANGUAGES.SPANISH) return spanish;
  if (currentLocale === LANGUAGES.PORTUGUESE) return portuguese;
  return spanish;
};

export { $$Layout as $, getI18N as g };
