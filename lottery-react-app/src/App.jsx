import './App.css';
import Lottery from "./Lottery2";
import {sum} from "./helper";

function App() {
  let winCondition = (ticket) => {
    // return sum(ticket);
    // return ticket.every((num) => num === ticket[0]); 
    return ticket[0] === 0; // we can change winning condition
  }

  return (
    <>
      <Lottery n={3} winingSum={15} winCondition={winCondition}/>
    </>
  );
}

export default App;
