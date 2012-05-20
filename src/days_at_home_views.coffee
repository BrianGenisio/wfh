app.templates.add_me = '''

<button class="btn btn-primary btn-large" id="working_from_home"><%= name ? name + " is" : "I am" %> working from home</button><br>
<% if(name) { %><a href="#" id="not_me">(Not <%= name %>?)</a><% } %>

'''

app.templates.show_record = '''

<div class="well"><h3><%= name %><a class="close" href="#">&times;</a></h3></div>

'''

app.templates.who_are_you = '''

<form class="well form-inline">
  <input type="text" class="input-medium" placeholder="Wait. Who are you?"></input>
  <button type="submit" class="btn">Remember Me</button>
</form>

'''





class app.views.AddMe extends Backbone.View  
  template: _.template app.templates.add_me
  who_are_you_template: _.template app.templates.who_are_you

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
    
    
    
    
    
class app.views.ListRecords extends Backbone.View
  tagName: 'ul'
  className: "recordList unstyled"
  sub_views: {}

  initialize: ->
    @model.bind "reset", @render
    @model.bind "add", @render_record
    @model.bind "remove", @remove_record
    @render

  render: =>
    $(@el).html("")
    @model.each(@render_record)
    this

  render_record: (record) =>
    new_view = new app.views.ShowRecord(model: record)
    @sub_views[record.id] = new_view
    new_item = new_view.render().el
    $(@el).append(new_item)
    $(new_item).hide()
    $(new_item).fadeIn()

  remove_record: (record) =>
    return unless @sub_views[record.id]
    sub_view = @sub_views[record.id]
    sub_view.go_away()
    @sub_views[record.id] = null
    
    
    
class app.views.ShowRecord extends Backbone.View
  tagName: 'li'
  template: _.template app.templates.show_record

  events: 
    "click a": "remove"

  initialize: ->
    @model.bind("change", @render)

  render: =>
    $(@el).html(@template(@model.toJSON()))
    this

  remove: =>
    @model.destroy(success: => @model.unbind())
    @go_away()

  go_away: =>
    $(@el).fadeOut()