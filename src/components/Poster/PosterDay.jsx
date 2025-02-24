import { posters } from "../../assets/posters";
import { useEventStore } from "../../store/event-store";
import Poster from "./Poster";

function PosterDay({ day, handler }) {
  const schedule = useEventStore((state) => state.events);

  return (
    <div className="flex flex-col gap-2 mb-40">
      {posters.map((poster) => {
        return (
          <Poster
            day={day}
            key={"poster-" + day.getDate() + poster.Title}
            poster={poster}
            handler={handler}
            schedule={schedule.filter((event) => {
              return event.DateTime.getDay() == day.getDay();
            })}
          />
        );
      })}
    </div>
  );
}

export default PosterDay;
