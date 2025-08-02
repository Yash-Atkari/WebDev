import { useState } from "react";
import "./Lottery.css";
import {genNDigits, sum} from "./helper";

export default function Lottery() {
    let [ticket, setTicket] = useState([0, 0, 0]);
    let isWining = sum(ticket) === 15;

    let buyTicket = () => {
        setTicket(genNDigits(3));
    }

    return (
        <div>
            <h1>Lottery Game!</h1>
            <div className="ticket">
                <span>{ticket[0]}</span>
                <span>{ticket[1]}</span>
                <span>{ticket[2]}</span>
            </div>
            <button onClick={buyTicket}>Buy New Ticket</button>
            {isWining && <h3>Congratulations, you won!</h3>}
        </div>
    );
}

