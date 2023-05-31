import React, { useState } from "react";
import { EventInfo } from "./EventInfo";
import { ZoneSelector } from "./ZoneSelector";
import { SectionsInfo } from "./SectionsInfo"
import { SeatSelector } from "./SeatSelector";
import { useGetSections } from "../../hooks/Events/useGetSections";

function EventContainer({data}) {

  const [showZoneSelector, setZoneSelector] = useState(true);

  // This is from seats
  const [ZoneSelected, setZoneSelected] = useState('');

  // This is from dropdown info
  const [section, setSection] = useState('A');

  const eventId = "0LxhOXzXh8cmtgscvBWO";
  const { data: sections, refetch: sectconionsRefetch } = useGetSections(section,eventId);

  const handleSeatsBySection = (event) => {
    setZoneSelector(false);
    setZoneSelected(event.target.id.toUpperCase());
  };

  const handleBack = () => {
    setZoneSelector(true);
  }
  return (
    <div className="flex flex-wrap">
      <div className="w-full md:w-5/12 p-6">
        {showZoneSelector ? <ZoneSelector /> : <SeatSelector ZoneSelected={ZoneSelected} handleBack={handleBack} />}
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
