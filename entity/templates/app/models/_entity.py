from app import db

class <%= _.capitalize(name) %>(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    <% _.each(attrs, function (attr) { %>
    <%= attr.attrName %> = db.Column(db.<% if (attr.attrType == 'Enum') { %>Enum(<% var delim = ''; _.each(attr.enumValues, function (value) { %><%= delim %>'<%= value %>'<% delim = ', '; }) %>)<% } else { %><%= attr.attrType %><% }; %>)
    <% }); %>

    def to_dict(self):
        return dict(<% _.each(attrs, function (attr) {  %>
            <%= attr.attrName %> = self.<%= attr.attrName %><% if (attr.attrType == 'Date') { %>.isoformat()<% }; %>,<% }); %>
            id = self.id
        )

    def __repr__(self):
        return '<<%= _.capitalize(name) %> %r>' % (self.id)
