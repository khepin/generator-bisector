# bisector yeoman generator

This is a Yeoman generator for writing applications with:

 * Angular & Restangular
 * Gulp as a build tool
 * RequireJS

The build tool will use Almond.js instead of RequireJS as to generate a single application file.

## Installation

For now, bisector is not available on NPM yet so you will need to install it via:

    npm install -g yo
    git clone git://github.com/khepin/generator-bisector.git
    cd generator-bisector
    npm link

## Usage

### Create a project

    yo bisector myApp

Will create the whole directory structure and install the dependencies for an Angular app called __myApp__.

Once you have that, you should run `gulp watch` to rebuild your templates and lint your code on changes.

### Create a new module

All the code is separated in modules. A module hosts the relevant controllers, templates, directives, services, filters ...

    yo bisector:module <module_name>

example:

    yo bisector:module authentication

### Create a controller

    yo bisector:controller <module_name>:<controller_name>

example:

    yo bisector:controller authentication:LoginCtrl
    yo bisector:controller authentication:LogoutCtrl

This will generate your controllers in the authentication module. This will also create the first unit tests file for them. You can run the tests through `karma start`

### Create a directive

    yo bisector:directive <module_name>:<directive_name>

Note that the directive name should be the camel-cased version, not the html dash version. Example:

    yo bisector:directive authentication:myLogin

Will create a directive for `<my-login></my-login>` and the associated unit test file.

### Create a service

    yo bisector:service <module_name>:<service_name>

Example:

    yo bisector:service authentication:SessionUser

Again, the tests are also generated.

### Create a filter

    yo bisector:filter <module_name>:<filter_name>

Example

    yo bisector:filter authentication:SomeFilter