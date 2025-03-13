import { useEventStore } from "../store/event-store";

export const getHoursArr = (events) => {
  let hours = [];
  events.map((event) => {
    if (!hours.includes(event.DateTime.getHours())) {
      // console.log(event.DateTime.getHours());
      hours.push(event.DateTime.getHours());
    }
  });
  //console.log({ hours });
  const hoursArr = hours.sort().map((hour) => {
    return events.filter((event) => event.DateTime.getHours() === hour).sort((a, b) => a.DateTime.getMinutes() - b.DateTime.getMinutes());
  });
  return hoursArr;
};

export const getDaysArr = () => {
  let events = useEventStore.getState().events;
  let days = [];
  events.map((event) => {
    const tempDay = event.DateTime.getHours() > 2 ? event.DateTime.getDay() : event.DateTime.getDay() - 1;
    if (!days.includes(tempDay)) {
      //  console.log(event.DateTime.getDay());
      days.push(event.DateTime.getDay());
      //setAllDays((prev) => [...prev, new Date(event.DateTime.getYear(), event.DateTime.getMonth(), event.DateTime.getDay())]);
    }
  });

  const daysArr = days.sort().map((day) => {
    return events.filter(
      (event) =>
        (event.DateTime.getHours() > 2 && event.DateTime.getDay() === day) || (event.DateTime.getHours() <= 2 && event.DateTime.getDay() === day + 1)
    );
  });
  return daysArr;
};

export const getDayNums = () => {
  let events = useEventStore.getState().events;
  let days = [];
  events.map((event) => {
    const tempDay = event.DateTime.getHours() > 2 ? event.DateTime.getDay() : event.DateTime.getDay() - 1;
    if (!days.includes(tempDay)) {
      //  console.log(event.DateTime.getDay());
      days.push(event.DateTime.getDay());
      //setAllDays((prev) => [...prev, new Date(event.DateTime.getYear(), event.DateTime.getMonth(), event.DateTime.getDay())]);
    }
  });

  return days;
};

export const getDayString = (day) => {
  return day.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
};

export const getDays = () => {
  let events = useEventStore.getState().events;
  let days = [];
  let dayNums = [];
  events.map((event) => {
    const tempDay = event.DateTime.getHours() > 2 ? event.DateTime.getDay() : event.DateTime.getDay() - 1;
    if (!dayNums.includes(tempDay)) {
      //  console.log(event.DateTime.getDay());
      days.push(event.DateTime);
      dayNums.push(tempDay);
      //setAllDays((prev) => [...prev, new Date(event.DateTime.getYear(), event.DateTime.getMonth(), event.DateTime.getDay())]);
    }
  });
  //console.log(days);
  return days;
};

// export const getEventsFromArrByDay(eventsArr){
//     const currentDay = useEventStore((State)=>state.currentDay)
//     eventsArr.filter((event)=>event.DateTime.getDay() =)
// }

export const getDaysFromArr = (events) => {
  let days = [];
  let dayNums = [];
  events.map((event) => {
    const tempDay = event.DateTime.getHours() > 3 || event.DateTime.getHours() == 0 ? event.DateTime.getDay() : event.DateTime.getDay() - 1;
    if (!dayNums.includes(tempDay)) {
      //  console.log(event.DateTime.getDay());
      if (tempDay === 3) console.log(event);
      days.push(event.DateTime);
      dayNums.push(tempDay);
      //setAllDays((prev) => [...prev, new Date(event.DateTime.getYear(), event.DateTime.getMonth(), event.DateTime.getDay())]);
    }
  });
  // console.log({ days, dayNums });
  return days;
};

export const getMinMaxHours = (events) => {
  function addMinutes(date, minutes) {
    let tempDate = new Date(date);
    tempDate.setMinutes(date.getMinutes() + minutes);
    return tempDate;
  }

  let minHour = new Date(2099, 12, 31);
  let maxHour = new Date(1900, 1, 1);
  events.map((e) => {
    //console.log(e);
    if (e.DateTime < minHour) {
      minHour = e.DateTime;
    }
    let endTime = addMinutes(e.DateTime, e.Duration);
    if (endTime > maxHour) {
      maxHour = endTime;
    }
  });
  return minHour, maxHour;
};

export const EVENT_HOURS_ARR = [6, 7, 8, 9, 10, 11, 12, 1];

export const getEventsByDay = (day, events) => {
  //console.log(day, events);
  if (!events) {
    events = [...useEventStore.getState().events];
  }
  // console.log({ events });
  events = events.sort((a, b) => a.DateTime - b.DateTime);

  // console.log({ events });

  let tempEvents = [...events].map((event, i) => {
    //console.log(event.DateTime.getDay());
    let tempEvent = { ...event };
    tempEvent.colIndex = i;
    return tempEvent;
  });
  // console.log({ tempEvents });

  let filteredEvents = tempEvents.filter((event) => {
    let tempHour = event.DateTime.getHours();
    let tempDay = new Date(event.DateTime);
    if (tempHour < 2) {
      tempDay.setDate(tempDay.getDate() - 1);
    }
    if (tempHour == 0) tempHour += 12;
    //  console.log(tempDay.getDay() == day.getDay());
    // console.log();
    return tempDay.getDay() == day.getDay();
  });
  //  console.log({ filteredEvents });
  return filteredEvents;
};

export function getDaysEvents(day) {
  const schedule = useEventStore.getState().events;

  let tempSchedule = [...schedule];

  return tempSchedule.filter((event) => {
    return (
      (event.DateTime.getDay() == day.getDay() && event.DateTime.getHours() > 2) ||
      (event.DateTime.getHours() < 3 && event.DateTime.getDay() == day.getDay() + 1)
    );
  });
}

export const getEventsByDayAndHour = (day, hour, events) => {
  if (!events) {
    events = useEventStore.getState().events;
  }
  return events
    .sort((a, b) => a.DateTime - b.DateTime)
    .map((event, i) => {
      //console.log(event.DateTime.getDay());
      event.colIndex = i;
      return event;
    })
    .filter((event) => {
      let tempHour = event.DateTime.getHours();
      let tempDay = new Date(event.DateTime);
      if (tempHour < 2) {
        tempDay.setDate(tempDay.getDate() - 1);
      }
      if (tempHour == 0) tempHour += 12;
      return (tempHour > 12 ? tempHour - 12 == hour : tempHour == hour) && tempDay.getDay() == day.getDay();
    });
};

export const getMinDay = (daysArr) => {
  let minDay = new Date(2099, 12, 31);
  daysArr.map((day) => {
    //    console.log({ day, minDay });
    if (day < minDay) {
      minDay = day;
    }
  });
  return minDay;
};

export const getMinHour = (eventsArr) => {
  let minHour = 27;
  eventsArr.map((event) => {
    //    console.log({ day, minDay });
    let hour = event.DateTime.getHours();
    if (hour < 3) {
      hour += 24;
    }
    if (hour < minHour) {
      minHour = hour;
    }
  });
  return minHour;
};

export const getMaxHour = (eventsArr) => {
  let maxHour = 3;
  eventsArr.map((event) => {
    //    console.log({ day, minDay });
    let hour = event.DateTime.getHours();
    if (hour < 3) {
      hour += 24;
    }
    if (hour > maxHour) {
      maxHour = hour;
    }
  });
  return maxHour;
};

// export const getOverlappingEvents = (event, schedule) => {
//   const memoList = [];
//   const recursiveGetOverlaps = (event, schedule, i) => {
//     if (memoList.includes(event)) return;
//     memoList.push(event);
//   };
// };
export function findOverlappingEvents(event, eventsList) {
  // Convert the event's DateTime to a Date object
  const eventStart = new Date(event.DateTime);
  const eventEnd = new Date(eventStart.getTime() + event.Duration * 60000); // Convert minutes to milliseconds

  // Helper function to check if two events overlap
  function doEventsOverlap(event1, event2) {
    const event1Start = new Date(event1.DateTime);
    const event1End = new Date(event1Start.getTime() + event1.Duration * 60000);
    const event2Start = new Date(event2.DateTime);
    const event2End = new Date(event2Start.getTime() + event2.Duration * 60000);

    return (
      (event1Start < event2End && event1End > event2Start) || // event1 overlaps with event2
      (event2Start < event1End && event2End > event1Start) // event2 overlaps with event1
    );
  }

  // Recursive function to find all overlapping events
  function findOverlappingRecursive(currentEvent, visited) {
    const overlappingEvents = eventsList.filter((e) => {
      if (e.eid === currentEvent.eid || visited.has(e.eid)) return false; // Skip the same event or already visited events

      return doEventsOverlap(currentEvent, e);
    });

    // Add current event to visited set
    visited.add(currentEvent.eid);

    // Recursively find overlapping events for each overlapping event
    for (const overlappingEvent of overlappingEvents) {
      findOverlappingRecursive(overlappingEvent, visited);
    }
  }

  // Set to keep track of visited events
  const visited = new Set();

  // Start the recursive search with the given event
  findOverlappingRecursive(event, visited);

  // Convert the set of visited event IDs back to event objects
  const result = Array.from(visited).map((eid) => eventsList.find((e) => e.eid === eid));

  // Sort the result by start time
  result.sort((a, b) => new Date(a.DateTime) - new Date(b.DateTime));

  return result;
}

// Example usage:
//   const eventToCheck = mockEvents[0]; // Vampire Weekend
//   const overlappingEvents = findOverlappingEvents(eventToCheck, mockEvents);

//   console.log(overlappingEvents);

export function countOverlappingEvents(event, eventsList) {
  // Convert the event's DateTime to a Date object
  const eventStart = new Date(event.DateTime);
  const eventEnd = new Date(eventStart.getTime() + event.Duration * 60000); // Convert minutes to milliseconds

  // Helper function to check if two events overlap
  function doEventsOverlap(event1, event2) {
    const event1Start = new Date(event1.DateTime);
    const event1End = new Date(event1Start.getTime() + event1.Duration * 60000);
    const event2Start = new Date(event2.DateTime);
    const event2End = new Date(event2Start.getTime() + event2.Duration * 60000);

    return (
      (event1Start < event2End && event1End > event2Start) || // event1 overlaps with event2
      (event2Start < event1End && event2End > event1Start) // event2 overlaps with event1
    );
  }

  // Recursive function to count all overlapping events
  function countOverlappingRecursive(currentEvent, visited) {
    const overlappingEvents = eventsList.filter((e) => {
      if (e.eid === currentEvent.eid || visited.has(e.eid)) return false; // Skip the same event or already visited events

      return doEventsOverlap(currentEvent, e);
    });

    // Add current event to visited set
    visited.add(currentEvent.eid);

    // Recursively count overlapping events for each overlapping event
    for (const overlappingEvent of overlappingEvents) {
      countOverlappingRecursive(overlappingEvent, visited);
    }
  }

  // Set to keep track of visited events
  const visited = new Set();

  // Start the recursive search with the given event
  countOverlappingRecursive(event, visited);

  // The number of overlapping events is the size of the visited set minus 1 (to exclude the original event)
  return visited.size - 1;
}

export const getEventsIndexWithinHour = (event, schedule) => {
  return getEventsWithinHour(event, schedule).indexOf(event);
};

export const getEventsWithinHour = (event, schedule) => {
  return schedule.filter((e) => e.DateTime.getHours() == event.DateTime.getHours() && e.DateTime.getDate() == event.DateTime.getDate());
};

export const createOverlappingEventsList = (events) => {
  // console.log([...events]);
  events = events.sort((a, b) => a.DateTime - b.DateTime);
  let eventsMemo = [];
  let currentEvent = events.shift();
  let currentEventsList = [currentEvent];
  //   function getListsRescursive(events){
  //     if (events.length == 1) return events;
  //     if (events.length == 0) return;
  //     if(eventsM)
  //   }

  while (events) {
    if (events.length == 0) {
      if (currentEventsList.length > 0) {
        eventsMemo.push(currentEventsList);
      }
      break;
    }
    if (new Date(currentEvent.DateTime.getTime() + currentEvent.Duration * 60000) > events[0].DateTime) {
      currentEventsList.push(events[0]);
    } else {
      eventsMemo.push(currentEventsList);
      currentEventsList = [events[0]];
    }
    currentEvent = events.shift();
  }
  return eventsMemo;
};
