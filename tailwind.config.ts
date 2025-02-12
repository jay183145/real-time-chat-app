import type { Config } from "tailwindcss"

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                black: "var(--color-black)",
                white: "var(--color-white)",
                success: {
                    1: "var(--color-success-1)",
                    2: "var(--color-success-2)",
                    3: "var(--color-success-3)",
                },
                error: {
                    1: "var(--color-error-1)",
                    2: "var(--color-error-2)",
                    3: "var(--color-error-3)",
                },
                warning: {
                    1: "var(--color-warning-1)",
                    2: "var(--color-warning-2)",
                    3: "var(--color-warning-3)",
                },
                info: {
                    1: "var(--color-info-1)",
                    2: "var(--color-info-2)",
                    3: "var(--color-info-3)",
                },
                neutral: {
                    50: "var(--color-neutral-50)",
                    100: "var(--color-neutral-100)",
                    200: "var(--color-neutral-200)",
                    300: "var(--color-neutral-300)",
                    400: "var(--color-neutral-400)",
                    500: "var(--color-neutral-500)",
                    600: "var(--color-neutral-600)",
                    700: "var(--color-neutral-700)",
                    800: "var(--color-neutral-800)",
                    900: "var(--color-neutral-900)",
                },
                primary: {
                    1: "var(--color-primary-1)",
                    2: "var(--color-primary-2)",
                    3: "var(--color-primary-3)",
                    4: "var(--color-primary-4)",
                    5: "var(--color-primary-5)",
                },
                secondary: {
                    1: "var(--color-secondary-1)",
                    2: "var(--color-secondary-2)",
                    3: "var(--color-secondary-3)",
                    4: "var(--color-secondary-4)",
                    5: "var(--color-secondary-5)",
                },
                special: {
                    1: "var(--color-special-1)",
                    2: "var(--color-special-2)",
                    3: "var(--color-special-3)",
                    4: "var(--color-special-4)",
                    5: "var(--color-special-5)",
                },
                shades: {
                    0: "var(--color-shades-0)",
                    100: "var(--color-shades-100)",
                },
            },
        },
    },
    plugins: [],
} satisfies Config
