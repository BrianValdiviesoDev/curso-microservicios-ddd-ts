import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';


/** @type {import('eslint').Linter.Config[]} */
export default [
	{files: ['src/*.{js,mjs,cjs,ts}']},
	{ languageOptions: { globals: globals.browser } },
	{
		rules: {
			indent: [
				'error',
				'tab'
			],
			'linebreak-style': [
				'error',
				'unix'
			],
			quotes: [
				'error',
				'single'
			],
			semi: [
				'error',
				'always'
			],
			eqeqeq: 'off',
			'no-unused-vars': 'error',
			'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
		}
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
];