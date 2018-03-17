const SeoRule = require('../SeoRule');

const tag = 'h1';
const opts = {
  atLeast: 1,
};


module.exports.create = () => {
  return new SeoRule(tag, opts);
};