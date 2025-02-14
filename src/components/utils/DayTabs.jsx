import { useEffect } from "react";
import { useEventStore } from "../../store/event-store";
import { getMinDay } from "../../handlers/dateTimeHandlers";

function DayTabs({ daysArr }) {
  const currentDay = useEventStore((state) => state.currentDay);
  const setCurrentDay = useEventStore((state) => state.setCurrentDay);

  useEffect(() => {
    console.log(getMinDay(daysArr));
    setCurrentDay(getMinDay(daysArr));
  }, []);

  return (
    <div role="tablist" className="tablist tabs-boxed w-screen flex flex-nowrap justify-between p-2 bg-neutral rounded-b-none rounded-tr-none">
      {daysArr &&
        daysArr.length > 0 &&
        daysArr.map((day) => {
          // console.log(day[0].DateTime.getDay());
          return (
            <div
              key={`dayOfWeek:${day.getDay()}`}
              role="tab"
              className={" tab text-xs grow  " + (day.getDay() == currentDay.getDay() && "tab-active")}
              onClick={() => {
                //   console.log(day[0]);
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
