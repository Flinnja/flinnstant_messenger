function setupSocket(){
  var socket = io();

  $('form').submit(function(){
    socket.emit('chat message', $('#user').val(), $('#message').val())
    $('#message').val('')
    return false
  })

  socket.on('syno message', function(usr,msg){
    if(usr){
      $('#messages').append($('<li>').text(usr+': '+msg))
    }
    else{
      $('#messages').append($('<li>').text('Anon: '+msg))
    }
  })
}
