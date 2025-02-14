export function getTime(time) {
  const hr = Math.floor(time);
  let m = ":" + (time % hr) * 60;
  if (m.toString().length < 3) m = m + "0";
  let showTime = hr + m + " PM";

  return showTime;
}

export function filterBands(arr, day) {
  return arr.filter((el) => el.day == day);
}

export function filterTime(bandArr, timeMin, day, timePeriod = 0) {
  return bandArr.filter((band) => {
    return band.time >= timeMin && band.time <= timeMin + timePeriod && band.day == day;
  });
}

export function cloneThing(thing) {
  let newThing = JSON.parse(JSON.stringify(thing));
  return newThing;
}
