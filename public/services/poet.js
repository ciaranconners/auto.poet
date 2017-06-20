angular.module('poem-maker')

.service('poet', function($http) {
  this.getPoem = function(numberOfLines, callback) {
    $http.get('http://127.0.0.1:4568/compose', {params: {"param1": numberOfLines}})
      .then(function success(response) {callback(response.data);}, function error(err) {console.error(err);});
  };

  this.savePoem = function(poem, callback) {
    var url = 'http://127.0.0.1:4568/save';
    var config  = {
      headers: {"Content-Type": "application/json"}
    };
    var data = {poem: JSON.stringify(poem)};

    $http.post(url, data, config).then(function success() {console.log('success');}, function error(err) {console.error(err);});
  };
});




  //  url: 'http://127.0.0.1:4568/save',
  //     headers: {"Content-Type": "application/json"},
  //     data: { poem: poem }
  //   };
  //   $http.post(req)
  //     .then(function success(response) {callback();}, function error(err) {console.error(err);});
  // };