const fs = require('fs');

class Ticket {
    constructor(number, desktop) {
        this.number = number;
        this.desktop = desktop;
    }
}

class TicketControl {
    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.lastTickets = [];

        let data = require('../data/data.json');

        if (data.today === this.today) {
            this.last = data.last;
            this.tickets = data.tickets;
            this.lastTickets = data.lastTickets;
        } else {
            this.resetCount();
        }

    }

    nextTicket() {
        this.last += 1;
        const ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);
        this.saveFile();

        return `Ticket ${this.last}`;
    }

    getLastTicket() {
        return `Ticket ${this.last}`;
    }

    getLastTickets() {
        return this.lastTickets;
    }

    attendTicket(desktop) {
        if (this.tickets.length === 0) {
            return "There isn't tickets";
        }

        let ticketNumber = this.tickets[0].number;
        this.tickets.shift();

        let attendTicket = new Ticket(ticketNumber, desktop);
        this.lastTickets.unshift(attendTicket);

        if (this.lastTickets.length > 4) {
            this.lastTickets.splice(-1, 1); //drop the last one
        }

        console.log(`Last tickets:`, this.lastTickets);

        this.saveFile();

        return attendTicket;
    }

    resetCount() {
        this.last = 0;
        console.log("The system has been initialized.");
        this.saveFile();
    }

    saveFile() {
        let jsonData = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            lastTickets: this.lastTickets
        }

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);
        console.log("File saved.");
    }

}

module.exports = {
    TicketControl
}