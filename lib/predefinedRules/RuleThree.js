const SeoRule = require('../SeoRule');

const tag = 'head';
const opts = {
  atLeast: 1,
  atMost: 1,
  children: [
    { tag: 'title', atLeast: 1, atMost: 1 },
    { tag: 'meta', atLeast: 1, atMost: 1, withAttributes: [{ name: 'name', value: 'descriptions' }] },
    { tag: 'meta', atLeast: 1, atMost: 1, withAttributes: [{ name: 'name', value: 'keywords' }] },
  ],
};


module.exports.create = () => {
  return new SeoRule(tag, opts);
};