import Hour from "./Hour";
import { useEventStore } from "../../store/event-store";
import { EVENT_HOURS_ARR, getDayString, getEventsByDay } from "../../handlers/dateTimeHandlers";
import { events as fullEventsList } from "../../assets/events";

function Day({ currentDay }) {
  //   const currentDay = useEventStore((state) => state.currentDay);
  // console.log(currentDay);
  const events = getEventsByDay(currentDay, fullEventsList);
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
          <div className="">
            <h2 className="fixed z-50 w-full border mt-0 mb-8 text-neutral-content w-full">{getDayString(currentDay)}</h2>
            <div className="pt-10  mb-40 bg-inherit w-full">
              <div className=" flex flex-col gap-2 overflow-scroll pb-40 px-2 w-full pt-4">
                {EVENT_HOURS_ARR.map((hour, i) => {
                  return <Hour key={`${hour}-${i}`} hour={hour} day={currentDay} events={hour} />;
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
