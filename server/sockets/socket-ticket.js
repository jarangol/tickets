const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {
    client.on('nextTicket', (data, callback) => {
        const nextTicket = ticketControl.nextTicket();
        callback(nextTicket);
    });

    client.emit('actualState', {
        actual: ticketControl.getLastTicket(),
        lastTickets: ticketControl.getLastTickets()
    });

    client.on('attendTicket', (data, callback) => {
        if (!data.desktop) {
            return callback({
                err: true,
                msg: `The desktop is required.`
            });
        }

        const attendTicket = ticketControl.attendTicket(data.desktop);
        callback(attendTicket);

        client.broadcast.emit('lastTickets', {
            lastTickets: ticketControl.getLastTickets()
        });
    })
});