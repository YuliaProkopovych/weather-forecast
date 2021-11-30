module.exports = {
  extends: [
    'airbnb',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'jsx-a11y/anchor-is-valid': [1, {
      components: ['Link'],
      specialLink: ['href'],
      aspects: ['noHref', 'invalidHref', 'preferButton'],
    }],
    'import/no-extraneous-dependencies': 0,
    'max-len': [2, {
      code: 120, ignoreStrings: true, ignoreUrls: true, ignoreTemplateLiterals: true,
    }],
    'jsx-a11y/no-static-element-interactions': [1],
    'jsx-a11y/click-events-have-key-events': [1],
    'global-require': [1],
    'react-hooks/rules-of-hooks': [2],
    'react-hooks/exhaustive-deps': [1],
    'react/function-component-definition': [2, { namedComponents: 'function-declaration' }],
  },
  plugins: [
    'react-hooks',
  ],
};
