#window.app =
#  routers: {}
#  models: {}
#  collections: {}
#  views: {}
#  templates: {}

$(document).ready ->
  router = new app.routers.MainRouter()
  router.navigate 'home' 
  Backbone.history.start()
  io.connect(document.location.origin, {transports:["xhr-polling"]}).on 'news',  (data) -> (new app.models.UpdateHandler()).handleUpdate data
