
$(document).ready ->
  Parse.initialize("pXv2I7O7RiDDiN00VKNXON2BYg8JoIMsBT6S33mQ", "uMgQTOm3W9sztmCDiFH7kxhw5hzVUii6iWmeFuTc");
  router = new app.routers.MainRouter()
  router.navigate 'home' 
  Backbone.history.start()
