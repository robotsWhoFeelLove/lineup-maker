import { getDays } from "../handlers/dateTimeHandlers";
import { createPoster5, createPosterMobile, downloadDesktop, shareMobile } from "../services/sharingServices";
import { useEventStore } from "../store/event-store";
import PosterDay from "./Poster/PosterDay";

function EventPoster() {
  const schedule = useEventStore((state) => state.events);
  const currentDay = useEventStore((state) => state.currentDay);

  return (
    <>
      <h2 style={{ fontFamily: "New Amsterdam" }} className="text-3xl w-full text-center my-10">
        Download Posters
      </h2>
      <div className="hidden md:flex justify-around overflow-scroll ">
        {schedule &&
          schedule.length > 0 &&
          getDays(schedule).map((day) => {
            return <PosterDay handler={downloadDesktop} key={"day" + day.getDay()} day={day} />;
          })}
      </div>
      <div className="md:hidden flex  overflow-scroll poster-container">
        {schedule && schedule.length > 0 && <PosterDay handler={shareMobile} key={"poster" + currentDay.getDay()} day={currentDay} />}
      </div>
    </>
  );
}

export default EventPoster;
