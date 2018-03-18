# simple-seo-engine
## Requirements

 - node 8.0 +

## Guide

**initialize a engine**

	const { SeoEngine } = require('simple-seo-engine');

	const inputPath = './test.html';
	const engine = new Engine({ inputPath });

	// run engine with your rules
	(async function () {
	  try {
	    const rules = [rule1, rule3];
	    await engine.run(rules);
	  } catch (error) {
	    console.log('error', error);
	  }
	})();


**predefined rules**

    const { PredefinedRules } = require('simple-seo-engine');

	// the predefined rules in this package
	const { RuleOne, RuleTwo, RuleThree, RuleFour, RuleFive } = PredefinedRules;
	const rule1 = RuleOne.create();
	const rule2 = RuleTwo.create();
	const rule3 = RuleThree.create();
	const rule4 = RuleFour.create();
	const rule5 = RuleFive.create();

**custom rules**
    
    const { SeoRule } = require('simple-seo-engine');

    // custom rule
	const tag = 'head';
	const opts = {
	  atLeast: 1,
	  atMost: 1,
	  children: [
	    {
		    tag: 'meta',
		    atLeast: 1,
		    atMost: 1,
		    withAttributes: [
			    { name: 'name', value: 'robots' }
			]
		},
	  ],
	};

	const customRule = new SeoRule(tag, opts);


