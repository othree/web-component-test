/*jslint indent: 2 */

var gulp     = require('gulp');
var http     = require('http');
var ecstatic = require('ecstatic');

gulp.task('default', function () {
  "use strict";
  http.createServer(
    ecstatic({ root: __dirname, autoIndex: true })
  ).listen(8080);

  console.log('Listening on :8080');
});
