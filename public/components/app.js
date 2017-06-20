angular.module('poem-maker')

  .component('app', {
    controller: function(poet) {

      var that = this;

      this.poem = ['Whose woods are these I think I know;', 'His house is in the village though;',
      'He will not see me stopping here', 'To watch his woods fill up with snow.'];

      this.lines = 14;
      this.email = 'me@example.com';

      this.onClick = function() {
        var text;
        var lines = this.lines;
          poet.getPoem(lines, function(response) {
            that.poem = response;
          });
      };

      this.save = function() {
        var poem = this.poem;
        poet.savePoem(poem, function() {
          console.log('post request sent');
        });
      };


      this.retrieve = function() {
        console.log('inside retrieve');
        var email = this.email;
        poet.emailPoems(email);
      };
    },

    templateUrl: './templates/app.html'

  });

  // when the save button is clicked we have a this.poem

  // so, that's what we send back to mongoose

  // save to mongoose plan of action:

    // one, another service to be called when save is clicked (a post service)
    // the server's '/save' endpoint can handle saving to the DB



    // get this done in the morning, then style the rest of the day

    // and also a way to select number of lines

    // TODO:

      // a way to select number of lines
      // save and retrieve methods (using ngModel to get data from the page and then a post service)

