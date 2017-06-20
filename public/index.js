angular.module('poem-maker', [])
.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'https://12.0.0.1/**'
  ]);
});