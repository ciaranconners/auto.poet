angular.module('poem-maker')

.service('poet', function($http) {
  this.getPoem = function(numberOfLines, callback) {
    $http.get('http://127.0.0.1:4568/compose', {params: {"param1": numberOfLines}})
      .then(function success(response) {callback(response.data);}, function error(err) {console.error(err);});
  };
});