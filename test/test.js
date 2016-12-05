/* global describe, it */
var assert = require('assert');
var truncateEscapedHTML = require('../');

describe('The truncation of escaped HTML', function(){
   it('returns an empty string if limit is zero or negative', function(){
      assert.strictEqual( '', truncateEscapedHTML(0, 'foobar') );
      assert.strictEqual( '', truncateEscapedHTML(-1, 'foobar') );
      assert.strictEqual( '', truncateEscapedHTML(0, 'foobar', 'baz') );
      assert.strictEqual( '', truncateEscapedHTML(-4, 'foobar', '<quux />') );
   });
   it("throws if a positive limit is smaller than the ending's length",
   function(){
      assert.throws(function(){
         truncateEscapedHTML(4, 'foobar', 'baz');
      });
      assert.throws(function(){
         truncateEscapedHTML(4, 'foobar', 'bazquux');
      });
   });
   it('simply escapes HTML if results are shorter than the limit', function(){
      assert.strictEqual( 'foobar', truncateEscapedHTML(6, 'foobar') );
      assert.strictEqual(
         'foo &lt;bar quux=&quot;quuux&quot;&gt; baz &lt;/bar&gt;',
         truncateEscapedHTML(55, 'foo <bar quux="quuux"> baz </bar>')
      );
      assert.strictEqual( 'foobar', truncateEscapedHTML(6, 'baz', 'foobar') );
      assert.strictEqual(
         'foo &lt;bar quux=&quot;quuux&quot;&gt; baz &lt;/bar&gt;',
         truncateEscapedHTML(55, 'fnord', 'foo <bar quux="quuux"> baz </bar>')
      );
   });
   it('carefully truncates escaped HTML', function(){
      assert.strictEqual( truncateEscapedHTML(4, 'foobar'), 'foob' );
      assert.strictEqual( truncateEscapedHTML(4, '…', 'foobar'), 'foo…' );
      assert.strictEqual( truncateEscapedHTML(4, '>>', 'foobar'), 'fo>>' );

      assert.strictEqual(
         truncateEscapedHTML(11, 'foo "bar" baz'), 'foo &quot;b'
      );
      assert.strictEqual(
         truncateEscapedHTML(12, '…', 'foo "bar" baz'), 'foo &quot;b…'
      );
      assert.strictEqual(
         truncateEscapedHTML(13, '>>', 'foo "bar" baz'), 'foo &quot;b>>'
      );

      assert.strictEqual(
         truncateEscapedHTML(10, 'foo "bar" baz'), 'foo &quot;'
      );
      assert.strictEqual(
         truncateEscapedHTML(11, '…', 'foo "bar" baz'), 'foo &quot;…'
      );
      assert.strictEqual(
         truncateEscapedHTML(12, '>>', 'foo "bar" baz'), 'foo &quot;>>'
      );

      assert.strictEqual(
         truncateEscapedHTML(9, 'foo "bar" baz'), 'foo '
      );
      assert.strictEqual(
         truncateEscapedHTML(10, '…', 'foo "bar" baz'), 'foo …'
      );
      assert.strictEqual(
         truncateEscapedHTML(11, '>>', 'foo "bar" baz'), 'foo >>'
      );
   });
});