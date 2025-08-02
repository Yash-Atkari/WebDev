import { useState } from "react";
import "./Lottery.css";
import {genTicket, sum, genNDigitNum} from "./helper";
import Ticket from "./Ticket";
import Button from "./Button";

export default function Lottery({ n = 3, winingSum = 15, winCondition }) { // winCondition
    let [tickets, setTicket] = useState([["x", "x", "x"]]);
    let [total, setTotal] = useState(0);
    let isWining = winCondition ? winCondition(tickets[tickets.length-1]) : sum(tickets[tickets.length-1]) === winingSum; // winCondition(ticket)
    let price = genNDigitNum(Math.floor(Math.random() * 10));
    
    let buyTicket = () => {
        setTotal((prevTotal) => {
            return prevTotal + 20;
        });
        setTicket((prevTickets) => {
            return [...prevTickets, genTicket(n)];
        });
    }

    return (
        <div>
            <h1>Lottery Game!</h1>
            <Ticket tickets={tickets}/>
            <Button action={buyTicket} total={total} disabled={isWining}/>
            <p>Note: One ticket is of 20 Rs</p>
            {isWining && <h3>Congratulations, you won ₹{price}!</h3>}
        </div>
    );
}
