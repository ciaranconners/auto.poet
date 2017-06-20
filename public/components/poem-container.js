angular.module('poem-maker')

.component('poemContainer', {
  controller: function() {
  },
  templateUrl: './templates/poem-container.html',
  bindings: {
    poem: '<'
  }
});