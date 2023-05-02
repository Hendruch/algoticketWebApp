import { EventInfo } from "./EventInfo";
import { SeatSelector } from "./SeatSelector";
import { SectionsInfo } from "./SectionsInfo"

function EventContainer() {
  return (
    <div style={{height:'549px'}} className="flex flex-grow">
      <div className=" w-5/12 p-6">
        <SeatSelector/>
      </div>
      <div className="w-4/12">
        <EventInfo/>
      </div>
      <div className="flex justify-center w-3/12 h-auto overflow-auto shadow shadow-left-xl">
        <SectionsInfo/>
      </div>
    </div>
  );
}
export { EventContainer };
