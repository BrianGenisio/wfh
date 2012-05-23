#<< app/templates/*

class ListRecords extends Backbone.View
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