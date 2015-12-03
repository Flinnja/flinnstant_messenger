var express = require('express')
var app = express()
var http = require('http').Server(app)
var path = require('path')

app.use(express.static('public'))
app.set('views', path.join(__dirname,'public/views'))
app.set('view engine', 'ejs')

app.get('/', function(req, res){
  res.render('index', {title: 'flinnstant messenger'})
})

http.listen(3000,function(){
  console.log('server for flinnstant messenger is listening on localhost:3000')
})
