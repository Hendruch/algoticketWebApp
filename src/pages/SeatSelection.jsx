import { EventDate } from "../components/SeatSelection/EventDate";
import { EventContainer } from "../components/SeatSelection/EventContainer";
import { Navbar } from "../components/General/NavBar";
import { useGetEvents } from "../hooks/Events/useGetEvents";
import { useGetSections } from "../hooks/Events/useGetSections";

function SeatSelection() {
  const eventId = "0LxhOXzXh8cmtgscvBWO";
  const seccion = "B1";
  const { data, refetch } = useGetEvents(eventId);
  const { data: sections, refetch: sectconionsRefetch } = useGetSections(seccion,eventId);


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
