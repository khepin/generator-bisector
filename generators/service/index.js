var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var _ = require('lodash')
var NgModule = require('../../utils/NgModule')

var BisectorGenerator = yeoman.generators.NamedBase.extend({
  parseName: function() {
    var validName = /[a-zA-Z]+:[a-zA-Z]+/
    if (!validName.test(this.name)) {
      this.log(chalk.red('Your service name should follow the format "moduleName:ServiceName". Example: auth:SessionUser'))
    }

    var names = this.name.split(':')
    this.moduleName = names[0]
    this.serviceName = names[1]

    this.module = new NgModule(this.moduleName)
  },
  directive: function() {
    this.module.ensureDirExists('services')
    this.copy('_service.js', this.module.getDir('services') + this.serviceName + '.js')
  },
  loadController: function() {
    (new NgModule(this.moduleName)).write()
  },
  test: function() {
    this.copy('_serviceSpec.js', this.module.getDir('tests') + '/unit/services/' + this.serviceName + 'Spec.js')
  }
});

module.exports = BisectorGenerator;