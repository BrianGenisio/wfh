class MainRouter extends Backbone.Router
  routes :
    "": "home"

  home: ->
    window.model = new app.collections.DaysAtHome();
    view = new app.views.ListRecords(model: window.model);
    $(".list_of_records").html(view.render().el)
    new app.views.AddMe(model: model, el: $(".add_me"))
    model.fetch_today()