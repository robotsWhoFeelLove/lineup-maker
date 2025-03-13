import { useEventStore } from "../store/event-store";
import { events } from "../assets/events";
import Day from "./event-selector/Day";
import { mockEvents } from "../assets/mock-events";
import CalendarDay from "./calendar/CalendarDay";
import { getDayNums, getDays, getDaysArr } from "../handlers/dateTimeHandlers";
import { useEffect } from "react";

// }
// console.log(minHour, maxHour);

function EventSchedule() {
  const schedule = useEventStore((state) => state.events);
  const currentDay = useEventStore((state) => state.currentDay);
  // console.log(schedule);
  const makeSchedule = useEventStore((state) => state.setSchedule);

  // const schedule = useEventStore((state) => state.events);
  //const HOURS = getHoursArr(events)
  //   mockEvents.map((el) => {
  //     console.log(el.DateTime.getHours());
  //   });
  //   console.log(getDayNums());
  //   useEffect(() => {
  //     makeSchedule(mockEvents);
  //   }, []);
  // console.log({ schedule });
  return (
    <>
      <div className="hidden md:flex overflow-scroll">
        {schedule &&
          schedule.length > 0 &&
          getDays(schedule).map((day) => {
            return <CalendarDay key={"day" + day.getDay()} day={day} events={mockEvents} />;
          })}
      </div>
      <div className="md:hidden flex overflow-scroll">
        {schedule && schedule.length > 0 && <CalendarDay key={"day" + currentDay.getDay()} day={currentDay} events={mockEvents} />}
      </div>
    </>
  );
}

export default EventSchedule;
