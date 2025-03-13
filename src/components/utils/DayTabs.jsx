import { useEffect } from "react";
import { useEventStore } from "../../store/event-store";
import { getMinDay } from "../../handlers/dateTimeHandlers";

function DayTabs({ daysArr }) {
  const currentDay = useEventStore((state) => state.currentDay);
  const setCurrentDay = useEventStore((state) => state.setCurrentDay);
  const schedule = useEventStore((state) => state.events);

  useEffect(() => {
    // console.log(getMinDay(daysArr));
    if (schedule.length == 0) {
      setCurrentDay(getMinDay(daysArr));
    } else {
      setCurrentDay(getMinDay(schedule));
    }
  }, []);

  return (
    <div
      role="tabslist"
      className="z-50 bg-neutral border-t tablist tabs-boxed w-screen flex flex-nowrap justify-between p-2 rounded-b-none rounded-tr-none"
    >
      {daysArr &&
        daysArr.length > 0 &&
        daysArr.map((day) => {
          // console.log(day[0].DateTime.getDay());
          return (
            <div
              key={`dayOfWeek:${day.getDay()}`}
              role="tab"
              className={" tab text-xs grow  z-50 " + (day.getDay() == currentDay.getDay() && "tab-active")}
              onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                //   console.log(day[0]);
                //console.log({ day });
                setCurrentDay(day);
              }}
            >
              {day.toLocaleDateString("en-US", {
                weekday: "short",
                month: "long",
                day: "numeric",
              })}
            </div>
          );
        })}
    </div>
  );
}

export default DayTabs;
