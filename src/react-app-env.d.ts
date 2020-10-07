/// <reference types="react-scripts" />

declare module '*.scss' {
  const scssExport: Record<string, string>;
  export default scssExport;
}
