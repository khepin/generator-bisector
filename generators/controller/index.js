var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var _ = require('lodash')
var NgModule = require('../../utils/NgModule')

var BisectorGenerator = yeoman.generators.NamedBase.extend({
  parseName: function() {
    var validName = /[a-zA-Z]+:[a-zA-Z]+/
    if (!validName.test(this.name)) {
      this.log(chalk.red('Your controller name should follow the format "moduleName:ControllerName". Example: auth:LoginController'))
    }

    var names = this.name.split(':')
    this.moduleName = names[0]
    this.controllerName = names[1]

    this.module = new NgModule(this.moduleName)
  },
  controller: function() {
    this.copy('_controller.js', this.module.getDir('controllers') + this.controllerName + '.js')
  },
  loadController: function() {
    var m = new NgModule(this.moduleName)
    m.write()
  },
  tests: function() {
    this.copy('_controllerSpec.js', this.module.getDir('tests') + '/unit/controllers/' + this.controllerName + 'Spec.js')
  }
});

module.exports = BisectorGenerator;