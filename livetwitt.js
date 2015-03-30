var checkTweetLength = function (tweet) {
  return tweet.length <= 140
};

if (Meteor.isClient) {
  Template.sendTweet.helpers({
    errorMessages: function () {
      return Session.get('errorMessages');
    }
  });

  Template.sendTweet.events({
    "change input[name='tweetBody']": function (event) {
      Session.set('errorMessages', '');
    },
    "submit .send-tweet": function (event) {
      event.preventDefault();
      var val = event.target.tweetBody.value;

      if (checkTweetLength(val)) {
        Meteor.call('postTweet', val);
      } else {
        Session.set('errorMessages', "Your tweet is too long");
      }
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
  postTweet: function (tweet) {
    twitter.postTweet(tweet);
    return true;
  }
})
