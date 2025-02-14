import GridEvent from "./GridEvent";

function OverlappingEventsBlock({ events }) {
  let colSpan;
  console.log({ events });
  if (events.length == 1) {
    colSpan = 12;
  } else if (events.length == 2) {
    colSpan = 6;
  } else {
    colSpan = 4;
  }

  return (
    <>
      {events.map((event, i) => {
        return <GridEvent key={"grid-event" + event.Name} event={event} colSpan={colSpan} eventIndex={i} />;
      })}
    </>
  );
}

export default OverlappingEventsBlock;
