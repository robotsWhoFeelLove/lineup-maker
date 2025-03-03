import { useState, useEffect } from "react";
import Event from "./components/event-selector/Event";
import Hour from "./components/event-selector/Hour";
import Day from "./components/event-selector/Day";
import { events } from "./assets/events";
import { HashRouter, Route, Routes } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import "./App.css";
import EventSelector from "./components/EventSelector";
import { useEventStore } from "./store/event-store";
import CalendarDay from "./components/calendar/CalendarDay";
import { mockEvents } from "./assets/mock-events";
import { useLocation } from "react-router-dom";
import EventSchedule from "./components/EventSchedule";
import BottomNav from "./components/utils/BottomNav";
import DayTabs from "./components/utils/DayTabs";
import { getDaysFromArr } from "./handlers/dateTimeHandlers";
import ShareButton from "./components/share-schedule/ShareButton";
import ShareModal from "./components/share-schedule/ShareModal";
import GridSchedule from "./components/grid-calendar/GridSchedule";
import EventGrid from "./components/EventGrid";
import { shareMobileImage, shareSchedule } from "./services/sharingServices";
import SchedulePosterToggle from "./components/utils/SchedulePosterTabs";
import EventPoster from "./components/EventPoster";
import LoadSpin from "./components/utils/LoadSpin";

function App() {
  const setScheduleByEids = useEventStore((state) => state.setScheduleByEids);
  const currentPage = useEventStore((state) => state.currentPage);
  const setCurrentPage = useEventStore((state) => state.setCurrentPage);
  const schedule = useEventStore((state) => state.events);
  const setDayWidth = useEventStore((state) => state.setDayWidth);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = new URLSearchParams(location.search);
  const scheduleQuery = queryParams.get("schedule");
  const scheduleType = useEventStore((state) => state.scheduleView);
  const posterImg = useEventStore((state) => state.posterImg);
  const setPosterImg = useEventStore((state) => state.setPosterImg);
  console.log({ scheduleQuery });

  //const schedule = useEventStore((state) => state.events);
  useEffect(() => {
    if (scheduleQuery) {
      const tempEvents = scheduleQuery.split("-");
      console.log(tempEvents);

      setScheduleByEids(tempEvents);

      setCurrentPage("schedule");
    }
    setDayWidth();

    window.addEventListener("resize", setDayWidth);

    return () => {
      window.removeEventListener("resize", setDayWidth);
    };
  }, []);

  useEffect(() => {
    let queryString = "";
    schedule.map((event, i) => {
      queryString += event.eid;
      if (i + 1 < schedule.length) {
        queryString += "-";
      }
    });

    setSearchParams({ ...Object.fromEntries(searchParams), schedule: queryString });
    console.log(schedule);
  }, [currentPage, schedule]);

  return (
    <>
      <main className=" mb-auto ">
        {currentPage == "selector" && <EventSelector events={events} />}
        {/* {currentPage == "schedule" && <EventSchedule />} */}
        {currentPage == "schedule" && scheduleType == "schedule" && <EventGrid />}
        {currentPage == "schedule" && scheduleType == "poster" && <EventPoster />}
      </main>
      <footer>
        <div className=" fixed bottom-[60px]">
          {schedule && schedule.length > 0 && (
            <>
              <div className="flex justify-end">
                {currentPage == "schedule" && <SchedulePosterToggle />}
                <ShareButton />
              </div>
            </>
          )}
          <div className="md:hidden">
            <DayTabs daysArr={currentPage == "selector" ? getDaysFromArr(events) : getDaysFromArr(schedule)} />
          </div>
        </div>
        <BottomNav />
      </footer>
      <ShareModal handler={shareSchedule} />
      <dialog id="poster-modal" className="modal">
        <div className="modal-box w-[80vw] h-[80vh]">
          <h3 className="font-bold text-lg"></h3>
          <p className="py-4">Share or download poster</p>
          {posterImg && <img src={posterImg} alt="" />}
          {!posterImg && (
            <>
              <div className="animate-fade-up ">... loading image</div>
              <div className="animate-spin flex justify-center items-center">
                <LoadSpin />
              </div>
            </>
          )}
          <div className="modal-action">
            <form method="dialog ">
              <button
                onClick={() => {
                  const dialogEl = document.getElementById("poster-modal");
                  dialogEl.close();
                }}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
              <button
                onClick={() => {
                  // document.getElementById("poster-modal");

                  const downloadLink = document.createElement("a");
                  downloadLink.href = posterImg;
                  downloadLink.download = "poster.png";
                  document.body.appendChild(downloadLink);
                  downloadLink.click();
                  const dialogEl = document.getElementById("poster-modal");
                  dialogEl.close();
                }}
                className="btn mx-2"
              >
                Download
              </button>
              <button
                onClick={() => {
                  shareMobileImage(posterImg);
                  const dialogEl = document.getElementById("poster-modal");
                  dialogEl.close();
                }}
                className="btn"
              >
                Share
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default App;
