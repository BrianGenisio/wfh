class app.models.User extends Backbone.ParseModel
  create: (username, password) =>
    @save {username: username, password: password}, {url: "/users"}
    
  login: (username, password) =>
    @fetch {data: {username: username, password: password}, url: "/login"}