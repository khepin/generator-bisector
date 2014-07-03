var fs = require('fs')
var _ = require('lodash')
var replaceTag = require('./replaceTag')

function NgModule(name) {
    this.dir = 'app/src/modules/' + name + '/'
    this.filename = this.dir + name + '_module.js'

    this.file = fs.readFileSync(this.filename, 'utf-8')

    this.getControllers = function() {
        return this._getElements('controllers')
    }

    this.getControllersPaths = function() {
        return this._getPaths('controllers')
    }

    this.getFilters = function() {
        return this._getElements('filters')
    }

    this.getFiltersPaths = function() {
        return this._getPaths('filters')
    }

    this.getDirectives = function() {
        return this._getElements('directives')
    }

    this.getDirectivesPaths = function() {
        return this._getPaths('directives')
    }

    this.getServices = function() {
        return this._getElements('services')
    }

    this.getServicesPaths = function() {
        return this._getPaths('services')
    }

    this._getElements = function(whichElement) {
        if (!fs.existsSync(this.getDir(whichElement))) {
            return [];
        }
        return _.map(fs.readdirSync(this.getDir(whichElement), 'utf-8'), function(ctrl) {
            return ctrl.replace('.js', '')
        })
    }

    this._getElements = _.memoize(this._getElements)

    this._getPaths = function(whichElement) {
        return _.map(this._getElements(whichElement), function(el) {
            return './' + whichElement + '/' + el
        })
    }

    this._getPaths = _.memoize(this._getPaths)

    this.getDir = function(whichElement) {
        if (!whichElement) {
            return this.dir
        }

        return this.dir + whichElement.replace(/\//g, '') + '/'
    }

    this.getElements = function() {
        return this.getControllers().concat(this.getDirectives()).concat(this.getServices()).concat(this.getFilters())
    }

    this.getElementsPaths = function() {
        return this.getControllersPaths().concat(this.getDirectivesPaths()).concat(this.getServicesPaths()).concat(this.getFiltersPaths())
    }

    this._getDeclarations = function(whichElement) {
        var singular = whichElement.slice(0, whichElement.length - 1)
        return _.map(this._getElements(whichElement), function(el) {
          return "module." + singular + "('" + el + "', " + el + ");"
        })
    }

    this.write = function() {
        // RequireJS loading
        var paths = _.map(this.getElementsPaths(), function(path) {
          return "'" + path + "',"
        })
        this.file = replaceTag(this.file, 'bisector:require', paths)

        // RequireJS arguments
        var els = this.getElements()
        els = _.map(els, function(el){ return el + ','})
        this.file = replaceTag(this.file, 'bisector:arg', els)

        // module
        var declarations = this._getDeclarations('controllers')
            .concat(this._getDeclarations('directives'))
            .concat(this._getDeclarations('services'))
            .concat(this._getDeclarations('filters'))

        this.file = replaceTag(this.file, 'bisector:module', declarations)

        fs.writeFileSync(this.filename, this.file, 'utf-8')
    }

    /**
     * The name of the folder might defer from the declared angular module name
     */
    this.getNgModuleName = function() {
        console.log(this.file)
        return this.file.match(/var module = angular.module\('([^,]*)', \[/)[1]
    }
}

module.exports = NgModule