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
      note = @$("#note").val() 
      @working_from_home @user(), note
    else
      @render_who_are_you()
    @$("#note").val("") 
      
  not_me: (e) =>
    e.preventDefault()
    @set_user null
    @render()
      
  render_who_are_you: =>
    note = @$("#note").val()
    $(@el).html(@who_are_you_template())
    @$(":text").focus()
    @$(":submit").bind("click", => 
      name = @$(":input").val()
      @set_user name
      @working_from_home name, note
      @render()
    )
      
  user: =>
    $.cookie("user")
      
  set_user: (name) =>
    $.cookie("user", name, expires: 365)
    
  working_from_home: (name, note) =>
    @model.at_home_today name, note