from app import app, db
from app.models import <%= name %>
from flask import abort, jsonify, request
import datetime
import json

@app.route('/<%= baseName %>/<%= pluralize(name) %>', methods = ['GET'])
def get_all_<%= pluralize(name) %>():
    entities = <%= name %>.<%= _.capitalize(name) %>.query.all()
    return json.dumps([entity.to_dict() for entity in entities])

@app.route('/<%= baseName %>/<%= pluralize(name) %>/<int:id>', methods = ['GET'])
def get_<%= name %>(id):
    entity = <%= name %>.<%= _.capitalize(name) %>.query.get(id)
    if not entity:
        abort(404)
    return jsonify(entity.to_dict())

@app.route('/<%= baseName %>/<%= pluralize(name) %>', methods = ['POST'])
def create_<%= name %>():
    entity = <%= name %>.<%= _.capitalize(name) %>(<% var delim = ''; _.each(attrs, function (attr) { %>
        <%= delim %><%= attr.attrName %> = <% if (attr.attrType == 'Date') { %>datetime.datetime.strptime(request.json['<%= attr.attrName %>'], "%Y-%m-%d").date()<% } else { %>request.json['<%= attr.attrName %>']<% } %><% delim = ', '; }); %>
    )
    db.session.add(entity)
    db.session.commit()
    return jsonify(entity.to_dict()), 201

@app.route('/<%= baseName %>/<%= pluralize(name) %>/<int:id>', methods = ['PUT'])
def update_<%= name %>(id):
    entity = <%= name %>.<%= _.capitalize(name) %>.query.get(id)
    if not entity:
        abort(404)
    entity = <%= name %>.<%= _.capitalize(name) %>(<% _.each(attrs, function (attr) { %>
        <%= attr.attrName %> = <% if (attr.attrType == 'Date') { %>datetime.datetime.strptime(request.json['<%= attr.attrName %>'], "%Y-%m-%d").date(),<% } else { %>request.json['<%= attr.attrName %>'],<% }}); %>
        id = id
    )
    db.session.merge(entity)
    db.session.commit()
    return jsonify(entity.to_dict()), 200

@app.route('/<%= baseName %>/<%= pluralize(name) %>/<int:id>', methods = ['DELETE'])
def delete_<%= name %>(id):
    entity = <%= name %>.<%= _.capitalize(name) %>.query.get(id)
    if not entity:
        abort(404)
    db.session.delete(entity)
    db.session.commit()
    return '', 204
