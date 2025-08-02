import { useState } from "react";

function init() {
    console.log("init was executed");
    return Math.random();
}

export default function Counter() {
    let [count, setCount] = useState(init); // initialization
    console.log("component is rendered");

    function incCount() {
        setCount((currCount) => {
            return currCount + 1;
        });
        setCount((currCount) => {
            return currCount + 1;
        });
        console.log(`inside incCount, count = ${count}`);
    }

    return (
        <div>
            <h3>Count = {count}</h3>
            <button onClick={incCount}>Increase Count</button>
        </div>
    );
}
