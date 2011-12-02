(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

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
    return Backbone.history.start();
  });

  app.routers.MainRouter = (function() {

    __extends(MainRouter, Backbone.Router);

    function MainRouter() {
      MainRouter.__super__.constructor.apply(this, arguments);
    }

    MainRouter.prototype.routes = {
      "home": "home"
    };

    MainRouter.prototype.home = function() {
      var model, view;
      model = new app.collections.DaysAtHome();
      view = new app.views.ListRecords({
        model: model
      });
      $(".list_of_records").html(view.render().el);
      new app.views.AddMe({
        model: model,
        el: $(".add_me")
      });
      return model.fetch_today();
    };

    return MainRouter;

  })();

}).call(this);
