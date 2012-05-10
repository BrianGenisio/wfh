class app.models.UpdateHandler
  handleUpdate: (data) ->
    @[data.change](data) if @[data.change]

  post: (data) ->
    console.log "POST"
    modelData = _.extend {}, data.req, data.resp
    console.log modelData
    window.model.add_unique	(modelData) if data.url == "/data/DayAtHome"

  delete: (data) ->
    console.log "DELETE"