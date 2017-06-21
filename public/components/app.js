angular.module('poem-maker')

  .component('app', {
    controller: function(poet) {

      var that = this;

      this.poem = [
        'There all the golden codgers lay,',
        'There the silver dew,',
        'And the great water sighed for love,',
        'And the wind sighed too.',
        'Man-picker Niamh leant and sighed',
        'By Oisin on the grass;',
        'There sighed amid his choir of love',
        'Tall Pythagoras.',
        'Plotinus came and looked about,',
        'The salt-flakes on his breast,',
        'And having stretched and yawned awhile',
        'Lay sighing like the rest.'];

      this.lines = 14;
      this.email = 'me@example.com';

      this.onClick = function() {
        var text;
        var lines = this.lines;
          poet.getPoem(lines, function(response) {
            that.poem = response;
            that.lines = '';
          });
      };

      this.save = function() {
        var poem = this.poem;
        poet.savePoem(poem, function() {
        });
      };


      this.retrieve = function() {
        var email = this.email;
        poet.emailPoems(email);
        console.log('Thank you! The archive should arrive shortly.');
        this.email = '';
      };
    },

    templateUrl: './templates/app.html'

  });

