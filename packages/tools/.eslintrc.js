const OFF = 0;
module.exports = {
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'class-methods-use-this': OFF,
    'import/extensions': OFF
  }
};
