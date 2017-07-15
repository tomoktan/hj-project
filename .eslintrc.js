'use strict';

module.exports = {
  'extends': 'airbnb',
  'rules': {
    'no-unused-vars': [ 2, { 'consts': 'all', 'args': 'none', 'argsIgnorePattern': '^_' } ],
    'no-use-before-define': 0,
    'comma-dangle': 0
  }
};
