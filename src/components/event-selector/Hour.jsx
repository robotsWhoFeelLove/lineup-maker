import { useEffect, useState } from "react";
import Event from "./Event";
import { events } from "../../assets/events";
import { useEventStore } from "../../store/event-store";
import { getEventsByDayAndHour } from "../../handlers/dateTimeHandlers";

function Hour({ day, hour, currentHour, setCurrentHour }) {
  const dayWidth = useEventStore((state) => state.dayWidth);
  return (
    <>
      {events.length > 0 && (
        <div
          onClick={() => {
            setCurrentHour(hour);
          }}
          className={
            "animate-fade-up collapse collapse-arrow bg-base-300 text-base-content outline " + (currentHour == hour ? " collapse-open " : "")
          }
        >
          {/* <input type="radio" name="my-accordion-2" defaultChecked /> */}
          <div className="collapse-title text-3xl text-base-content font-medium">
            {String(hour) + (hour < 12 && hour > 1 ? " PM" : " AM")}
            {/* {events[0].DateTime.toLocaleString("en-US", {
              hour: "numeric",
            })} */}
          </div>
          <div className="collapse-content flex flex-col gap-2">
            {getEventsByDayAndHour(day, hour, events).map((event, i) => {
              return <Event key={event.Name + i} event={event}></Event>;
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default Hour;
