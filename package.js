Package.describe({
  summary: "In app notifications (flash)"
});

Package.on_use(function (api) {
  api.use(['ui', 'templating', 'underscore', 'check'], 'client');
  api.add_files([
    'flash-notifications.js', 'flash-notifications-ui.html', 
    'flash-notifications-ui.js'
  ], 'client');
  api.export(['FlashNotifications', 'FlashNotificationCollection'], 'client');
});
