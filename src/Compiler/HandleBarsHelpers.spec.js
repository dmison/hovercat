/* global describe it */
const expect = require('chai').expect;
const {markdown_helper} = require('./HandleBarsHelpers.js');
const {line_helper} = require('./HandleBarsHelpers.js');
const {unentity_helper} = require('./HandleBarsHelpers.js');
const {spanner_helper} = require('./HandleBarsHelpers.js');

describe('test HandleBars Helpers', () => {

  it('testing markdown_helper', () => {
    const markdown_string = `## titleblock

    a paragraph

     * one
     * two
     * three`;

    const expectedOutput = '<h2>titleblock</h2>\n\n<pre><code>a paragraph\n\n * one\n * two\n * three\n</code></pre>';
    const actualOutput = markdown_helper(markdown_string);
    expect(actualOutput.string).to.deep.equal(expectedOutput);
  });

  it('testing line_helper', () => {
    const inputString = 'This is a title';
    const replacement = '=';
    const expectedOutput = '===============';
    const actualOutput = line_helper(inputString, replacement);
    expect(actualOutput.string).to.equal(expectedOutput);
  });

  it('testing unentity_helper', () => {
    const content = 'this is >> &lt;b&gt;bold&lt;/b&gt; << text';
    const actualOutput = unentity_helper(content);
    const expectedOutput = 'this is >> <b>bold</b> << text';
    expect(actualOutput.string).to.equal(expectedOutput);
  });

  it('testing spanner_helper', () => {
    const content = 'Engineering Today Newsletter';
    const expectedOutput = '<span>E</span>ngineering <span>T</span>oday <span>N</span>ewsletter';
    const actualOutput = spanner_helper(content);
    expect(actualOutput).to.equal(expectedOutput);
  });


  // if_even_helper
  // firsthalf_helper
  // secondhalf_helper


});
