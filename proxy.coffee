port = process.env.PORT || 3001
app = require('express').createServer()

serveUp = (res, filename) -> 
  console.log "REQUESTING: ", filename
  res.sendfile "#{__dirname}#{filename}"

app.get "/", (req, res) -> serveUp res, "/index.html"
app.get "/*", (req, res) -> serveUp res, req.url
   
app.listen port
console.log "Server started on #{port}"
