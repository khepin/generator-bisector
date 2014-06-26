'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var fs = require('fs');
var P = require('parsimmon');

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

    var parser = P.seq(
      notString('// <bisector:require>').many().map(join),
      P.string('// <bisector:require>'),
      notString('// </bisector:require>').many().map(join),
      P.string('// </bisector:require>'),
      P.any.many().map(join)
    );
    console.log(parser.parse(main))

    main = main.replace('bisector:require:modules', "bisector:require:modules\n    'modules/" + this.name + '/' + this.name + "_module',")
    main = main.replace('bisector:di:modules', "bisector:di:modules\n        '" + this.name + "',")

    fs.writeFileSync('app/src/main.js', main, 'utf-8');
  }
});

module.exports = BisectorGenerator;