// Configurazione delle versioni dell'app educativa

export interface ModuleConfig {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

export interface VersionConfig {
  id: string;
  path: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string; // tailwind color class
  modules: ModuleConfig[];
  isAvailable: boolean;
}

export const versions: VersionConfig[] = [
  {
    id: "v1",
    path: "/v1",
    title: "Versione 1",
    subtitle: "Le Basi",
    description: "Client, Server, HTTP Request/Response. Il ciclo fondamentale di comunicazione tra browser e server.",
    icon: "🌱",
    color: "client",
    modules: [
      { id: "overview", title: "Panoramica", subtitle: "Chi fa cosa?", icon: "🏠" },
      { id: "client", title: "Il Client", subtitle: "Frontend", icon: "🌐" },
      { id: "request", title: "Request HTTP", subtitle: "Dal client al server", icon: "→" },
      { id: "server", title: "Il Server", subtitle: "Backend", icon: "🖥️" },
      { id: "response", title: "Response HTTP", subtitle: "Dal server al client", icon: "←" },
      { id: "ui-update", title: "Aggiornamento UI", subtitle: "Il ciclo completo", icon: "🔄" },
    ],
    isAvailable: true,
  },
  {
    id: "v2",
    path: "/v2",
    title: "Versione 2",
    subtitle: "Express.js",
    description: "Perché esiste Express? Cosa semplifica rispetto a Node puro, senza cambiare il modello Client-Server.",
    icon: "⚡",
    color: "server",
    modules: [
      { id: "mental-map", title: "Mappa Mentale", subtitle: "Chi gira dove?", icon: "🗺️" },
      { id: "frontend-same", title: "Il Frontend", subtitle: "Non cambia nulla", icon: "🌐" },
      { id: "request-same", title: "La Request HTTP", subtitle: "Uguale a prima", icon: "📤" },
      { id: "express-backend", title: "Backend Express", subtitle: "Cosa semplifica", icon: "⚡" },
      { id: "comparison", title: "Node vs Express", subtitle: "Confronto visivo", icon: "⚖️" },
      { id: "state-ram", title: "Stato in RAM", subtitle: "Dove vivono i dati", icon: "💾" },
      { id: "complete-flow", title: "Flusso Completo", subtitle: "Timeline animata", icon: "🔄" },
    ],
    isAvailable: true,
  },
  {
    id: "v3",
    path: "/v3",
    title: "Versione 3",
    subtitle: "Next.js",
    description: "Server Components, Client Components, SSR. Frontend e backend nello stesso progetto.",
    icon: "⚛️",
    color: "request",
    modules: [
      { id: "intro", title: "Introduzione", subtitle: "Obiettivi e percorso", icon: "🎯" },
      { id: "mental-map", title: "Mappa Mentale", subtitle: "Un progetto, due ambienti", icon: "🗺️" },
      { id: "interface", title: "Interfaccia Base", subtitle: "Cosa vede l'utente", icon: "🖥️" },
      { id: "react", title: "React", subtitle: "Componenti e UI", icon: "⚛️" },
      { id: "tailwind", title: "Tailwind CSS", subtitle: "Utility-first styling", icon: "🎨" },
      { id: "client-components", title: "Client Components", subtitle: "Interazione nel browser", icon: "🌐" },
      { id: "server-components", title: "Server Components", subtitle: "Rendering sul server", icon: "🖥️" },
      { id: "data-flow", title: "Flusso Dati", subtitle: "Server Actions", icon: "🔄" },
      { id: "ssr", title: "SSR", subtitle: "Rendering lato server", icon: "📄" },
      { id: "typescript", title: "TypeScript", subtitle: "Tipi come contratti", icon: "📝" },
      { id: "summary", title: "Riepilogo", subtitle: "Cosa hai imparato", icon: "🏆" },
    ],
    isAvailable: true,
  },
  {
    id: "v4",
    path: "/v4",
    title: "Versione 4",
    subtitle: "App Reale",
    description: "Da progetto didattico ad applicazione reale: database, autenticazione, deploy.",
    icon: "🚀",
    color: "accent",
    modules: [
      { id: "intro", title: "Introduzione", subtitle: "Cosa cambia", icon: "🎯" },
      { id: "architecture", title: "Architettura", subtitle: "Chi fa cosa", icon: "🏗️" },
      { id: "multi-user", title: "Multi-utente", subtitle: "Perché il database", icon: "👥" },
      { id: "data-model", title: "Modello Dati", subtitle: "Prisma e relazioni", icon: "📊" },
      { id: "auth", title: "Autenticazione", subtitle: "Identità e sessioni", icon: "🔐" },
      { id: "backend", title: "Backend Reale", subtitle: "API + Database", icon: "⚡" },
      { id: "deploy", title: "Deploy", subtitle: "Git e produzione", icon: "☁️" },
      { id: "summary", title: "Flusso Completo", subtitle: "Timeline finale", icon: "🔄" },
    ],
    isAvailable: true,
  },
];

export const getVersionById = (id: string): VersionConfig | undefined => {
  return versions.find(v => v.id === id);
};

export const getVersionByPath = (path: string): VersionConfig | undefined => {
  return versions.find(v => v.path === path);
};
