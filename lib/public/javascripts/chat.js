function getUsername(path, method, data, successcallback){
    $.ajax({
        type: method,
        url: "http://localhost:3000/"+path,
        data: data,
        dataType: 'JSON',
        cache: false,
        success: successcallback
    });
}

$(document).ready(function() {
    var socket = io();
    var ready;
    var name;

    $('form').submit(function(event) {
        event.preventDefault();
    });

    getUsername("getusername", "GET", null, function(data){
        name = data.username;
        socket.emit("join", name);
        $('#message').focus();
        ready = true;
    });

    $('#name').keypress(function(e) {
        if(e.which == 13) {
            var name = $('#name').val();
            if (name != "") {
                socket.emit('join', name);
                ready = true;
                $('#message').focus();
            }
        }
    });

    socket.on('update', function(message) {
        if(ready){
            $("#message").append(" " + message + " ");
        }
    });

    socket.on('update-people', function(people) {
        if(ready) {
            $('#people').empty();
            $.each(people, function(clientid, name) {
                $('#people').append("<li id='"+name+"'>"+name+"</li>");
            });
        }
    });

    socket.on('add-person', function(name) {
        if(ready) {
            $('#people').append("<li id='"+name+"'>"+name+"</li>");
        }
    });

    socket.on('remove-person', function(name) {
        if(ready) {
            document.getElementById(name).remove();
        }
    });

    socket.on('disconnect', function() {
        getUsername("getusername", "GET", null, function(data){
            $('#messages').append("The server is not available");
            $('#message').attr("disabled", "disabled");
            $('#send').attr("disabled", "disabled");
        });
    });

    $('#send').click(function() {
        var message = $('#message').val();
        socket.emit('send', $("#target").val(),message);
        $('#message').val("");
        $('#messages').append("<li id='message-post' ><strong><span class='text-success'>" + name
            + "</span></strong> says: " + message + " to " + $("#target").val() + "</li>");
    });

    $('#message').keypress(function(e) {
        if(e.which == 13) {
            var message = $('#message').val();
            socket.emit('send', $("#target").val(),message);
            $('#message').val("");
            $('#messages').append("<li id='message-post' ><strong><span class='text-success'>" + name
                + "</span></strong> says: " + message + " to " + $("#target").val() + "</li>");
        }
    });

    socket.on('chat', function(who, message) {
        $('#messages').append("<li id='message-post' ><strong><span class='text-success'>" + who + "</span></strong> says: " + message + "</li>");
    });
});