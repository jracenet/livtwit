Template.defineTweetTemplate.events({
  'change #tweet-template input[name="pattern"]': function (event) {
    return Session.set('currentHashtag', event.target.value)
  }
});