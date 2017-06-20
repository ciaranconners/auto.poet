angular.module('poem-maker')

.service('poet', function($http) {
  this.getPoem = function(callback) {
    $http.get('http://127.0.0.1:4568/compose')
      .then(function success(response) {callback(response);}, function error(err) {console.error(err);});
  };
});