const SeoRule = require('../SeoRule');

const tag = 'strong';


module.exports.create = (atMost = 15) => {
  const opts = {
    atMost,
  };

  return new SeoRule(tag, opts);
};