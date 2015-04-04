Template.newTweet.helpers({
  errorMessages: function () {
    return Session.get('errorMessages');
  },

  currentHashtag: function () {
    if (Session.get('currentHashtag')) {
      return '#' + Session.get('currentHashtag') + '' ;
    } else {
      return '';
    }
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
  "change textarea[name='tweetBody']": function (event) {
    Session.set('errorMessages', '');
  },
  "submit .send-tweet": function (event, template) {
    event.preventDefault();
    var val = event.target.tweetBody.value;

    if (Session.get('currentHashtag')) {
      val = '#' + Session.get('currentHashtag') + ' ' + val;
    }

    if (FormsCheckers.checkTweetLength(val)) {
      Meteor.call('postTweet', val, function () { 
        template.$('textarea[name="tweetBody"]').val('');
      });
    } else {
      Session.set('errorMessages', "Your tweet is too long");
    }
    return false;
  }
});