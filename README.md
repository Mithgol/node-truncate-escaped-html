[![(a histogram of downloads)](https://nodei.co/npm-dl/truncate-escaped-html.png?height=3)](https://npmjs.org/package/truncate-escaped-html)

This module (`truncate-escaped-html`) converts special characters in a string to the corresponding HTML entities, then truncates the resulting string carefully (HTML entities are not cut in the middle).

This module is written in JavaScript and requires [Node.js](http://nodejs.org/) to run. This module is tested against the latest stable version of Node.js.

This module is currently in an early phase of its development and thus does not have the desired level of feature completeness.

## Installing the module

[![(npm package version)](https://nodei.co/npm/truncate-escaped-html.png?downloads=true&downloadRank=true)](https://npmjs.org/package/truncate-escaped-html)

* Latest packaged version: `npm install truncate-escaped-html`

* Latest githubbed version: `npm install https://github.com/Mithgol/node-truncate-escaped-html/tarball/master`

You may visit https://github.com/Mithgol/node-truncate-escaped-html#readme occasionally to read the latest `README` because the package's version is not planned to grow after changes when they happen in `README` only. (And `npm publish --force` is [forbidden](http://blog.npmjs.org/post/77758351673/no-more-npm-publish-f) nowadays.)

## Testing the module

It is necessary to install [JSHint](http://jshint.com/) for testing.

* You may install JSHint globally (`npm install jshint -g`) or locally (`npm install jshint` in the directory of the module).

After that you may run `npm test` (in the directory of the module). Only the JS code errors are caught; the code's behaviour is not tested.

## License

MIT license (see the `LICENSE` file).
