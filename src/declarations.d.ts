// We need to tell TypeScript that when we write "import styles from './styles.scss' we mean to load a module (to look for a './styles.scss.d.ts'). 
declare module '*.scss';
declare module '*.min.css';

// Injected by vite.config.js's `define` from package.json's version.
declare const __APP_VERSION__: string;
