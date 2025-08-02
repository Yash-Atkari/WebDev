export default function Button({ action, total, disabled }) {
    return (
        <>
            <button onClick={action} disabled={disabled}>Buy New Ticket</button>
            <span>Total = ₹{total}</span>
        </>
    );
}

