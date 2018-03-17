const { expect } = require('chai');
const SeoRule = require('../../lib/SeoRule');

describe('Test SeoRule', () => {
  const seoRule = new SeoRule('a', { withAttributes: [{ name: 'rel', value: 'next' }] });

  describe('getter', () => {
    describe('xpathExpression', () => {
      it('should return expression', () => {
        const expression = seoRule.xpathExpression;
        expect(expression).to.eq('//a[@rel="next"]');
      });
    });
  });
});