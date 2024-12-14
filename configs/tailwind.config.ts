import type { Config } from "tailwindcss";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const primeui = require("tailwindcss-primeui");

export default <Partial<Config>>{
  theme: {},
  plugins: [primeui],
  content: [`../src/**/*.{js,ts,vue}`],
};
