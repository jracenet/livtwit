var twitter = new TwitterApi();
Meteor.methods({
  postTweet: function (tweet) {
    twitter.postTweet(tweet);
    return true;
  }
});