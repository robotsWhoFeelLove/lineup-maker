import { useEventStore } from "../../store/event-store";

export const getDisplayDate = (dateTime) => {
  const formattedDate = dateTime.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  return formattedDate;
};

function Event({ event }) {
  const dayWidth = useEventStore((state) => state.dayWidth);
  const handleSchedule = useEventStore((state) => state.handleSchedule);
  const schedule = useEventStore((state) => state.events);

  const getEndTime = (dateTime) => {
    const formattedDate = dateTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
    return formattedDate;
  };

  return (
    <div
      className={"btn h-20 gap-1  p-2 " + (schedule.includes(event) ? " btn-primary " : " btn-neutral")}
      onClick={() => {
        handleSchedule(event);
      }}
    >
      <div className="flex flex-col gap-1 min-h-fit">
        <div className="font-bold text-md grow">{event.Name}</div>
        <div>{getDisplayDate(event.DateTime) + " - " + getEndTime(new Date(event.DateTime.getTime() + event.Duration * 60000))}</div>
        <div>{event.Venue}</div>
      </div>
    </div>
  );
}

export default Event;
