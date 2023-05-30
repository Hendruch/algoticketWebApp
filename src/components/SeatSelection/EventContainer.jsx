import React, { useState } from "react";
import { EventInfo } from "./EventInfo";
import { ZoneSelector } from "./ZoneSelector";
import { SectionsInfo } from "./SectionsInfo"
import { SeatSelector } from "./SeatSelector";

function EventContainer({data}) {

  const [showZoneSelector, setZoneSelector] = useState(true);
  const [ZoneSelected, setZoneSelected] = useState("");

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
        <SectionsInfo handleSeatsBySection={handleSeatsBySection} />
      </div>
    </div>
  );
}
export { EventContainer };
