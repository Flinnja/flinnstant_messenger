var express = require('express')
var app = express()
var http = require('http').Server(app)
var path = require('path')
var io = require('socket.io')(http)
var synonym = require('./src/wordReplacer.js')

console.log(synonym('test'))

app.use(express.static('public'))
app.set('views', path.join(__dirname,'public/views'))
app.set('view engine', 'ejs')

app.get('/', function(req, res){
  res.render('index', {title: 'flinnstant messenger'})
})

io.on('connection', function(socket){
  socket.on('chat message', function(usr,txt,bg,msg){
    console.log(usr+': '+msg)
    enhancedMsg = enhance(msg)
    io.emit('syno message', usr, txt, bg, enhancedMsg)
  });
});

function enhance(msg){
	words = msg.split(' ')
	enhanced = ''
	for(var i = 0; i<words.length; i++){
		enhanced += wordReplacer.synonym(words[i])+' '
	}
	return enhanced
}

http.listen(3000,function(){
  console.log('server for flinnstant messenger is listening on localhost:3000')
})
