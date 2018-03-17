const { expect } = require('chai');
const { genExpressionByRuleConfig } = require('../../lib/xpathUtils');

describe('Test xpathUtils', () => {
  describe('genExpressionByRuleConfig()', () => {
    describe('when no options', () => {
      it('should generate xpath expression', () => {
        const config = {
          tag: 'head',
        };
        const expression = genExpressionByRuleConfig(config);

        expect(expression).to.eq('head');
      });
    });

    describe('when withAttributes option is present', () => {
      it('generate xpath expression with attribute value *', () => {
        const config = {
          tag: 'img',
          withAttributes: [{ name: 'alt', value: '*' }]
        };
        const expression = genExpressionByRuleConfig(config);

        expect(expression).to.eq('img[@alt]');
      });

      it('generate xpath expression with specific attribute value', () => {
        const config = {
          tag: 'a',
          withAttributes: [{ name: 'rel', value: 'next' }]
        };
        const expression = genExpressionByRuleConfig(config);

        expect(expression).to.eq('a[@rel="next"]');
      });
    });

    describe('when withoutAttributes option is present', () => {
      it('generate xpath expression with attribute value *', () => {
        const config = {
          tag: 'img',
          withoutAttributes: [{ name: 'alt', value: '*' }]
        };
        const expression = genExpressionByRuleConfig(config);

        expect(expression).to.eq('img[not(@alt)]');
      });

      it('generate xpath expression with specific attribute value', () => {
        const config = {
          tag: 'a',
          withoutAttributes: [{ name: 'rel', value: 'next' }]
        };
        const expression = genExpressionByRuleConfig(config);

        expect(expression).to.eq('a[not(@rel="next")]');
      });
    });

    describe('when child option is present', () => {
      it('generate xpath expression with one child', () => {
        const config = {
          tag: 'head',
          child: {
            tag: 'meta',
            withAttributes: [{ name: 'name', value: 'descriptions' }]
          }
        };
        const expression = genExpressionByRuleConfig(config);

        expect(expression).to.eq('head[meta[@name="descriptions"]]');
      });
    });
  });
});