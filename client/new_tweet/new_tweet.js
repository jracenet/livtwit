Template.newTweet.helpers({
  errorMessages: function () {
    return Session.get('errorMessages');
  },

  currentHashtag: function () {
    return Session.get('currentHashtag');
  },

  tweetTextMaxLength: function () {
    if (!Session.get('currentHashtag')) {
      return 140;
    } else {
      // '2 +' because of the "#" and space chars
      return 140 - (2 + Session.get('currentHashtag').length);
    }
  }
});

Template.newTweet.events({
  "change input[name='tweetBody']": function (event) {
    Session.set('errorMessages', '');
  },
  "submit .send-tweet": function (event) {
    event.preventDefault();
    var val = event.target.tweetBody.value;

    if (Session.get('currentHashtag')) {
      val = '#' + Session.get('currentHashtag') + ' ' + val;
    }
    
    if (FormsCheckers.checkTweetLength(val)) {
      Meteor.call('postTweet', val);
    } else {
      Session.set('errorMessages', "Your tweet is too long");
    }
    return false;
  }
});