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
    this.mkdir('app/src/modules/' + this.name + '/controllers');
    this.mkdir('app/src/modules/' + this.name + '/directives');
    this.mkdir('app/src/modules/' + this.name + '/services');
    this.mkdir('app/src/modules/' + this.name + '/templates');
    this.mkdir('app/src/modules/' + this.name + '/tests');
    this.mkdir('app/src/modules/' + this.name + '/tests/unit');

    // Module file
    this.copy('_module.js', 'app/src/modules/' + this.name + '/' + this.name + '_module.js');
  },

  includeModule: function() {
    function notString(string) {
      return P.custom(function(success, failure){
        return function(stream, i) {
          var head = stream.slice(i, i+string.length);
          if (string !== head) {
            return success(i+1, stream.charAt(i));
          }
          return failure(i, 'not working');
        };
      });
    }

    function join(array) {
      return array.join('');
    }

    var main = fs.readFileSync('app/src/main.js', 'utf-8');

    var modules = fs.readdirSync('app/src/modules')

    var require = _.map(modules, function(module) {
      return "'modules/" + module + '/' + module + "_module',"
    })
    main = replaceTag(main, 'bisector:require:modules', require)

    var di = _.map(modules, function(module) {
      return "'" + module + "',"
    })

    main = replaceTag(main, 'bisector:di:modules', di)

    fs.writeFileSync('app/src/main.js', main, 'utf-8')
  }
});

module.exports = BisectorGenerator;