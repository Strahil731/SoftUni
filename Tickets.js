function tickets(data, criterion) {
    let result = [];

    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = Number(price);
            this.status = status;
        }
    }

    for (const el of data) {
        let [destination, price, status] = el.split('|');

        let myTicket = new Ticket(destination, price, status);
        result.push(myTicket);
    }

    switch (criterion) {
        case "destination":
            result.sort((a, b) => a.destination.localeCompare(b.destination));
            break;

        case "price":
            result.sort((a, b) => a.price - b.price);
            break;

        case "status":
            result.sort((a, b) => a.status.localeCompare(b.status));
            break;
    }

    console.log(result);
}

tickets(
    [
        'Philadelphia|94.20|available',
        'New York City|95.99|available',
        'New York City|95.99|sold',
        'Boston|126.20|departed'
    ],
    'destination'
)