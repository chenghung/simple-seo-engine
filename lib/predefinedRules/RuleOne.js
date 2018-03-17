const SeoRule = require('../SeoRule');

const tag = 'img';
const opts = {
  atMost: 0,
  withoutAttributes: [
    { name: 'alt', value: '*' },
  ]
};


module.exports.create = () => {
  return new SeoRule(tag, opts);
};