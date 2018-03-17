const { SeoEngine, SeoRule, PredefinedRules } = require('../index.js');

// predefined rules
const { RuleOne, RuleTwo, RuleThree, RuleFour, RuleFive } = PredefinedRules;
const rule1 = RuleOne.create();
const rule2 = RuleTwo.create();
const rule3 = RuleThree.create();
const rule4 = RuleFour.create();
const rule5 = RuleFive.create();

// custom rule
const tag = 'head';
const opts = {
  atLeast: 1,
  atMost: 1,
  children: [
    { tag: 'meta', atLeast: 1, atMost: 1, withAttributes: [{ name: 'name', value: 'robots' }] },
  ],
};
const customRule = new SeoRule(tag, opts);

// test file
const inputPath = './test/data/test.html';
const outputPath = './output.txt';

// initialize resource
const engine = new SeoEngine({ inputPath });
// const engine = new SeoEngine({ inputPath }, { outputPath });

// analysis html file
(async function () {
  try {
    const rules = [rule1, rule3];
    await engine.run(rules);
  } catch (error) {
    console.log('error', error);
  }
})();
