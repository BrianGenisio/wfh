port = process.env.PORT || 3001

express = require 'express'

app = express.createServer()
app.use express.bodyParser()

# Routing Rules
app.get "/", (req, res) =>
  res.sendfile "#{__dirname}/index.html"
    
app.get "/*", (req, res) =>
  console.log "REQUESTING: ", req.url
  res.sendfile "#{__dirname}#{req.url}"
   
# Start the server 
app.listen port

console.log "Server started on #{port}"
