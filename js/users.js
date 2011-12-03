(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  app.models.User = (function() {

    __extends(User, Backbone.ParseModel);

    function User() {
      this.login = __bind(this.login, this);
      this.create = __bind(this.create, this);
      User.__super__.constructor.apply(this, arguments);
    }

    User.prototype.create = function(username, password) {
      return this.save({
        username: username,
        password: password
      }, {
        url: "/users"
      });
    };

    User.prototype.login = function(username, password) {
      return this.fetch({
        data: {
          username: username,
          password: password
        },
        url: "/login"
      });
    };

    return User;

  })();

}).call(this);
