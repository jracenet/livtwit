if (Meteor.isClient) {
  Template.sendTweet.events({
    "submit .send-tweet": function (event) {
      var val = event.target.tweetBody.value;
      Meteor.call('postTweet', val);
      return false;
    }
  });
}
if (Meteor.isServer) {
  var twitter = new TwitterApi();
  Meteor.startup(function () {
  });
}

Meteor.methods({
  postTweet: function (text) {
    twitter.postTweet(text);
  }
})
