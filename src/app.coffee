
$(document).ready ->
  #Parse.initialize("gwvL56ITxW6OUn1cspHg8ownNkwm83DIJvVcyEXh", "1Js8WRpd9wzX2t7k0fbrhY59UZ3odXCZaa9iqp70"); # development
  Parse.initialize("pXv2I7O7RiDDiN00VKNXON2BYg8JoIMsBT6S33mQ", "uMgQTOm3W9sztmCDiFH7kxhw5hzVUii6iWmeFuTc"); # production
  router = new app.routers.MainRouter()
  router.navigate 'home' 
  Backbone.history.start()
