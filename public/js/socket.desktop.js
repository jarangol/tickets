var socket = io();

socket.on('connect', function() {
    console.log("connected to the server.");
});

socket.on('disconnect', function() {
    console.log("connection to the server lost.");
});

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('Desktop is required')
}

var desktop = searchParams.get('escritorio');
var label = $('small');

$('h1').text('Desktop ' + desktop);

$('button').on('click', function() {

    socket.emit('attendTicket', { desktop: desktop }, function(resp) {

        if (resp === "There isn't tickets") {
            label.text(resp);
            alert(resp);
        }
        label.text('Ticket ' + resp.number);
    });
})