import type { Config } from 'tailwindcss';
const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './utils/**/*.{js,ts}',
  ],

  safelist: [
    // COLLECTION VARIANT
    'text-white',
    'bg-blue-700',
    'hover:bg-blue-800',
    'focus:ring-4',
    'focus:ring-blue-300',
    'font-medium',
    'rounded-lg',
    'text-sm',
    'px-5',
    'py-2.5',
    'me-2',
    'mb-2',
    'dark:bg-blue-600',
    'dark:hover:bg-blue-700',
    'focus:outline-none',
    'dark:focus:ring-blue-800',

    // PAGINATION VARIANT
    'bg-purple-700',
    'hover:bg-purple-800',
    'focus:ring-purple-300',
    'dark:bg-purple-600',
    'dark:hover:bg-purple-700',
    'dark:focus:ring-purple-900',
  ],
};
export default config;
