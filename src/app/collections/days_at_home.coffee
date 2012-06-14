#<< app/models/*

class DaysAtHome extends Parse.Collection
  model: app.models.DayAtHome

  start_of_today: ->
    now = new Date()
    new Date(now.getFullYear(), now.getMonth(), now.getDate())

  start_of_tomorrow: ->
    today = @start_of_today()
    oneDay = 24 * 60 * 60 * 1000
    new Date(today.getTime() + oneDay)

  at_home_today: (name) =>
    @create name: name, start: @start_of_today()

  today_query: () ->
    query = new Parse.Query app.models.DayAtHome
    query.greaterThanOrEqualTo "start", @start_of_today()
    query.lessThanOrEqualTo "start", @start_of_tomorrow()

  fetch_today: () =>
    IDs = (collection) -> _(collection.map (item) -> item.id)
    today = @today_query().collection()

    today.fetch success: (resp, status, xhr) => 
      today.each (entry) => @add entry unless IDs(@).include entry.id
      @each (existing) => @remove existing unless IDs(today).include existing.id
      @refresh()	

  refresh: => setTimeout @fetch_today, 30 * 1000