'use strict';

angular.module('<%= baseName %>')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/<%= pluralize(name) %>', {
        templateUrl: 'views/<%= name %>/<%= pluralize(name) %>.html',
        controller: '<%= _.capitalize(name) %>Controller',
        resolve:{
          resolved<%= _.capitalize(name) %>: ['<%= _.capitalize(name) %>', function (<%= _.capitalize(name) %>) {
            return <%= _.capitalize(name) %>.query();
          }]
        }
      })
    }]);
