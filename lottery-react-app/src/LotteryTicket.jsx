import { useState } from "react";

export default function LotteryTicket() {
    let [ticket, setTicket] = useState(100);

    let generateTicket = () => {
        let newTicket = Math.floor(Math.random() * 900) + 100;
        setTicket(newTicket);
    }

    let sum = (ticket) => {
        let sum = 0;
        while(ticket > 0) {
            let lastDigit = ticket % 10;
            sum += lastDigit;
            ticket /= 10;
        }
        return sum;
    }

    return (
        <div>
            {sum(ticket) == 15 ? <h1>Congratulation, You won Lottery</h1> : <h1>Lottery Game</h1>}
            <p>Ticket: {ticket}</p>
            <button onClick={generateTicket}>Generate Ticket</button>
        </div>
    );
}

