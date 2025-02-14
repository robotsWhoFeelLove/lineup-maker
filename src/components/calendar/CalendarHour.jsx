import { EVENT_HOURS_ARR, getDays } from "../../handlers/dateTimeHandlers";
import { useEventStore } from "../../store/event-store";
import CalendarEvents from "./CalendarEvents";
import CalendarMinuteBlock from "./CalendarMinuteBlock";
import { DAY_WIDTH } from "../utils/constants";

function CalendarHour({ hour, day }) {
  const dayWidth = useEventStore((state) => state.dayWidth);
  const DAY_WIDTH = window.innerWidth < 500 ? window.innerWidth : (window.innerWidth - 65) / getDays().length;
  // const [counter, setCounter] = useState(0);
  const schedule = useEventStore((state) => state.events);
  //console.log("days: " + getDays().length);
  // console.log({ schedule });
  // const getHourEvents = (hour, events) => {
  //   return events.filter((event) => {
  //     console.log(event);
  //     return event.DateTime.hour > 2 ? event.DateTime.hour == hour + 12 : event.DateTime.hour == hour;
  //   });
  // };
  // console.log(getHourEvents(hour, schedule));
  // const BLOCKS = get5MinuteArr();
  return (
    <div
      style={{
        // height: event.Duration * 2 + "px",
        // marginTop: event.DateTime.getMinutes() * 2,

        width: dayWidth,
      }}
      className="border flex text-neutral-content  h-[180px] bg-neutral overflow-visible"
    >
      <div
        style={{
          marginLeft: DAY_WIDTH - 55,
        }}
        className={"absolute   opacity-50 text-lg"}
      >
        {String(hour)} {hour > 2 && hour < 12 ? " PM" : " AM"}
      </div>
      <CalendarEvents hour={hour} day={day} />
    </div>
  );
}

export default CalendarHour;
