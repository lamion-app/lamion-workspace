import type { Config } from "tailwindcss";
import primeui from "tailwindcss-primeui";

export default <Partial<Config>>{
  theme: {},
  plugins: [primeui],
  safelist: [
    {
      pattern: /(bg)-(.*?)-(.*?)/,
      variants: ["hover", "active"],
    },
  ],
  content: [`../src/**/*.{js,ts,vue}`],
};
