import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Day from "./event-selector/Day";
import { events } from "../assets/events";
import DayTabs from "./utils/DayTabs";
import { getDaysFromArr } from "../handlers/dateTimeHandlers";
import { useEventStore } from "../store/event-store";

function EventSelector() {
  const currentDay = useEventStore((state) => state.currentDay);
  const [daysArr, setDaysArr] = useState();
  const getDaysArr = () => {
    let days = [];
    events.map((event) => {
      if (!days.includes(event.DateTime.getDay())) {
        //  console.log(event.DateTime.getDay());
        days.push(event.DateTime.getDay());
        //setAllDays((prev) => [...prev, new Date(event.DateTime.getYear(), event.DateTime.getMonth(), event.DateTime.getDay())]);
      }
    });

    const daysArr = days.sort().map((day) => {
      return events.filter((event) => event.DateTime.getDay() === day);
    });
    return daysArr;
  };

  // const daysArr = getDaysArr();

  useEffect(() => {
    const tempDays = getDaysArr();
    // setCurrentDay(tempDays[0]);
    setDaysArr(tempDays);
  }, []);

  return (
    <>
      <div className="md:hidden bg-neutral">{currentDay && <Day currentDay={currentDay} />}</div>
      <div className="hidden md:flex gap-2 z-20">
        {getDaysFromArr(events).map((day) => {
          return <Day key={"day-select" + day.getDay()} currentDay={day} />;
        })}
      </div>
    </>
  );
}

export default EventSelector;
