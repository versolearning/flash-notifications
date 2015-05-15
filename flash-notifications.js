FlashNotificationCollection = function() {
  Meteor.Collection.call(this, null);
};

FlashNotificationCollection.prototype = new Meteor.Collection(null);

FlashNotificationCollection.prototype.add = function(data) {
  var self = this;
  
  // defaults
  data.pinned = !! data.pinned;
  data.timeout = data.timeout || 3000;

  // XXX: Figure out a pattern for validating enums like feeling
  check(data, {
    title: String,
    description: String,
    feeling: String, //One of: 'negative', 'positive', 'neutral'
    icon: String,
    pinned: Boolean,
    timeout: Number,
    // XXX: not sure if this is the right way to do it or use a template or
    // html string??
    actionLink: Match.Optional({
      text: String,
      classes: Match.Optional(String),
      href: Match.Optional(String),
      onclick: Match.Optional(Function)
    })
  });

  var res = this.upsert(data, data);

  if (! data.pinned) {
    Meteor.setTimeout(function() {
      self.remove(res.insertedId);
    }, data.timeout);
  }

  return res;
};

FlashNotifications = new FlashNotificationCollection;

