import { useEffect, useState } from "react";
import {
  createOverlappingEventsList,
  findOverlappingEvents,
  getDaysEvents,
  getEventsByDay,
  getMaxHour,
  getMinHour,
} from "../../handlers/dateTimeHandlers";
import { useEventStore } from "../../store/event-store";
import GridEvent from "./GridEvent";
import OverlappingEventsBlock from "./OverlappingEventsBlock";

function GridSchedule({ day }) {
  const [gridHeight, setGridHeight] = useState();
  const [hoursArr, setHoursArr] = useState();
  const [todaysEvents, setTodaysEvents] = useState();
  const [overlaps, setOverlaps] = useState();
  const schedule = useEventStore((state) => state.events);
  //console.log(schedule);

  // const todaysEvents = getEventsByDay(day);

  useEffect(() => {
    const tempTodaysEvents = getDaysEvents(day).sort((a, b) => a.DateTime < b.DateTime);
    // console.log({ daysEvents });
    let minHour = getMinHour(tempTodaysEvents);
    const maxHour = getMaxHour(tempTodaysEvents);
    setTodaysEvents(tempTodaysEvents);
    //console.log({ minHour, maxHour });

    let tempHoursArr = [];
    setGridHeight((maxHour - minHour + 2) * 180);
    //console.log((maxHour - minHour + 2) * 180);

    while (minHour <= maxHour + 1) {
      tempHoursArr.push(minHour);
      minHour++;
    }
    setHoursArr(tempHoursArr);

    setOverlaps(createOverlappingEventsList(tempTodaysEvents));
  }, [day]);

  //console.log(gridHeight);

  // console.log({ todaysEvents });
  //let overlaps = createOverlappingEventsList(todaysEvents);

  //console.log({ overlaps });
  return (
    <>
      {" "}
      <div className="flex flex-col border-x mb-40 basis-0 grow">
        <h2 className="border w-full bg-neutral z-50 text-neutral-content top-0 p-2">
          {day.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </h2>
        <div className="w-full flex ">
          {gridHeight && (
            <div style={{ height: gridHeight }} className={"grid grid-cols-12 h-[" + gridHeight + "] auto-rows-fr overflow-visible grow"}>
              {hoursArr.map((hour, i) => {
                //let currentRow = i / (i + 1);
                return (
                  <div
                    key={`scheduler-row-${hour}-${i}`}
                    style={{ gridRow: i + 1 }}
                    className="border-y w-[100%] h-[180px] col-start-1 col-span-12"
                  ></div>
                );
              })}

              {overlaps &&
                overlaps.map((events, i) => {
                  //console.log({ events });
                  return <OverlappingEventsBlock key={"events-block" + i} events={events} hoursArr={hoursArr} />;
                })}
            </div>
          )}
          <div className=" w-[50px] flex flex-col ">
            {/* <div className="h-[180px] border-y w-10 text-sm">6 PM</div> */}
            {hoursArr &&
              hoursArr.map((hour, i) => {
                let displayHour = "";
                if (hour < 25) {
                  displayHour = `${hour - 12} ${hour == 24 ? "AM" : "PM"}`;
                } else {
                  displayHour = `${hour - 24} AM`;
                }
                return (
                  <div key={`scheduler-time-row-${hour}-${i}`} style={{ gridRow: i + 1 }} className="h-[180px] border-y w-10 text-sm">
                    {displayHour}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default GridSchedule;
