import React, { useState } from "react";
import { EventInfo } from "./EventInfo";
import { ZoneSelector } from "./ZoneSelector";
import { SectionsInfo } from "./SectionsInfo"
import { SeatSelector } from "./SeatSelector";
import { useGetSections } from "../../hooks/Events/useGetSections";
import { useGetSeats } from "../../hooks/Events/useGetSeats";

function EventContainer({data,eventID}) {

  const [showZoneSelector, setZoneSelector] = useState(true);

  // This is from seats
  const [ZoneSelected, setZoneSelected] = useState('');

  // This is from dropdown info
  const [section, setSection] = useState('A');

  const [section_number, setSection_number] = useState('');


  const eventId = eventID;


  const { data: sections, refetch: sectionsRefetch } = useGetSections(section,eventId);
  const { data: seats, refetch: seatsRefetch } = useGetSeats(section,section_number,eventId);


  const handleSeatsBySection = (event) => {
    setZoneSelector(false);
    setZoneSelected(event.target.id.toUpperCase());
    setSection_number(parseInt(event.target.id.match(/\d+/g),10))
  };

  const handleBack = () => {
    setZoneSelector(true);
  }
  return (
    <div className="flex flex-wrap">
      <div className="w-full md:w-5/12 p-6">
        {showZoneSelector ? <ZoneSelector /> : <SeatSelector seats={seats} ZoneSelected={ZoneSelected} handleBack={handleBack} />}
      </div>
      <div className="w-full md:w-4/12 ">
        <EventInfo data={data}/>
      </div>
      <div className="w-full md:w-3/12 ">
        <SectionsInfo section={section} setSection={setSection} sections={sections} handleSeatsBySection={handleSeatsBySection} />
      </div>
    </div>
  );
}
export { EventContainer };
