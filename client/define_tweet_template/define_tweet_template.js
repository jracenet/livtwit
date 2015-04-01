Template.defineTweetTemplate.events({
  'change #tweet-template input[name="pattern"]': function (event) {
    return Session.set('tweetTemplate', event.target.value)
  }
});