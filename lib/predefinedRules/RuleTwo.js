const SeoRule = require('../SeoRule');

const tag = 'a';
const opts = {
  atMost: 0,
  withoutAttributes: [
    { name: 'rel', value: '*' },
  ]
};


module.exports.create = () => {
  return new SeoRule(tag, opts);
};