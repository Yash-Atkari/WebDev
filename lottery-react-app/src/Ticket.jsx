import TicketNum from "./TicketNum";
import "./Ticket.css";

export default function Ticket({ tickets }) {
    return (
        <div>
            {tickets.map((ticket, ticketIdx) => (
                    <div className="Ticket" key={ticketIdx}>
                        <p>Ticket</p>
                        {ticket.map((num, numIdx) => (
                                <TicketNum num={num} key={numIdx}/>
                        ))}
                        <p className="Price">₹20</p>
                    </div>
            ))}
        </div>
    );
}

