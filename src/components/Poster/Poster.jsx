import { saveAs } from "file-saver";
import { getDayString } from "../../handlers/dateTimeHandlers";
import {
  createImage,
  downloadPoster,
  createAndDownloadImage,
  createBlob,
  sharePoster,
  createPoster,
  createPoster2,
  createPoster3,
  createPoster5,
} from "../../services/sharingServices";
import * as htmlToImage from "html-to-image";

function Poster({ poster, schedule, day, handler }) {
  let posterID = "poster" + day.getDay() + poster.Title;
  const handleDownload = () => {
    handler(posterID);
  };

  return (
    <div id={posterID + "parent"} className="w-full p-3 pt-0">
      <div onClick={handleDownload} className="w-full flex justify-end">
        <svg className="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 16L12 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 12L12 16L16 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 16V22H4V16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="w-full" id={posterID}>
        <div
          style={{ color: poster.Text_Color, fontFamily: poster.Font, backgroundColor: poster.BG_Color }}
          className="flex flex-col justify-center w-full max-w-[500px] text-center"
        >
          <img src={poster.Image} alt={poster.Title} />
          <h3 className="text-xl font-semibold underline">{getDayString(day)}</h3>
          <div className="flex flex-col w-full justify-center leading-3 pb-3">
            {schedule.map((event) => {
              const hour = event.DateTime.getHours();
              return (
                <div
                  className="text-center"
                  style={{ color: poster.Text_Color, fontFamily: poster.Font }}
                  key={"poster" + day.getDay() + poster.Title + event.Name}
                >
                  <span className="font-normal text-md">{event.Name}</span>
                  <span className="text-sm">
                    {" "}
                    {hour > 2 ? hour - 12 : hour} {hour > 11 ? "PM" : "AM"}
                  </span>
                  <span className="text-xs"> @{event.Venue}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Poster;
