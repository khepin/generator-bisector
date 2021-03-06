'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var fs = require('fs');
var replaceTag = require('../../utils/replaceTag')
var _ = require('lodash')

var BisectorGenerator = yeoman.generators.NamedBase.extend({
  module: function() {
    // Directory structure
    this.mkdir('app/src/modules/' + this.name);
    this.mkdir('app/src/modules/' + this.name + '/templates');
    this.mkdir('app/src/modules/' + this.name + '/tests');
    this.mkdir('app/src/modules/' + this.name + '/tests/unit');
    this.mkdir('app/src/modules/' + this.name + '/tests/unit/controllers');
    this.mkdir('app/src/modules/' + this.name + '/tests/unit/directives');
    this.mkdir('app/src/modules/' + this.name + '/tests/unit/services');
    this.mkdir('app/src/modules/' + this.name + '/tests/unit/filters');

    // Module file
    this.copy('_module.js', 'app/src/modules/' + this.name + '/' + this.name + '_module.js');
  },

  includeModule: function() {
    var main = fs.readFileSync('app/src/main.js', 'utf-8');

    var modules = fs.readdirSync('app/src/modules')

    var require = _.map(modules, function(module) {
      return "'modules/" + module + '/' + module + "_module',"
    })
    main = replaceTag(main, 'bisector:require:modules', require)

    var ngNames = _.map(modules, function(mod){
        var file = fs.readFileSync('app/src/modules/' + mod + '/' + mod + '_module.js', 'utf-8')
        return file.match(/var module = angular.module\(([^,]*), \[/)[1] + ','
    })

    main = replaceTag(main, 'bisector:di:modules', ngNames)

    fs.writeFileSync('app/src/main.js', main, 'utf-8')
  }
});

module.exports = BisectorGenerator;