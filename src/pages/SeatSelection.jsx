import { EventDate } from "../components/SeatSelection/EventDate";
import { EventContainer } from "../components/SeatSelection/EventContainer";
import { Navbar } from "../components/General/NavBar";
import { useGetEvents } from "../hooks/Events/useGetEvents";
import { useLocation } from 'react-router-dom';

function SeatSelection() {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const eventId = searchParams.get('param');
  const { data, refetch } = useGetEvents(eventId);
  
  return (
    <div className="min-h-screen flex flex-col">
        <div className="h-20">
          <Navbar/>
        </div>
        <EventDate data={data}  />
        <EventContainer  data={data} eventID={eventId} />
    </div>
  );
}

export default SeatSelection;
