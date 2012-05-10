// Generated by CoffeeScript 1.3.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  window.app = {
    routers: {},
    models: {},
    collections: {},
    views: {},
    templates: {}
  };

  $(document).ready(function() {
    var router;
    router = new app.routers.MainRouter();
    router.navigate('home');
    Backbone.history.start();
    return io.connect(document.location.origin).on('news', function(data) {
      return (new app.models.UpdateHandler()).handleUpdate(data);
    });
  });

  app.routers.MainRouter = (function(_super) {

    __extends(MainRouter, _super);

    MainRouter.name = 'MainRouter';

    function MainRouter() {
      return MainRouter.__super__.constructor.apply(this, arguments);
    }

    MainRouter.prototype.routes = {
      "": "home"
    };

    MainRouter.prototype.home = function() {
      var view;
      window.model = new app.collections.DaysAtHome();
      view = new app.views.ListRecords({
        model: window.model
      });
      $(".list_of_records").html(view.render().el);
      new app.views.AddMe({
        model: model,
        el: $(".add_me")
      });
      return model.fetch_today();
    };

    return MainRouter;

  })(Backbone.Router);

}).call(this);
