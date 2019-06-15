module.exports = {
  'env': {
    'browser': true,
    'jest': true,
    'es6': true,
    'node': true,
  },
  'extends': [
    'airbnb',
    'prettier',
    "plugin:react/recommended"
  ],
  'plugins': [
    "react",
    'prettier',
  ],
  'parser': 'babel-eslint',
  'rules': {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "no-console": "off",
    'prettier/prettier': ['error', {
      'singleQuote': true,
      'trailingComma': 'es5',
    }],
    'react/destructuring-assignment': 0,
    'react/prop-types': 0,
  },
};
