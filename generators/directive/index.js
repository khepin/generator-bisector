var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var _ = require('lodash')
var NgModule = require('../../utils/NgModule')

var BisectorGenerator = yeoman.generators.NamedBase.extend({
  parseName: function() {
    var validName = /[a-zA-Z]+:[a-zA-Z]+/
    if (!validName.test(this.name)) {
      this.log(chalk.red('Your directive name should follow the format "moduleName:directiveName". Example: auth:ngLogin'))
    }

    var names = this.name.split(':')
    this.moduleName = names[0]
    this.directiveName = names[1]
    this.directiveDashName = this._.dasherize(this.directiveName)

    this.module = new NgModule(this.moduleName)
  },
  template: function() {
    var self = this;
    var done = this.async();
    this.prompt({
      type    : "input",
      name    : "templateName",
      message : "Template name to generate",
    }, function (answers) {
      self.templateName = answers.templateName.replace('.html', '')
      done();
    }.bind(this));
  },
  directive: function() {
    this.module.ensureDirExists('directives')
    this.copy('_template.html', this.module.getDir('templates') + this.templateName + '.html')
    this.copy('_directive.js', this.module.getDir('directives') + this.directiveName + '.js')
  },
  loadController: function() {
    (new NgModule(this.moduleName)).write()
  },
  tests: function() {
    this.copy('_directiveSpec.js', this.module.getDir('tests') + '/unit/directives/' + this.directiveName + 'Spec.js')
  }
});

module.exports = BisectorGenerator;