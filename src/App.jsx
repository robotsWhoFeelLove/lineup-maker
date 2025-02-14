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
import { shareSchedule } from "./services/sharingServices";

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
        {currentPage == "schedule" && <EventGrid />}
      </main>
      <footer>
        <div className="md:hidden fixed bottom-[60px]">
          {schedule && schedule.length > 0 && <ShareButton />}
          <DayTabs daysArr={currentPage == "selector" ? getDaysFromArr(events) : getDaysFromArr(schedule)} />
        </div>
        <BottomNav />
      </footer>
      <ShareModal handler={shareSchedule} />
    </>
  );
}

export default App;
