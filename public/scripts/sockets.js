function setupSocket(){
  var socket = io();

  $('form').submit(function(){
    socket.emit('chat message', $('#user').val(), $('#text_colour').val(), $('#bg_colour').val(), $('#message').val())
    $('#message').val('')
    return false
  })

  socket.on('syno message', function(usr,txt,bg,msg){
    if(usr){
      $('#messages').append($('<li>').text(usr+': '+msg).css('color',txt).css('background-color',bg))
    }
    else{
      $('#messages').append($('<li>').text('Anon: '+msg).css('color',txt).css('background-color',bg))
    }
  })
}
