import { EventDate } from "../components/SeatSelection/EventDate";
import { EventContainer } from "../components/SeatSelection/EventContainer";
import { Navbar } from "../components/General/NavBar";
import { useGetEvents } from "../hooks/Events/useGetEvents";

function SeatSelection() {

  const eventId = "0LxhOXzXh8cmtgscvBWO";
  const { data, refetch } = useGetEvents(eventId);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-20">
        <Navbar />
      </div>
      <EventDate data={data} />
      <EventContainer data={data}/>
    </div>
  );
}

export default SeatSelection;
