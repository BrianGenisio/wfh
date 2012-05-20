window.app =
  routers: {}
  models: {}
  collections: {}
  views: {}
  templates: {}

$(document).ready ->
  router = new app.routers.MainRouter()
  router.navigate 'home' 
  Backbone.history.start()
  io.connect(document.location.origin, {transports:["xhr-polling"]}).on 'news',  (data) -> (new app.models.UpdateHandler()).handleUpdate data

class app.routers.MainRouter extends Backbone.Router
  routes :
    "": "home"

  home: ->
    window.model = new app.collections.DaysAtHome();
    view = new app.views.ListRecords(model: window.model);
    $(".list_of_records").html(view.render().el)
    new app.views.AddMe(model: model, el: $(".add_me"))
    model.fetch_today()