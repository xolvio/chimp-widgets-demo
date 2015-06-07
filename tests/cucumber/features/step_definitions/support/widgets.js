module.exports = function() {

  // Define the widget within a before hook, so that
  // you have access to the chimp-widget classes
  this.Before(function(done) {
    var widgets = this.widgets;

    // Define a widget by extending the base class
    this.Leaderboard = widgets.List.extend({

      selector: '.leaderboard', // All widgets need a CSS selector
      itemSelector: '.player',

      // Define high-level methods that you can call from steps
      givePointsTo: function(name, points) {
        self = this;
        return this.selectPlayer(name).then(function() {
          return self.givePointsToSelectedPlayer(points);
        });
      },

      selectPlayer: function(name) {
        return this.getPlayerByName(name).then(function(player) {
          return player.click();
        });
      },

      getPlayerByName: function(name) {
        return this.findWhere(function(player) {
          return player.find('.name').getText().then(function(text) {
            return text.match(new RegExp(name, "g"));
          });
        });
      },

      givePointsToSelectedPlayer: function() {
        return new widgets.Widget('.details .inc').click();
      },

      checkScoreOf: function(name, expectedPoints) {
        return this.getPlayerByName(name).then(function(player) {
          return player.find('.score').getText().should.become(expectedPoints);
        });
      },

      checkPlayerIsAbove: function(player1, player2) {
        var self = this;
        return this.getPlayerPosition(player1).then(function(position1) {
          return self.getPlayerPosition(player2).then(function(position2) {
            return self.Promise.resolve(position1 < position2).should.become(true);
          });
        });
      },

      getPlayerPosition: function(name) {
        var Promise = this.Promise;
        return Promise.any(this.map(function(player, position) {
          return player.find('.name').getText().then(function(playerName) {
            if(playerName === name) {
              return Promise.resolve(position);
            }
            else {
              return Promise.reject();
            }
          });
        }));
      }
    });
    // Set the URL of the leaderboard screen statically
    this.Leaderboard.url = process.env.ROOT_URL;
    done();
  });
};
