import Hour from "./Hour";
import { useEventStore } from "../../store/event-store";
import { EVENT_HOURS_ARR, getDayString, getEventsByDay, getMaxHour, getMinHour } from "../../handlers/dateTimeHandlers";
import { events as fullEventsList } from "../../assets/events";
import { useState } from "react";

function Day({ currentDay }) {
  const [currentHour, setCurrentHour] = useState();
  //   const currentDay = useEventStore((state) => state.currentDay);
  // console.log(currentDay);
  const events = getEventsByDay(currentDay, fullEventsList);

  const getHoursList = () => {
    let hours = [];
    events.map((event) => {
      let tempHour = event.DateTime.getHours();
      //({ tempHour });
      if (tempHour > 12) tempHour = tempHour - 12;
      if (tempHour === 0) tempHour = 12;
      if (!hours.includes(tempHour)) {
        //  console.log(event.DateTime.getHours());
        hours.push(tempHour);
      }
    });
    return hours;
  };

  const getHoursArr = () => {
    let hours = [];
    events.map((event) => {
      if (!hours.includes(event.DateTime.getHours())) {
        //  console.log(event.DateTime.getHours());
        hours.push(event.DateTime.getHours());
      }
    });
    // console.log({ hours });
    const hoursArr = hours.sort().map((hour) => {
      return events.filter((event) => event.DateTime.getHours() === hour).sort((a, b) => a.DateTime.getMinutes() - b.DateTime.getMinutes());
    });
    return hoursArr;
  };

  return (
    <>
      {events.length > 0 && (
        <>
          <div className="w-full grow">
            <h2 className="fixed z-50 w-full border mt-0 mb-8 bg-neutral text-neutral-content w-full">{getDayString(currentDay)}</h2>
            <div className="pt-10  mb-40 bg-inherit w-full">
              <div className=" flex flex-col gap-2 overflow-scroll pb-40 px-2 w-full pt-4">
                {getHoursList().map((hour, i) => {
                  return (
                    <Hour setCurrentHour={setCurrentHour} currentHour={currentHour} key={`${hour}-${i}`} hour={hour} day={currentDay} events={hour} />
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Day;
