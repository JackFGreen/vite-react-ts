module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		sourceType: 'module'
	},
	settings: {
		react: {
			version: 'detect'
		}
	},
	extends: [
		'plugin:@typescript-eslint/recommended',
		'standard-with-typescript',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:prettier/recommended'
	],
	rules: {
		'jsx-a11y/no-static-element-interactions': 'off',
		'jsx-a11y/click-events-have-key-events': 'off'
	}
};
