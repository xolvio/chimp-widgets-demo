module.exports = function() {

  this.Given(/^I am viewing the leaderboard example$/, function() {
    return this.Leaderboard.visit();
  });

  this.Given(/^the scientists have the following scores:$/, function (scores) {
    return this.mirror.call('setScores', scores.hashes());
  });

  this.When(/^I give "([^"]*)" (\d+) points$/, function (scientist, points) {
    return new this.Leaderboard().givePointsTo(scientist, points);
  });

  this.Then(/^"([^"]*)" should have a score of (\d+)$/, function (scientist, points) {
    return new this.Leaderboard().checkScoreOf(scientist, points);
  });

  this.Then(/^"([^"]*)" should be above "([^"]*)"$/, function (player1, player2) {
    return new this.Leaderboard().checkPlayerIsAbove(player1, player2);
  });

};
