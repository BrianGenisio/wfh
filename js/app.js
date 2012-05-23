
var __t;

__t = function(ns, expose) {
  var curr, index, part, parts, _i, _len;
  curr = null;
  parts = [].concat = ns.split(".");
  for (index = _i = 0, _len = parts.length; _i < _len; index = ++_i) {
    part = parts[index];
    if (curr === null) {
      curr = eval(part);
      if (expose != null) {
        expose[part] = curr;
      }
      continue;
    } else {
      if (curr[part] == null) {
        curr = curr[part] = {};
        if (expose != null) {
          expose[part] = curr;
        }
      } else {
        curr = curr[part];
      }
    }
  }
  return curr;
};

var app = window.undefined = {};

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Backbone.ParseCollection = (function(_super) {

    __extends(ParseCollection, _super);

    function ParseCollection() {
      return ParseCollection.__super__.constructor.apply(this, arguments);
    }

    ParseCollection.prototype.parse = function(resp, xhr) {
      var data;
      data = ParseCollection.__super__.parse.apply(this, arguments);
      return data.results;
    };

    ParseCollection.prototype.fetch = function(options) {
      if ((options != null ? options.query : void 0) != null) {
        options.data = "where=" + JSON.stringify(options.query);
        delete options.query;
      }
      return ParseCollection.__super__.fetch.apply(this, arguments);
    };

    return ParseCollection;

  })(Backbone.Collection);

  Backbone.ParseModel = (function(_super) {

    __extends(ParseModel, _super);

    ParseModel.prototype.setId = function(data) {
      if (data) {
        if (!data.id) {
          data.id = data.objectId;
        }
      }
      return data;
    };

    function ParseModel(model) {
      this.setId(model);
      ParseModel.__super__.constructor.apply(this, arguments);
    }

    ParseModel.prototype.parse = function(resp, xhr) {
      return this.setId(ParseModel.__super__.parse.apply(this, arguments));
    };

    ParseModel.prototype.toJSON = function() {
      var result;
      result = ParseModel.__super__.toJSON.apply(this, arguments);
      delete result.createdAt;
      delete result.updatedAt;
      return result;
    };

    return ParseModel;

  })(Backbone.Model);

  __t('app.models', window).UpdateHandler = (function() {

    function UpdateHandler() {}

    UpdateHandler.prototype.handleUpdate = function(data) {
      if (this[data.change]) {
        return this[data.change](data);
      }
    };

    UpdateHandler.prototype.post = function(data) {
      var modelData;
      modelData = _.extend({}, data.req, data.resp);
      if (data.url === "/data/DayAtHome") {
        return window.model.add_unique(modelData);
      }
    };

    UpdateHandler.prototype["delete"] = function(data) {
      var id, item;
      id = (data.url.split('/')).pop();
      item = window.model.get(id);
      if (item) {
        return window.model.remove(item);
      }
    };

    return UpdateHandler;

  })();

  __t('app.models', window).User = (function(_super) {

    __extends(User, _super);

    function User() {
      this.login = __bind(this.login, this);

      this.create = __bind(this.create, this);
      return User.__super__.constructor.apply(this, arguments);
    }

    User.prototype.create = function(username, password, options) {
      options = options != null ? options : {};
      options.url = "/users";
      return this.save({
        username: username,
        password: password
      }, options);
    };

    User.prototype.login = function(username, password, options) {
      options = options != null ? options : {};
      options.data = {
        username: username,
        password: password
      };
      options.url = "/login";
      return this.fetch(options);
    };

    return User;

  })(Backbone.ParseModel);

  __t('app.models', window).DayAtHome = (function(_super) {

    __extends(DayAtHome, _super);

    function DayAtHome() {
      return DayAtHome.__super__.constructor.apply(this, arguments);
    }

    DayAtHome.prototype.urlRoot = "/data/DayAtHome";

    return DayAtHome;

  })(Backbone.ParseModel);

  __t('app.collections', window).DaysAtHome = (function(_super) {

    __extends(DaysAtHome, _super);

    function DaysAtHome() {
      this.fetch_today = __bind(this.fetch_today, this);

      this.at_home_today = __bind(this.at_home_today, this);
      return DaysAtHome.__super__.constructor.apply(this, arguments);
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

    DaysAtHome.prototype.add_unique = function(item) {
      var existing_items;
      existing_items = this.where({
        objectId: item.objectId
      });
      if (existing_items.length) {
        return;
      }
      return this.add(item);
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

  })(Backbone.ParseCollection);

  __t('app.routers', window).MainRouter = (function(_super) {

    __extends(MainRouter, _super);

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

  __t('app.templates', window).AddMe = (function() {

    function AddMe() {}

    AddMe.template = '\n<button class="btn btn-primary btn-large" id="working_from_home"><%= name ? name + " is" : "I am" %> working from home</button><br>\n<% if(name) { %><a href="#" id="not_me">(Not <%= name %>?)</a><% } %>\n';

    return AddMe;

  })();

  __t('app.templates', window).ShowRecord = (function() {

    function ShowRecord() {}

    ShowRecord.template = '\n<div class="well"><h3><%= name %><a class="close" href="#">&times;</a></h3></div>\n';

    return ShowRecord;

  })();

  __t('app.templates', window).WhoAreYou = (function() {

    function WhoAreYou() {}

    WhoAreYou.template = '\n<form class="well form-inline">\n  <input type="text" class="input-medium" placeholder="Wait. Who are you?"></input>\n  <button type="submit" class="btn">Remember Me</button>\n</form>\n';

    return WhoAreYou;

  })();

  __t('app.views', window).AddMe = (function(_super) {

    __extends(AddMe, _super);

    function AddMe() {
      this.working_from_home = __bind(this.working_from_home, this);

      this.set_user = __bind(this.set_user, this);

      this.user = __bind(this.user, this);

      this.render_who_are_you = __bind(this.render_who_are_you, this);

      this.not_me = __bind(this.not_me, this);

      this.i_am_working_from_home = __bind(this.i_am_working_from_home, this);

      this.render = __bind(this.render, this);

      this.initialize = __bind(this.initialize, this);
      return AddMe.__super__.constructor.apply(this, arguments);
    }

    AddMe.prototype.template = _.template(app.templates.AddMe.template);

    AddMe.prototype.who_are_you_template = _.template(app.templates.WhoAreYou.template);

    AddMe.prototype.events = {
      "click #working_from_home": "i_am_working_from_home",
      "click #not_me": "not_me"
    };

    AddMe.prototype.initialize = function() {
      return this.render();
    };

    AddMe.prototype.render = function() {
      $(this.el).html(this.template({
        name: this.user()
      }));
      return this;
    };

    AddMe.prototype.i_am_working_from_home = function(e) {
      e.preventDefault();
      if (this.user()) {
        return this.working_from_home(this.user());
      } else {
        return this.render_who_are_you();
      }
    };

    AddMe.prototype.not_me = function(e) {
      e.preventDefault();
      this.set_user(null);
      return this.render();
    };

    AddMe.prototype.render_who_are_you = function() {
      var _this = this;
      $(this.el).html(this.who_are_you_template());
      return this.$(":submit").bind("click", function() {
        var name;
        name = _this.$(":input").val();
        _this.set_user(name);
        _this.working_from_home(name);
        return _this.render();
      });
    };

    AddMe.prototype.user = function() {
      return $.cookie("user");
    };

    AddMe.prototype.set_user = function(name) {
      return $.cookie("user", name, {
        expires: 365
      });
    };

    AddMe.prototype.working_from_home = function(name) {
      return this.model.at_home_today(name);
    };

    return AddMe;

  })(Backbone.View);

  __t('app.views', window).ListRecords = (function(_super) {

    __extends(ListRecords, _super);

    function ListRecords() {
      this.remove_record = __bind(this.remove_record, this);

      this.render_record = __bind(this.render_record, this);

      this.render = __bind(this.render, this);
      return ListRecords.__super__.constructor.apply(this, arguments);
    }

    ListRecords.prototype.tagName = 'ul';

    ListRecords.prototype.className = "recordList unstyled";

    ListRecords.prototype.sub_views = {};

    ListRecords.prototype.initialize = function() {
      this.model.bind("reset", this.render);
      this.model.bind("add", this.render_record);
      this.model.bind("remove", this.remove_record);
      return this.render;
    };

    ListRecords.prototype.render = function() {
      $(this.el).html("");
      this.model.each(this.render_record);
      return this;
    };

    ListRecords.prototype.render_record = function(record) {
      var new_item, new_view;
      new_view = new app.views.ShowRecord({
        model: record
      });
      this.sub_views[record.id] = new_view;
      new_item = new_view.render().el;
      $(this.el).append(new_item);
      $(new_item).hide();
      return $(new_item).fadeIn();
    };

    ListRecords.prototype.remove_record = function(record) {
      var sub_view;
      if (!this.sub_views[record.id]) {
        return;
      }
      sub_view = this.sub_views[record.id];
      sub_view.go_away();
      return this.sub_views[record.id] = null;
    };

    return ListRecords;

  })(Backbone.View);

  __t('app.views', window).ShowRecord = (function(_super) {

    __extends(ShowRecord, _super);

    function ShowRecord() {
      this.go_away = __bind(this.go_away, this);

      this.remove = __bind(this.remove, this);

      this.render = __bind(this.render, this);
      return ShowRecord.__super__.constructor.apply(this, arguments);
    }

    ShowRecord.prototype.tagName = 'li';

    ShowRecord.prototype.template = _.template(app.templates.ShowRecord.template);

    ShowRecord.prototype.events = {
      "click a": "remove"
    };

    ShowRecord.prototype.initialize = function() {
      return this.model.bind("change", this.render);
    };

    ShowRecord.prototype.render = function() {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    };

    ShowRecord.prototype.remove = function() {
      var _this = this;
      this.model.destroy({
        success: function() {
          return _this.model.unbind();
        }
      });
      return this.go_away();
    };

    ShowRecord.prototype.go_away = function() {
      return $(this.el).fadeOut();
    };

    return ShowRecord;

  })(Backbone.View);

  $(document).ready(function() {
    var router;
    router = new app.routers.MainRouter();
    router.navigate('home');
    Backbone.history.start();
    return io.connect(document.location.origin, {
      transports: ["xhr-polling"]
    }).on('news', function(data) {
      return (new app.models.UpdateHandler()).handleUpdate(data);
    });
  });

}).call(this);
