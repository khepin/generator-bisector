'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var fs = require('fs');

var BisectorGenerator = yeoman.generators.NamedBase.extend({
  module: function() {
    // Directory structure
    this.mkdir('app/src/modules/' + this.name);
    this.mkdir('app/src/modules/' + this.name + '/controllers');
    this.mkdir('app/src/modules/' + this.name + '/templates');
    this.mkdir('app/src/modules/' + this.name + '/tests');
    this.mkdir('app/src/modules/' + this.name + '/tests/unit');

    // Module file
    this.copy('_module.js', 'app/src/modules/' + this.name + '/' + this.name + '_module.js');
  },

  includeModule: function() {
    var main = fs.readFileSync('app/src/main.js', 'utf-8');

    main = main.replace('bisector:require:modules', "bisector:require:modules\n    'modules/" + this.name + '/' + this.name + "_module',")
    main = main.replace('bisector:di:modules', "bisector:di:modules\n        '" + this.name + "',")

    fs.writeFileSync('app/src/main.js', main, 'utf-8');
  }
});

module.exports = BisectorGenerator;