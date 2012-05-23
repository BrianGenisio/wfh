#<< parse.com

class User extends Backbone.ParseModel
  create: (username, password, options) =>
    options = options ? {}
    options.url = "/users"
    @save {username: username, password: password}, options
    
  login: (username, password, options) =>
    options = options ? {}
    options.data = 
      username: username
      password: password
      
    options.url = "/login"
    
    @fetch options