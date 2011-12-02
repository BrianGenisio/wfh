(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  app.models.DayAtHome = (function() {

    __extends(DayAtHome, Backbone.ParseModel);

    function DayAtHome() {
      DayAtHome.__super__.constructor.apply(this, arguments);
    }

    DayAtHome.prototype.urlRoot = "/data/DayAtHome";

    return DayAtHome;

  })();

  app.collections.DaysAtHome = (function() {

    __extends(DaysAtHome, Backbone.ParseCollection);

    function DaysAtHome() {
      this.fetch_today = __bind(this.fetch_today, this);
      this.at_home_today = __bind(this.at_home_today, this);
      DaysAtHome.__super__.constructor.apply(this, arguments);
    }

    DaysAtHome.prototype.model = app.models.DayAtHome;

    DaysAtHome.prototype.url = "/data/DayAtHome";

    DaysAtHome.prototype.start_of_today = function() {
      var now;
      now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    };

    DaysAtHome.prototype.start_of_tomorrow = function() {
      var oneDay, today;
      today = this.start_of_today();
      oneDay = 24 * 60 * 60 * 1000;
      return new Date(today.getTime() + oneDay);
    };

    DaysAtHome.prototype.at_home_today = function(name) {
      return this.create({
        name: name,
        start: this.start_of_today()
      });
    };

    DaysAtHome.prototype.fetch_today = function() {
      return this.fetch({
        query: {
          start: {
            "$gte": this.start_of_today(),
            "$lte": this.start_of_tomorrow()
          }
        }
      });
    };

    return DaysAtHome;

  })();

}).call(this);
