declare module 'dotenv' {
  export function config(): { parsed?: Record<string, string> };
}
