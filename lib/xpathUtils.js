const _ = require('lodash');

module.exports = {
  genExpressionByRuleConfig,
};

function genConditionsByWithAttributes(attributes = []) {
  return attributes.map((a) => {
    if (a.value && a.value !== '*') {
      return `@${a.name}="${a.value}"`
    }

    return `@${a.name}`
  });
}

function genConditionsByWithoutAttributes(attributes = []) {
  return attributes.map((a) => {
    if (a.value && a.value !== '*') {
    return `not(@${a.name}="${a.value}")`;
    }

    return `not(@${a.name})`
  });
}

function genExpressionByRuleConfig(config) {
  if (!config) {
    return null;
  }

  const {
    tag,
    withAttributes = [],
    withoutAttributes = [],
    child,
  } = config;

  const conditions = _.compact(
    _.concat(
      genConditionsByWithAttributes(withAttributes),
      genConditionsByWithoutAttributes(withoutAttributes),
      genExpressionByRuleConfig(child)
    )
  );

  if (conditions.length >= 1) {
    return `${tag}[${conditions.join(' and ')}]`;
  }

  return tag;
};
