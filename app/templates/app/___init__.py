from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__, static_url_path='')
app.config.from_object('config')
db = SQLAlchemy(app)

<% _.each(entities, function (entity) { %>
from app.models import <%= entity.name %><% }); %>
from app.routes import index
<% _.each(entities, function (entity) { %>
from app.routes import <%= pluralize(entity.name) %><% }); %>
