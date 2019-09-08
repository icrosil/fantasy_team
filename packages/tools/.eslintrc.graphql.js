const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  env: {
    node: true,
    jest: true,
  },
  plugins: ['graphql'],
  rules: {
    'class-methods-use-this': OFF,
    'import/extensions': OFF,
    "graphql/named-operations": ERROR,
    "graphql/capitalized-type-name": ERROR,
    "graphql/no-deprecated-fields": ERROR,
    "graphql/template-strings": [ERROR, {
      env: "literal",
      tagName: "gql"
    }],
  }
}
