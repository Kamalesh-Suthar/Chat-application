// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
    trailingComma: 'all',
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    printWidth: 120,
    quoteProps: 'consistent',
    jsxSingleQuote: true,
    jsxBracketSameLine: false,
    arrowParens: 'always',
    bracketSpacing: true,
    htmlWhitespaceSensitivity: 'strict',
};

export default config;
