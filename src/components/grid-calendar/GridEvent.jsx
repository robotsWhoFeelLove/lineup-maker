import { countOverlappingEvents, findOverlappingEvents, getEventsIndexWithinHour } from "../../handlers/dateTimeHandlers";

function GridEvent({ event, colSpan, eventIndex }) {
  //   const overlaps = findOverlappingEvents(event, schedule).length;
  //   // countOverlappingEvents(event, schedule);
  //   let eventIndex = getEventsIndexWithinHour(event, schedule);
  //   //if(getEventsIndexWithinHour)
  //console.log(colSpan);
  let eventRow = event.DateTime.getHours();
  //console.log((eventIndex % 3) * colSpan);

  if (eventRow < 2) {
    eventRow += 7;
  } else {
    eventRow -= 17;
  }
  const eventBG = [" bg-primary text-primary-content", " bg-secondary text-secondary-content", " bg-accent text-accent-content"];
  //   let eventHorizontalLength = 12;
  //   if (overlaps == 2) {
  //     eventHorizontalLength = 6;
  //   } else {
  //     if (overlaps > 2) {
  //       eventHorizontalLength = 4;
  //     }
  //   }

  //   console.log(event.Name);
  //   console.log({ overlaps, eventIndex, eventRow });
  //   console.log(eventIndex + 1 + 12 / Math.min(3, overlaps));
  return (
    <div
      className={"overflow-visible text-xs p-2 rounded mx-[1px] bg-opacity-90" + eventBG[eventIndex % 3]}
      style={{
        gridColumnStart: (eventIndex % 3) * colSpan + 1,
        gridColumnEnd: "span " + colSpan,
        gridRow: eventRow,
        height: event.Duration * 3 + "px",
        marginTop: event.DateTime.getMinutes() * 3 + "px",
      }}
    >
      <h3 className="font-bold">{event.Name}</h3>
      <div className="pb-1">@{event.Venue}</div>
      <div className="">
        <a className="link" href={"https://maps.google.com/?q=" + event.Address} target="_blank" rel="noreferrer">
          {event.Address.length > 30 ? event.Address.slice(0, 20) + "..." : event.Address}
        </a>
      </div>
    </div>
  );
}

export default GridEvent;
