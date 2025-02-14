import { useEffect } from "react";
import { useEventStore } from "../../store/event-store";
import { getDays, getEventsByDayAndHour } from "../../handlers/dateTimeHandlers";

function CalendarEvents({ day, hour }) {
  const dayWidth = useEventStore((state) => state.dayWidth);
  // console.log({ dayWidth });
  const DAY_WIDTH = window.innerWidth < 500 ? window.innerWidth : (window.innerWidth - 65) / getDays().length;
  const schedule = useEventStore((state) => state.events);
  //   const colorIndex = useEventStore((state) => state.colorIndex);
  //   const incrementColorIndex = useEventStore((state) => state.incrementColorIndex);
  //   const addIndices = useEventStore((state) => state.addIndices);
  //   const tempSchedule = schedule
  //     .map((event, i) => {
  //       //console.log(event.DateTime.getDay());
  //       event.colIndex = i;
  //       return event;
  //     })
  //     .filter((event) => {
  //       let tempHour = event.DateTime.getHours();
  //       let tempDay = tempHour < 2 ? event.DateTime.getDay() - 1 : event.DateTime.getDay();
  //       if (tempHour == 0) tempHour += 12;
  //       return (tempHour > 12 ? tempHour - 12 == hour : tempHour == hour) && tempDay == day;
  //     });
  const tempSchedule = getEventsByDayAndHour(day, hour, schedule);
  return (
    <div
      style={{
        // height: event.Duration * 2 + "px",
        // marginTop: event.DateTime.getMinutes() * 2,
        width: dayWidth - 50,
      }}
      className={"flex   justify-stretch overflow-visible px-1"}
    >
      {/* {const tempSchedule = schedule
        .filter((event) => {
          console.log(event.DateTime.getHours());
          console.log(hour);
          return event.DateTime.getHours() - 12 == hour;
        }) */}
      {tempSchedule.map((event, i) => {
        //  console.log(event, event.colIndex % 3);
        let colorScheme = [" bg-primary text-primary-content", " bg-secondary text-secondary-content", " bg-accent text-accent-content"][
          event.colIndex % 3
        ];

        // console.log(event);
        return (
          <div className="grow" key={`calendarevent-${event.Name}`}>
            <div
              style={{
                height: event.Duration * 3 + "px",
                marginTop: event.DateTime.getMinutes() * 2,
                width: (DAY_WIDTH - 65) / tempSchedule.length + "px",
              }}
              className={"absolute p-2 bg-opacity-80 text-primary-content rounded overflow-visible " + colorScheme}
              // `h-[${event.Duration * 2}px]`
            >
              <h3 className="text-xs font-bold">{event.Name}</h3>
              <div className="text-xs">@{event.Venue}</div>
              <div className="text-xs mt-1">{event.Address}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CalendarEvents;
