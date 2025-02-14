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
      <div className="hidden md:flex gap-2 ">
        {getDaysFromArr(events).map((day) => {
          return <Day key={"day-select" + day.getDay()} currentDay={day} />;
        })}
      </div>
      {/* {events && <DayTabs daysArr={getDaysFromArr(events)} />} */}
      {/* <div role="tablist" className="tablist tabs-boxed">
        {daysArr &&
          daysArr.length > 0 &&
          daysArr.map((day) => {
            // console.log(day[0].DateTime.getDay());
            return (
              <div
                key={`dayOfWeek:${day[0].DateTime.getDay()}`}
                role="tab"
                className={"tab " + (day == currentDay && "tab-active")}
                onClick={() => {
                  //   console.log(day[0]);
                  setCurrentDay(day);
                }}
              >
                {day[0].DateTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            );
          })}
      </div> */}
    </>
  );
}

export default EventSelector;
