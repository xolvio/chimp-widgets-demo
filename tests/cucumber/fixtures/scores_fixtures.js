Meteor.methods({
  setScores: function(scores) {
    for(var i=0; i < scores.length; i++) {
      player = scores[i];
      Players.update(
        { name: player.name },
        { $set: { score: parseInt(player.score) }}
      );
    }
  }
});
