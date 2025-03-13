export function convertCSVToJSON(csv) {
  const lines = csv.split("\n");
  const result = [];
  const headers = ["Name", "DateTime", "Description", "Venue", "Address", "Duration", "eid"];
  let eid = 1;

  const venueAddresses = {
    "OUTER LIMITS": "Outer Limits Lounge, 5507 Caniff St, Hamtramck, MI 48212",
    "HIGH DIVE": "High Dive, 11474 Joseph Campau Ave, Hamtramck, MI 48212",
    "POLKA DOT": "Polka Dot, 11123 Jos Campau Ave, Hamtramck, MI 48212",
    "PAINTED LADY": "Painted Lady, 2930 Jacob St, Hamtramck, MI 48212",
    "SEA LEAGUE": "The Polish Sea League, 2601 Edwin St, Hamtramck, MI 48212",
    "CLUB COYOTE": "Club Coyote, 10200 Joseph Campau Ave, Hamtramck, MI 48212",
    "BANK SUEY": "Bank Suey, 10338 Joseph Campau Ave, Hamtramck, MI 48212",
    "NEW DODGE": "New Dodge Lounge, 8850 Joseph Campau Ave, Hamtramck, MI 48212",
    "GHOST LIGHT": "Ghost Light, 2317 Caniff St, Hamtramck, MI 48212",
    "ANT HALL": "Ant Hall, 2319 Caniff St, Hamtramck, MI 48212",
    SMALLS: "Smalls, 10339 Conant St, Hamtramck, MI 48212",
    WHISKEY: "Whiskey in the Jar, 2741 Yemans St, Hamtramck, MI 48212",
    "PLAV POST": "PLAV Post, 11824 Joseph Campau Ave, Hamtramck, MI 48212",
    BUMBOS: "Bumbo's, 3001 Holbrook Ave, Hamtramck, MI 48212",
    HENRIETTAHAUS: "HenriettaHaus, 2445 Burwood St, Hamtramck, MI 48212",
    "PORT BAR": "Port Bar, 22925 E Vernier Rd, Hamtramck, MI 48225",
    "FLORIAN EAST": "Florian East, 3238 Caniff St, Hamtramck, MI 48212",
    "BLACK SALT": "Black Salt, 1234 Fourteenth St, Hamtramck, MI 48212",
    "CAFE 1923": "Cafe 1923, 2287 Holbrook Ave, Hamtramck, MI 48212",
    COFFEETRON: "Coffeetron, 3301 Caniff St, Hamtramck, MI 48212",
    SHOWTIME: "Showtime, 2925 Jacob St, Hamtramck, MI 48212",
    "FOWLING 1": "3901 Christopher St, Hamtramck, MI 48211",
    "FOWLING 2": "3901 Christopher St, Hamtramck, MI 48211",
    "FOWLING 3": "3901 Christopher St, Hamtramck, MI 48211",
    "FOWLING 4": "3901 Christopher St, Hamtramck, MI 48211",
    KELLYS: "2403 Holbrook St, Hamtramck, MI 48212-3432",
  };

  for (let i = 0; i < lines.length; i++) {
    const currentLine = lines[i].split(",");

    const dayText = currentLine[0];

    const act = currentLine[1];
    const venue = currentLine[2];
    const duration = parseInt(currentLine[3]);
    const time = currentLine[4];

    // Convert the normalized time
    const [hours, minutes, seconds] = time.split(":");
    let normalizedHours = parseInt(hours);
    let normalizedMinutes = parseInt(minutes);
    //let normalizedSeconds = parseInt(seconds.replace(" PM", ""));

    // Adjust for PM time
    if (time.includes(" PM") && normalizedHours !== 12) {
      normalizedHours += 12;
    } else if (time.includes(" AM") && normalizedHours === 12) {
      normalizedHours = 0;
    }
    // console.log({ dayText });
    let day = 20;
    if ((dayText.includes("FRIDAY") && hours > 3) || (dayText.includes("FRIDAY") && hours < 3)) day = 21;
    if ((dayText.includes("SATURDAY") && hours > 3) || (dayText.includes("SATURDAY") && hours < 3)) day = 22;

    result.push({
      Name: act,
      DateTime: `new Date(2025, 2, ${day}, ${normalizedHours}, ${normalizedMinutes})`,
      Description: "",
      Venue: venue,
      Address: venueAddresses[venue] || "",
      Duration: duration,
      eid: eid.toString().padStart(3, "0"),
    });

    eid++;
  }

  return result;
}
