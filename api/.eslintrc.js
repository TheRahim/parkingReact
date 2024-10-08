module.exports = {
    root: true,
    env: {
        "es6": true,
        "node": true
    },
    parser: "@typescript-eslint/parser",
    extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "plugin:prettier/recommended",
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
    ],
    parserOptions: {
        ecmaVersion: 2020,
        project: "tsconfig.json",
        sourceType: "module",
    },
    ignorePatterns: [
        "/dist/**/*", // Ignore built files.
        "**/node_modules/**",
        "vite.config.ts"
    ],
    plugins: [
        "@typescript-eslint",
        "@typescript-eslint/eslint-plugin",
        "import",
        "prettier",
    ],
    rules: {
        "prettier/prettier": ["error"],
        semi: ["error", "always"],
        "object-curly-spacing": ["error", "always"],
        camelcase: "off",
        "no-var": "error",
        indent: ["error", 4, { SwitchCase: 1 }],
        "no-multi-spaces": "error",
        "space-in-parens": "error",
        "no-multiple-empty-lines": "error",
        "prefer-const": "error",
        "quotes": ["error", "double"],
        "import/no-unresolved": 0,
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                "": "never",
                "js": "never",
                "jsx": "never",
                "ts": "never",
                "tsx": "never"
            }
        ],
        "space-before-function-paren": ["error", {
            "anonymous": "never",
            "named": "never",
            "asyncArrow": "always"
        }],
        "@typescript-eslint/no-shadow": ["error"],
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-explicit-any": ["off"],
        "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
        "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
    }
};