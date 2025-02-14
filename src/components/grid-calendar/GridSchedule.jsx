import { createOverlappingEventsList, findOverlappingEvents, getEventsByDay } from "../../handlers/dateTimeHandlers";
import { useEventStore } from "../../store/event-store";
import GridEvent from "./GridEvent";
import OverlappingEventsBlock from "./OverlappingEventsBlock";

function GridSchedule({ day }) {
  const schedule = useEventStore((state) => state.events);
  //console.log(schedule);

  const todaysEvents = getEventsByDay(day, schedule);

  console.log({ todaysEvents });
  let overlaps = createOverlappingEventsList(todaysEvents);

  console.log({ overlaps });
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
        <div className="w-full flex h-[1440px] ">
          <div className="grid grid-cols-12 grid-rows-8  auto-rows-fr overflow-visible grow">
            <div className="border-y w-[100%] row-start-1 col-start-1 col-span-12"></div>
            <div className="border-y w-[100%] row-start-2 col-start-1 col-span-12"></div>
            <div className="border-y w-[100%] row-start-3 col-start-1 col-span-12"></div>
            <div className="border-y w-[100%] row-start-4 col-start-1 col-span-12"></div>
            <div className="border-y w-[100%] row-start-5 col-start-1 col-span-12"></div>
            <div className="border-y w-[100%] row-start-6 col-start-1 col-span-12"></div>
            <div className="border-y w-[100%] row-start-7 col-start-1 col-span-12"></div>
            <div className="border-y w-[100%] row-start-8 col-start-1 col-span-12"></div>
            {overlaps.map((events, i) => {
              return <OverlappingEventsBlock key={"events-block" + i} events={events} />;
            })}
          </div>
          <div className=" w-[50px] flex flex-col">
            <div className="h-[180px] border-y w-10 text-sm">6 PM</div>
            <div className="h-[180px] border-y w-10 text-sm">7 PM</div>
            <div className="h-[180px] border-y w-10 text-sm">8 PM</div>
            <div className="h-[180px] border-y w-10 text-sm">9 PM</div>
            <div className="h-[180px] border-y w-10 text-sm">10 PM</div>
            <div className="h-[180px] border-y w-10 text-sm">11 PM</div>
            <div className="h-[180px] border-y w-10 text-sm">12 AM</div>
            <div className="h-[180px] border-y w-10 text-sm">1 AM</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GridSchedule;
