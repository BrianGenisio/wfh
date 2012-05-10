class app.models.UpdateHandler
  handleUpdate: (data) ->
    @[data.change](data) if @[data.change]

  post: (data) ->
    modelData = _.extend {}, data.req, data.resp
    window.model.add_unique	(modelData) if data.url == "/data/DayAtHome"

  delete: (data) ->
    id = (data.url.split '/').pop()
    item = window.model.get id
    window.model.remove item if item
    