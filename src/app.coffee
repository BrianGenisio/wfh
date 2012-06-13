#window.app =
#  routers: {}
#  models: {}
#  collections: {}
#  views: {}
#  templates: {}

$(document).ready ->
  Parse.initialize("gwvL56ITxW6OUn1cspHg8ownNkwm83DIJvVcyEXh", "1Js8WRpd9wzX2t7k0fbrhY59UZ3odXCZaa9iqp70");
  router = new app.routers.MainRouter()
  router.navigate 'home' 
  Backbone.history.start()
