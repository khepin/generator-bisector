var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var _ = require('lodash')
var NgModule = require('../../utils/NgModule')

var BisectorGenerator = yeoman.generators.NamedBase.extend({
  parseName: function() {
    var validName = /[a-zA-Z]+:[a-zA-Z]+/
    if (!validName.test(this.name)) {
      this.log(chalk.red('Your filter name should follow the format "moduleName:FilterName". Example: myModule:limit'))
    }

    var names = this.name.split(':')
    this.moduleName = names[0]
    this.filterName = names[1]

    this.module = new NgModule(this.moduleName)
  },
  directive: function() {
    this.module.ensureDirExists('filters')
    this.copy('_filter.js', this.module.getDir('filters') + this.filterName + '.js')
  },
  loadController: function() {
    (new NgModule(this.moduleName)).write()
  },
  test: function() {
    this.copy('_filterSpec.js', this.module.getDir('tests') + '/unit/filters/' + this.filterName + 'Spec.js')
  }
});

module.exports = BisectorGenerator;