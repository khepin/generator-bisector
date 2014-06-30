'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var BisectorGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    this.pkg = require('../../package.json');
    this.version = this.pkg.version;

    var self = this;
    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies({
          callback: function(){
            self.spawnCommand('gulp', ['templates']);
          }
        });
      }
    });
  },

  root: function () {
    // Standard files
    this.copy('README.md', 'README.md');
    this.copy('karma.conf.js', 'karma.conf.js');
    this.copy('package.json', 'package.json');
    this.copy('protractor.conf.js', 'protractor.conf.js');
    this.copy('bowerrc', '.bowerrc');

    // Templates
    this.copy('_gulpfile.js', 'gulpfile.js');
    this.copy('_bower.json', 'bower.json');
  },

  app: function() {
    // Directories
    this.mkdir('app');
    this.mkdir('app/src');

    // Standard files
    this.copy('app/src/_bootstrap.js', 'app/src/bootstrap.js');
    this.copy('app/src/require.config.js', 'app/src/require.config.js');

    // Templates
    this.copy('app/src/_config.js', 'app/src/config.js');
    this.copy('app/src/_main.js', 'app/src/main.js');
    this.copy('app/src/_index.html', 'app/src/index.html');
  },

  examples: function() {
    this.mkdir('app/src/examples');
    this.copy('app/src/examples/_index.html', 'app/src/examples/index.html');
  },

  modules: function() {
    this.mkdir('app/src/modules');
    this.mkdir('app/src/modules/default');
    this.mkdir('app/src/modules/default/controllers');
    this.mkdir('app/src/modules/default/directives');
    this.mkdir('app/src/modules/default/filters');
    this.mkdir('app/src/modules/default/services');
    this.mkdir('app/src/modules/default/templates');
    this.mkdir('app/src/modules/default/tests');
    this.mkdir('app/src/modules/default/tests/unit');
    this.mkdir('app/src/modules/default/tests/unit/controllers');
    this.mkdir('app/src/modules/default/tests/unit/directives');
    this.mkdir('app/src/modules/default/tests/unit/filters');
    this.mkdir('app/src/modules/default/tests/unit/services');

    this.copy('app/src/modules/default/default_module.js', 'app/src/modules/default/default_module.js');
    this.copy('app/src/modules/default/controllers/DefaultCtrl.js', 'app/src/modules/default/controllers/DefaultCtrl.js');
    this.copy('app/src/modules/default/controllers/DefaultCtrl.js', 'app/src/modules/default/controllers/DefaultCtrl.js');
    this.copy('app/src/modules/default/templates/index.html', 'app/src/modules/default/templates/index.html');
  },

  tests: function() {
    this.mkdir('tests');
    this.mkdir('tests/unit');
    this.mkdir('tests/e2e');
    this.mkdir('tests/e2e/modules');

    // Unit tests
    this.copy('tests/unit/main-test.js', 'tests/unit/main-test.js');

    // E2E tests
    this.copy('tests/e2e/PromiseHelper.js', 'tests/e2e/PromiseHelper.js');
    this.copy('tests/e2e/WebPage.js', 'tests/e2e/WebPage.js');
  }
});

module.exports = BisectorGenerator;