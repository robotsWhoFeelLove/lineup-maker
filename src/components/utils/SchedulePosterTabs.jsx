import { useEffect } from "react";
import { useEventStore } from "../../store/event-store";
import { getMinDay } from "../../handlers/dateTimeHandlers";

function SchedulePosterToggle() {
  const scheduleType = useEventStore((state) => state.scheduleView);
  const setScheduleType = useEventStore((state) => state.setScheduleView);

  function handleToggleCheck(event) {
    if (event.target.checked) {
      setScheduleType("poster");
    } else {
      setScheduleType("schedule");
    }
  }
  return (
    <div
      className="border-t  border-l flex items-center gap-2 text-xs justify-end bg-neutral rounded-tl-lg px-2"
      //   role="tablist"
      //   className="border-b tablist tabs-boxed w-screen flex flex-nowrap justify-between p-2 bg-neutral rounded-b-none rounded-tr-none"
    >
      Poster View <input onChange={handleToggleCheck} type="checkbox" checked={scheduleType == "poster"} className="toggle" />
      {/* <div
        onClick={() => {
          setScheduleType("schedule");
        }}
        className={"tab " + (scheduleType == "schedule" && "tab-active")}
      >
        Schedule View
      </div>
      <div
        onClick={() => {
          setScheduleType("poster");
        }}
        className={"tab " + (scheduleType == "poster" && "tab-active")}
      >
        Poster View
      </div> */}
    </div>
  );
}

export default SchedulePosterToggle;
