const _ = require('lodash');
const xpath = require('xpath')
const { genExpressionByRuleConfig } = require('./xpathUtils');

class SeoRule {

  constructor(tag, opts = {}) {
    const {
      atLeast = -1,
      atMost = -1,
      withAttributes = [],
      withoutAttributes = [],
      children = [],
    } = opts;

    this.tag = tag;
    this.atLeast = atLeast;
    this.atMost = atMost;
    this.withAttributes = withAttributes;
    this.withoutAttributes = withoutAttributes;
    this.children = children;
  }

  validate(document) {
    this._validateByBasicRule(document);

    if (this.children && this.children.length) {
      this._validateByChildrenRule(document);
    }
  }

  _validateByRuleConfig(document, config) {
    const expression = genExpressionByRuleConfig(config);
    const nodes = xpath.select(`//${expression}`, document);

    const errorMessage = config.child ? 
      `there are ${nodes.length} <${config.child.tag}>, ${JSON.stringify({ with: config.child.withAttributes, without: config.child.withoutAttributes })}` :
      `there are ${nodes.length} <${config.tag}>, ${JSON.stringify({ with: config.withAttributes, without: config.withoutAttributes })}`;

    if (config.atMost > -1 && nodes.length > config.atMost) {
      throw new Error(errorMessage);
    }

    if (config.atLeast > -1 && nodes.length < config.atLeast) {
      throw new Error(errorMessage);
    }
  }

  _validateByBasicRule(document) {
    const ruleConfig = {
      tag: this.tag,
      atLeast: this.atLeast,
      atMost: this.atMost,
      withAttributes: this.withAttributes,
      withoutAttributes: this.withoutAttributes,
    };

    this._validateByRuleConfig(document, ruleConfig);
  }

  _validateByChildrenRule(document) {
    _.each(this.children, (child) => {
      const ruleConfig = {
        tag: this.tag,
        atLeast: child.atLeast,
        atMost: child.atMost,
        withAttributes: this.withAttributes,
        withoutAttributes: this.withoutAttributes,
        child,
      };

      this._validateByRuleConfig(document, ruleConfig);
    });
  }

}

module.exports = SeoRule;
