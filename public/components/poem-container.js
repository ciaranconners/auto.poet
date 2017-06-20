angular.module('poem-maker')

.component('poem-container', {
  controller: function() {
    this.line = 'whose woods are these i think i know';
  },
  templateUrl: './templates/poem-container.html',
  getPoem: this.service
});