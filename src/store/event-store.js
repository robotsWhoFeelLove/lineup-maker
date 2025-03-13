import { create } from "zustand";
import { events as fullEventList } from "../assets/events";
import { getDays } from "../handlers/dateTimeHandlers";

export const useEventStore = create((set) => ({
  events: [],
  colorIndex: 0,
  currentDay: new Date(1900, 1, 1),
  currentPage: "selector",
  dayWidth: 500,
  scheduleView: "schedule",
  posterImg: null,

  setPosterImg: (newPosterImg) => {
    set(() => ({
      posterImg: newPosterImg,
    }));
  },
  setDayWidth: () => {
    set(() => ({
      dayWidth: window.innerWidth < 500 ? window.innerWidth : (window.innerWidth - 65) / getDays().length,
    }));
  },
  setScheduleView: (newScheduleView) => {
    set(() => ({
      scheduleView: newScheduleView,
    }));
  },
  setCurrentPage: (newPage) => {
    set(() => ({
      currentPage: newPage,
    }));
  },
  setCurrentDay: (day) => {
    set(() => ({
      currentDay: day,
    }));
  },
  incrementColorIndex: () => {
    set((state) => ({
      colorIndex: state.colorIndex + 1,
    }));
  },
  addEvent: (newEvent) => {
    console.log(newEvent);
    set((state) => ({ events: [...state.events, newEvent] }));
  },
  incrementAsync: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set((state) => ({ count: state.count + 1 }));
  },
  removeEvent: (eventToRemove) => {
    set((state) => ({ events: state.events.filter((event) => event != eventToRemove) }));
  },
  handleSchedule: (event) => {
    //console.log(event);
    set((state) => ({ events: state.events.includes(event) ? state.events.filter((myEvent) => myEvent != event) : [...state.events, event] }));
  },
  setSchedule: (eventArr) => {
    set(() => ({ events: eventArr }));
  },
  addEventIndices: () => {
    set((state) => ({
      events: state.events.map((event, i) => {
        event.colorIndex = i;
        return event;
      }),
    }));
  },
  setScheduleByEids: (eidArr) => {
    set(() => ({
      events: fullEventList.filter((event) => {
        //  console.log(event, eidArr);
        return eidArr.includes(event.eid);
      }),
    }));
  },
}));
