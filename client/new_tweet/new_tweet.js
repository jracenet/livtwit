Template.newTweet.helpers({
  errorMessages: function () {
    return Session.get('errorMessages');
  },

  currentPattern: function () {
    return Session.get('tweetTemplate');
  }
});

Template.newTweet.events({
  "change input[name='tweetBody']": function (event) {
    Session.set('errorMessages', '');
  },
  "submit .send-tweet": function (event) {
    event.preventDefault();
    var val = event.target.tweetBody.value;

    if (FormsCheckers.checkTweetLength(val)) {
      Meteor.call('postTweet', val);
    } else {
      Session.set('errorMessages', "Your tweet is too long");
    }
    return false;
  }
});