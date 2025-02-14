import { useEventStore } from "../../store/event-store";

function Event({ event }) {
  const dayWidth = useEventStore((state) => state.dayWidth);
  const handleSchedule = useEventStore((state) => state.handleSchedule);
  const schedule = useEventStore((state) => state.events);
  const getDisplayDate = (dateTime) => {
    const formattedDate = dateTime.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
    return formattedDate;
  };

  return (
    <button
      className={"btn  min-h-fit  p-2 " + (schedule.includes(event) ? " btn-primary " : " btn-neutral")}
      onClick={() => {
        handleSchedule(event);
      }}
    >
      <div className="flex flex-col gap-1">
        <div className="font-bold text-md">{event.Name}</div>
        <div>{getDisplayDate(event.DateTime)}</div>
        <div>{event.Venue}</div>
      </div>
    </button>
  );
}

export default Event;
