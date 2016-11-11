'use strict';

var _ = require('underscore.string'),
    fs = require('fs'),
    path = require('path'),

    bowerDir = JSON.parse(fs.readFileSync('.bowerrc')).directory + path.sep;

module.exports = function (gulp, $, config) {

// copy custom fonts into build directory
  gulp.task('snippets', [], function () {
    var snippetsFilter = $.filter('**/*.spt.yml', {restore: true})
    return gulp.src([config.appSnippetFiles])
      .pipe(snippetsFilter)
      .pipe($.concat('ng-webcat-snippets.yml'))
      .pipe(gulp.dest(''))
      .pipe(snippetsFilter.restore);
  });
};