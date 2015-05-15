Template.flashNotifications.helpers({
  items: function() {
    return lookup('FlashNotifications', this).find();
  }
});

Template._flashNotificationsItem.events({
  'click': function(e, t) {
    if (! this.pinned)
      lookup('FlashNotifications', t.data).remove({_id: this._id});
  },
  'click [data-action]': function() {
    if (this.onclick)
      this.onclick(this);
  }
});

Template.flashNotifications.tests = {
  _collection: new FlashNotificationCollection,
  basic: function() {
    var self = this;

    var data = [
      {
        title: 'Blocked',
        description: 'George Halpert',
        pinned: true, feeling: 'negative', icon: 'flag',
        actionLink: {
          classes: 'undo inverse',
          onclick: function() {
            alert('clicked');
          },
          text: 'Undo'
        }
      },
      {
        title: 'Invited',
        description: '20 students were invited',
        pinned: true, feeling: 'positive', icon: 'email'
      },
      {
        title: 'Update now',
        description: 'Don\'t forget to save your work',
        pinned: true, feeling: 'neutral', icon: 'download', actionLink: {
          classes: 'undo inverse',
          text: 'Update'
        }
      },
      {
        title: 'Connecting',
        description: 'Test: Trying to connect to server',
        pinned: true, feeling: 'neutral', icon: 'sync'
      }
    ]

    _.each(data, function(d) {
      self._collection.add(d);
    });

    return {
      FlashNotifications: self._collection
    }
  }
}

