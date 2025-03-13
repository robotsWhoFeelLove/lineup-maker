import { useEffect, useState } from "react";
import { posters } from "../../assets/posters";
import { useEventStore } from "../../store/event-store";
import Poster from "./Poster";
import { getDayString } from "../../handlers/dateTimeHandlers";
import { createPoster, createPosterImageArray, setPosterForDownload } from "../../services/sharingServices";
import PosterImg from "./PosterImg";
//import { image } from "html2canvas-pro/dist/types/css/types/image";

function PosterDay({ day, handler }) {
  const schedule = useEventStore((state) => state.events);
  const [isReady, setIsReady] = useState(false);
  const [localPosters, setLocalPosters] = useState([]);
  const setPosterImg = useEventStore((state) => state.setPosterImg);

  useEffect(() => {
    // async function localCreate() {
    //   return posters.map((poster) => {
    //     createPoster("poster" + day.getDay() + poster.Title, "poster-container");
    //   });
    // }
    // const tempPosters = localCreate();
    // console.log({ tempPosters });
    // setLocalPosters(tempPosters);
    // createPosterImageArray(posters, "poster-container", day, setLocalPosters);
    // setIsReady(true);
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2 mb-40 border">
        <h3 className="text-secondary">{getDayString(day)}</h3>
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
        {/* <button
          onClick={() => {
            console.log("starting");
            setPosterForDownload("poster" + day.getDay() + posters[0].Title, setPosterImg);
            console.log("image-created");
            document.getElementById("poster-modal").showModal();
          }}
        >
          test
        </button> */}

        {/* {localPosters.length == posters.length &&
        localPosters.map((poster, i) => {
          return <PosterImg key={"posterImg-" + i + "-" + day.getDay()} img={poster} />;
        })} */}
      </div>
      {/* <dialog id="poster-modal" className="modal">
        <div className="modal-box w-[80vw] h-[80vh]">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Click the button below to close</p>
          {posterImg && <img src={posterImg} alt="" />}
          <div className="modal-action">
            <form method="dialog">
          
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog> */}
    </>
  );
}

export default PosterDay;
