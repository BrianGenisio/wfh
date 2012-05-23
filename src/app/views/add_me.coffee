#<< app/templates/*

class AddMe extends Backbone.View  
  template: _.template app.templates.AddMe.template
  who_are_you_template: _.template app.templates.WhoAreYou.template

  events:
    "click #working_from_home": "i_am_working_from_home"
    "click #not_me": "not_me"
  
  initialize: => 
    @render()
    
  render: =>
    $(@el).html(@template({name: @user()}))
    this
    
  i_am_working_from_home: (e) =>
    e.preventDefault()
    if @user()
      @working_from_home @user()
    else
      @render_who_are_you()
      
  not_me: (e) =>
    e.preventDefault()
    @set_user null
    @render()
      
  render_who_are_you: =>
    $(@el).html(@who_are_you_template())
    @$(":submit").bind("click", => 
      name = @$(":input").val()
      @set_user name
      @working_from_home name
      @render()
    )
      
  user: =>
    $.cookie("user")
      
  set_user: (name) =>
    $.cookie("user", name, expires: 365)
    
  working_from_home: (name) =>
    @model.at_home_today name