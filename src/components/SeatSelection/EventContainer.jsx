import React, { useState } from "react";
import { EventInfo } from "./EventInfo";
import { ZoneSelector } from "./ZoneSelector";
import { SectionsInfo } from "./SectionsInfo"
import { SeatSelector } from "./SeatSelector";

function EventContainer() {

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
    <div className="flex flex-grow">
      <div className=" w-5/12 p-6">
        {showZoneSelector ?
          (<ZoneSelector />) : (<SeatSelector ZoneSelected={ZoneSelected} handleBack={handleBack} />)
        }
      </div>
      <div className="w-4/12">
        <EventInfo />
      </div>
      <div className="flex justify-center w-3/12 h-auto shadow shadow-left-xl">
        <SectionsInfo handleSeatsBySection={handleSeatsBySection} />
      </div>
    </div>
  );
}
export { EventContainer };
