# The Angular-Flask generator 

A [Yeoman](http://yeoman.io) generator for [AngularJS](http://angularjs.org) and [Flask](http://flask.pocoo.org).

Flask is a Python-based micro-framework.  For AngularJS integration with other micro-frameworks, see https://github.com/rayokota/MicroFrameworkRosettaStone.

## Installation

Install [Git](http://git-scm.com), [node.js](http://nodejs.org), and [Python 2.7](http://www.python.org/).  The development mode also requires [SQLite](http://www.sqlite.org).

Install Yeoman:

    npm install -g yo

Install the Angular-Flask generator:

    npm install -g generator-angular-flask

The above prerequisites can be installed to a VM using the [Angular-Flask provisioner](https://github.com/rayokota/provision-angular-flask).
	
## Creating a Flask service

In a new directory, generate the service:

    yo angular-flask

Install a virtual environment in new `flask` directory using `install.sh` (or `install.bat` for Windows):

	./install.sh
	
Run the service:

    flask/bin/python run.py

Your service will run at [http://localhost:5000](http://localhost:5000).


## Creating a persistent entity

Generate the entity:

    yo angular-flask:entity [myentity]

You will be asked to specify attributes for the entity, where each attribute has the following:

- a name
- a type (String, Integer, Float, Boolean, Date, Enum)
- for a String attribute, an optional minimum and maximum length
- for a numeric attribute, an optional minimum and maximum value
- for a Date attribute, an optional constraint to either past values or future values
- for an Enum attribute, a list of enumerated values
- whether the attribute is required

Files that are regenerated will appear as conflicts.  Allow the generator to overwrite these files as long as no custom changes have been made.

Create the database as described in [this blog](http://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-iv-database).

    flask/bin/python db_create.py

Run the service:

    flask/bin/python run.py
    
A client-side AngularJS application will now be available by running

	grunt server
	
The Grunt server will run at [http://localhost:9000](http://localhost:9000).  It will proxy REST requests to the Flask service running at [http://localhost:5000](http://localhost:5000).

At this point you should be able to navigate to a page to manage your persistent entities.  

The Grunt server supports hot reloading of client-side HTML/CSS/Javascript file changes.

