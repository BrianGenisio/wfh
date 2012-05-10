
express = require 'express'
restler = require 'restler'
url = require 'url'
config = require './config'

app = express.createServer()
io = require('socket.io').listen app

app.use express.bodyParser()

io.sockets.on 'connection', (socket) -> {}

proxy_to = (url, req, res) ->
  data = JSON.stringify(req.body)

  restOptions =
    username:  config.applicationID
    password:  config.masterKey
    data:      data
    method:    req.method.toLowerCase()
    headers:
      'Content-Type':  'application/json'
      'Content-Length': data?.length || 0
  
  complete = (data, parse_res) => 
    console.log "COMPLETE: ", data
    data = JSON.parse data 
    method = req.method.toLowerCase()
    res.json data, parse_res.statusCode
    io.sockets.emit 'news', {change: method, url: req.url, req: req.body, resp: data}  if method != "get" 
  
  error = (data, res) =>
    console.log "FAILURE: ", data, res
  
  restler.request(url, restOptions)
    .on("complete", complete)
    .on("error", error)

# Routing Rules
app.get "/", (req, res) =>
  res.sendfile "#{__dirname}/index.html"

app.post "/users", (req, res) =>
  console.log "USER: ", req.url, req.body
  proxy_to "https://api.parse.com/1/users", req, res

app.get "/login", (req, res) =>
  console.log "LOGIN: ", req.url, req.body
  query = url.parse(req.url, false).query
  proxy_to "https://api.parse.com/1/login?#{query}", req, res

app.all "#{config.apiPath}*", (req, res) => 
  console.log "REQUEST: ", req.url, req.body || "no body"
  proxy_to "https://api.parse.com/1/classes/#{req.url.replace(config.apiPath, '')}", req, res
    
app.get "/*", (req, res) =>
  console.log "REQUESTING: ", req.url
  res.sendfile "#{__dirname}#{req.url}"
   
# Start the server 
port = process.env.PORT || config.port
app.listen port

console.log "Server started on #{port}"
