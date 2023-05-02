
import { EventDate } from "../components/SeatSelection/EventDate";
import { EventContainer } from "../components/SeatSelection/EventContainer"
function SeatSelection() {
    return (
      // <div className="min-h-screen flex flex-col">
      <div className="min-h-screen flex flex-col">
        <EventDate/>
        <EventContainer/>
      </div>
    );
  }
  
  export default SeatSelection;
  