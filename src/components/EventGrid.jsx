import { getDaysFromArr } from "../handlers/dateTimeHandlers";
import { useEventStore } from "../store/event-store";
import GridSchedule from "./grid-calendar/GridSchedule";

function EventGrid() {
  const currentDay = useEventStore((state) => state.currentDay);
  const schedule = useEventStore((state) => state.events);

  return (
    <>
      <div className="md:hidden">
        <GridSchedule day={currentDay} />
      </div>
      <div className="hidden md:flex ">
        {getDaysFromArr(schedule).map((day) => {
          return <GridSchedule key={"grid-schedule-" + day.getDay()} day={day} />;
        })}
      </div>
    </>
  );
}

export default EventGrid;
