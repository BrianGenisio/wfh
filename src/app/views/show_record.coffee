#<< app/templates/*

class ShowRecord extends Backbone.View
  tagName: 'li'
  template: _.template app.templates.ShowRecord.template

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