var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log("connected to the server.");
});

socket.on('disconnect', function() {
    console.log("connection to the server lost.");
});

socket.on('actualState', function(msg) {
    label.text(msg.actual);
});

$('button').on('click', function() {
    socket.emit('nextTicket', null, function(nextTicket) {
        label.text(nextTicket);
    });
});