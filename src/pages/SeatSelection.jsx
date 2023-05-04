import { EventDate } from "../components/SeatSelection/EventDate";
import { EventContainer } from "../components/SeatSelection/EventContainer"
import { Navbar } from "../components/General/NavBar";

function SeatSelection() {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar/>
        <EventDate/>
        <EventContainer/>
      </div>
    );
  }
  
  export default SeatSelection;
  