import { useEffect } from "react";
import { mockEvents } from "../../assets/mock-events";
import { EVENT_HOURS_ARR, getEventsByDay } from "../../handlers/dateTimeHandlers";
import { useEventStore } from "../../store/event-store";
import CalendarHour from "./CalendarHour";

function CalendarDay({ day }) {
  const schedule = useEventStore((state) => state.events);

  const HOURS = EVENT_HOURS_ARR;

  return (
    <>
      <div className="">
        <h2 className="border fixed w-full bg-neutral z-50 text-neutral-content top-0">
          {day.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </h2>
        <div className="flex flex-col overflow-visible">
          {HOURS.map((hour, i) => {
            return (
              <div key={"hour" + day + ":" + hour}>
                <CalendarHour hour={hour} day={day} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default CalendarDay;
