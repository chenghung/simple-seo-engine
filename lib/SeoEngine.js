const fs = require('fs');
const xpath = require('xpath')
const _ = require('lodash');
const { DOMParser } = require('xmldom');

class SeoEngine {

  constructor(input = {}, output = {}) {
    const { readStream, inputPath } = input;
    const { writeStream, outputPath } = output;

    this.rs = inputPath ? fs.createReadStream(inputPath) : readStream;

    if (writeStream || outputPath) {
      this.ws = outputPath ? fs.createWriteStream(outputPath) : writeStream;
    }

    if (!this.rs) {
      throw new Error('required a file or read stream');
    }
  }

  async run(seoRules) {
    const xml = await this._readContent();
    const document = new DOMParser().parseFromString(xml);
    const results = seoRules.map(r => this._runBySeoRule(r, document));

    await this._showOrSaveResults(_.compact(results));
  }

  async _showOrSaveResults(results) {
    const report = results.length ? results.join('\n') : 'all rules are passed!';

    if (this.ws) {
      this.ws.write(report);
      this.ws.end();
    } else {
      console.info(report);
    }
  }

  _runBySeoRule(seoRule, document) {
    try {
      seoRule.validate(document);

      return null;
    } catch (error) {
      return error.message;
    }
  }

  async _readContent() {
    let data = '';

    return new Promise((resolve, reject) => {
      this.rs.on('data', (chunk) => {
        data += chunk;
      });

      this.rs.on('end', () => {
        resolve(data);
      });

      this.rs.on('error', (error) => {
        reject(error);
      });
    });
  }
}

module.exports = SeoEngine;