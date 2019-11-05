var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblDesktop1 = $('#lblDesktop1');
var lblDesktop2 = $('#lblDesktop2');
var lblDesktop3 = $('#lblDesktop3');
var lblDesktop4 = $('#lblDesktop4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblDesktops = [lblDesktop1, lblDesktop2, lblDesktop3, lblDesktop4];

socket.on('connect', function() {
    console.log("connected to the server.");
});

socket.on('disconnect', function() {
    console.log("connection to the server lost.");
});

socket.on('actualState', function(data) {
    updateHTML(data.lastTickets);
});

socket.on('lastTickets', function(data) {
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    updateHTML(data.lastTickets);
});

function updateHTML(last) {
    for (var i = 0; i < last.length; i++) {
        lblTickets[i].text('Ticket ' + last[i].number);
        lblDesktops[i].text('Desktop ' + last[i].desktop);
    }
}