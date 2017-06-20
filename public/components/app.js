angular.module('poem-maker')

.component('app', {
  controller: function(poet) { // service to get poem will be passed in here
  //this.poet = poet;

  this.poem = '';

  this.onClick = function() {
    poet.getPoem(function(err, data) {
      if (err) {
        console.error(err);
      } else {
        console.log('ive been clicked');
        return data.join('\n');
      }
    });
  };
  },
  templateUrl: './templates/app.html'
});

