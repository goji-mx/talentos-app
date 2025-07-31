// config.ts
interface BackendConfig {
  DB_HOST: string;
  PORT: number;
  // …otras variables si las necesitaras
}

interface AppConfig {
  backend: BackendConfig;
}

// Siempre asume un valor por defecto en caso de que no exista la variable,
// aunque lo ideal es que Vite sí la inyecte.
const config: AppConfig = {
  backend: {
    PORT: import.meta.env.VITE_PORT ? Number(import.meta.env.VITE_PORT) : 3333,
    DB_HOST: import.meta.env.VITE_DB_HOST ?? 'http://localhost:3333/backend',
  },
};

export default config;
export const backend = config.backend;