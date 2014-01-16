'use strict';

angular.module('<%= baseName %>')
  .factory('<%= _.capitalize(name) %>', ['$resource', function ($resource) {
    return $resource('<%= baseName %>/<%= pluralize(name) %>/:id', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });
  }]);
