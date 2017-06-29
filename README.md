[![(a histogram of downloads)](https://nodei.co/npm-dl/truncate-escaped-html.png?height=3)](https://npmjs.org/package/truncate-escaped-html)

This module (`truncate-escaped-html`) converts special characters in a string to the corresponding HTML entities, then truncates the resulting string carefully (HTML entities are not cut in the middle).

This module is written in JavaScript and requires [Node.js](http://nodejs.org/) to run.

* Starting from v1.0.0, this module requires Node.js version 4.0.0 or newer because it is rewritten in ECMAScript 2015 (ES6).

* You may run older versions of this module (that precede v1.0.0) with older Node.js versions (0.10.x or 0.12.x). Those older versions of Node.js are themselves not maintained by their developers after 2016-12-31.

This module is tested against Node.js v4.x, Node.js v5.x, Node.js v6.x, Node.js v7.x and the latest stable version of Node.js.

## Installing the module

[![(npm package version)](https://nodei.co/npm/truncate-escaped-html.png?downloads=true&downloadRank=true)](https://npmjs.org/package/truncate-escaped-html)

* Latest packaged version: `npm install truncate-escaped-html`

* Latest githubbed version: `npm install https://github.com/Mithgol/node-truncate-escaped-html/tarball/master`

The npm package does not contain the tests, they're published on GitHub only.

You may visit https://github.com/Mithgol/node-truncate-escaped-html#readme occasionally to read the latest `README` because the package's version is not planned to grow after changes when they happen in `README` only. (And `npm publish --force` is [forbidden](http://blog.npmjs.org/post/77758351673/no-more-npm-publish-f) nowadays.)

## Using the module

When you require the installed module, you get a function that converts special characters in a string to the corresponding HTML entities, then truncates the resulting string carefully (so that HTML entities are not cut in the middle). The result is returned synchronously. That function has the following parameters (in order of appearance):

* `limit` — a number which is the maximum length of the function's result.

* `ending` — a string that is attached to the result's end if it is truncated to meet the given `limit`. (This parameter is optional. By default, `''`, an empty string.)

* `source` — a string that undergoes conversion (to become HTML safe) and then becomes truncated if necessary.

The function's behaviour is the following:

* If `limit` is zero or negative, `''` (an empty string) is returned.

* If `limit` is positive but lesser than `ending.length`, an error is thrown (because even the ending won't fit in the given limit).

* HTML special characters in the `source` string are “escaped” (i.e. converted to the corresponding HTML entities). This conversion is performed by the [`.escape`](https://lodash.com/docs/#escape) method of [Lodash](https://lodash.com/). The characters `&`, `"`, `'`, `<`, and `>` are converted (the latter one is only for the sake of simmetry).

* If the length of the result of the conversion is less than `limit` (or equal), then the result is returned.

* If the length of the result of the conversion is greater than `limit`, then the result is truncated (and an ending is attached to its end) and returned.

The length of the `ending` is taken into account so that `limit` is still the maximum length of the function's result. Examples:

```js
var truncateEscapedHTML = require('truncate-escaped-html');
truncateEscapedHTML(5, 'foobar')        // 'fooba'
truncateEscapedHTML(5, '…', 'foobar')   // 'foob…'
truncateEscapedHTML(5, '>>', 'foobar')  // 'foo>>'
```

Also notice (in the last example) that HTML special characters in the `ending` string are **not** escaped. It might be useful if that ending contains some HTML tags; for example, an image (of the scissors) or a hyperlink (that says “continued there →”).

The converted string is truncated carefully (HTML entities are not cut in the middle: they're removed entirely where necessary). Example:

```js
var truncEscapedHTML = require('truncate-escaped-html');
truncEscapedHTML(16, '>>', 'foobar & bazquux')  // 'foobar &amp; b>>'
truncEscapedHTML(15, '>>', 'foobar & bazquux')  // 'foobar &amp; >>'
truncEscapedHTML(14, '>>', 'foobar & bazquux')  // 'foobar &amp;>>'
truncEscapedHTML(13, '>>', 'foobar & bazquux')  // 'foobar >>'
truncEscapedHTML(12, '>>', 'foobar & bazquux')  // 'foobar >>'
truncEscapedHTML(11, '>>', 'foobar & bazquux')  // 'foobar >>'
truncEscapedHTML(10, '>>', 'foobar & bazquux')  // 'foobar >>'
truncEscapedHTML(9,  '>>', 'foobar & bazquux')  // 'foobar >>'
truncEscapedHTML(8,  '>>', 'foobar & bazquux')  // 'foobar>>'
truncEscapedHTML(7,  '>>', 'foobar & bazquux')  // 'fooba>>'
```

The `source` parameter is intentionally the last so that the previous ones are still perfectly visible beforehand even when the last is long and resides on the next line(s); example:

```js
// Unicode U+27A1 is a (so called) “black” rightwards arrow
var OpenGraphDescription = truncateEscapedHTML(200, '…\u27a1',
   authorName + ' \u{1f538} ' + // U+1F538: small orange diamond
   originalTitle + ' [' + originalDateString + ']'
);
```

## Testing the module

[![(build testing status)](https://img.shields.io/travis/Mithgol/node-truncate-escaped-html/master.svg?style=plastic)](https://travis-ci.org/Mithgol/node-truncate-escaped-html)

It is necessary to install [Mocha](https://mochajs.org/) and [JSHint](http://jshint.com/) for testing.

* You may install Mocha globally (`npm install mocha -g`) or locally (`npm install mocha` in the directory of the module).

* You may install JSHint globally (`npm install jshint -g`) or locally (`npm install jshint` in the directory of the module).

After that you may run `npm test` (in the directory of the module).

## License

MIT license (see the `LICENSE` file).
