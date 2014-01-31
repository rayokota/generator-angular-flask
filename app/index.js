'use strict';
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    _ = require('lodash'),
    _s = require('underscore.string'),
    pluralize = require('pluralize'),
    asciify = require('asciify');

var AngularFlaskGenerator = module.exports = function AngularFlaskGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(AngularFlaskGenerator, yeoman.generators.Base);

AngularFlaskGenerator.prototype.askFor = function askFor() {

  var cb = this.async();

  console.log('\n' +
    '+-+-+-+-+-+-+-+ +-+-+-+-+-+ +-+-+-+-+-+-+-+-+-+\n' +
    '|a|n|g|u|l|a|r| |f|l|a|s|k| |g|e|n|e|r|a|t|o|r|\n' +
    '+-+-+-+-+-+-+-+ +-+-+-+-+-+ +-+-+-+-+-+-+-+-+-+\n' +
    '\n');

  var prompts = [{
    type: 'input',
    name: 'baseName',
    message: 'What is the name of your application?',
    default: 'myapp'
  }];

  this.prompt(prompts, function (props) {
    this.baseName = props.baseName;

    cb();
  }.bind(this));
};

AngularFlaskGenerator.prototype.app = function app() {

  this.entities = [];
  this.resources = [];
  this.generatorConfig = {
    "baseName": this.baseName,
    "entities": this.entities,
    "resources": this.resources
  };
  this.generatorConfigStr = JSON.stringify(this.generatorConfig, null, '\t');

  this.template('_generator.json', 'generator.json');
  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.template('bowerrc', '.bowerrc');
  this.template('Gruntfile.js', 'Gruntfile.js');
  this.copy('gitignore', '.gitignore');

  var appDir = 'app/'
  var modelsDir = appDir + 'models/'
  var routesDir = appDir + 'routes/'
  var staticDir = appDir + 'static/'
  var templatesDir = appDir + 'templates/'
  this.mkdir(appDir);
  this.mkdir(modelsDir);
  this.mkdir(routesDir);
  this.mkdir(staticDir);
  this.mkdir(templatesDir);

  this.copy('install.bat', 'install.bat');
  this.copy('install.sh', 'install.sh');
  this.copy('config.py', 'config.py');
  this.copy('db_create.py', 'db_create.py');
  this.copy('db_downgrade.py', 'db_downgrade.py');
  this.copy('db_migrate.py', 'db_migrate.py');
  this.copy('db_upgrade.py', 'db_upgrade.py');
  this.copy('run.py', 'run.py');
  this.copy('virtualenv.py', 'virtualenv.py');
  this.template('app/___init__.py', appDir + '__init__.py');
  this.template('app/models/___init__.py', modelsDir + '__init__.py');
  this.template('app/routes/___init__.py', routesDir + '__init__.py');
  this.template('app/routes/_index.py', routesDir + 'index.py');

  var staticCssDir = staticDir + 'css/';
  var staticJsDir = staticDir + 'js/';
  var staticViewDir = staticDir + 'views/';
  this.mkdir(staticCssDir);
  this.mkdir(staticJsDir);
  this.mkdir(staticViewDir);
  this.template('app/static/_index.html', staticDir + 'index.html');
  this.copy('app/static/css/app.css', staticCssDir + 'app.css');
  this.template('app/static/js/_app.js', staticJsDir + 'app.js');
  this.template('app/static/js/home/_home-controller.js', staticJsDir + 'home/home-controller.js');
  this.template('app/static/views/home/_home.html', staticViewDir + 'home/home.html');
};

AngularFlaskGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
