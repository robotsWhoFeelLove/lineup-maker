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
import { convertCSVToJSON } from "./handlers/eventHandler";
import HouseBanner from "./components/utils/HouseBanner";

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
  // console.log({ scheduleQuery });
  // console.log(
  //   convertCSVToJSON(`THURSDAY,Fangs and Twang,FOWLING 1,60,12:00:00 AM
  //   THURSDAY,Elspeth Tremblay,FOWLING 2,60,11:00:00 PM
  //   THURSDAY,Good Man's Brother,FOWLING 3,60,10:00:00 PM
  //   THURSDAY,Acid Youth,FOWLING 4,60,9:00:00 PM
  //   THURSDAY,Dori,FOWLING 5,60,8:00:00 PM
  //   THURSDAY,The Hourlies,FOWLING 2,60,11:30:00 PM
  //   THURSDAY,Speed Circuit,FOWLING 3,60,10:30:00 PM
  //   THURSDAY,Low Exposure,FOWLING 4,60,9:30:00 PM
  //   THURSDAY,Rob Zinck & the Collaborators,FOWLING 5,60,8:30:00 PM
  //   THURSDAY,Secondary Colors,FOWLING 6,60,7:30:00 PM
  //   THURSDAY,BANDEAU,SANCTUARY,60,12:00:00 AM
  //   THURSDAY,EXPEST,SANCTUARY,60,11:00:00 PM
  //   THURSDAY,Matthew Teardrop Orchestra,SANCTUARY,60,10:00:00 PM
  //   THURSDAY,Of House,SANCTUARY,60,9:00:00 PM
  //   THURSDAY,Joey Gaydos,OUTER LIMITS,60,12:15:00 AM
  //   THURSDAY,Sancho,OUTER LIMITS,60,11:15:00 PM
  //   THURSDAY,Deno,OUTER LIMITS,60,10:15:00 PM
  //   THURSDAY,HONDO,OUTER LIMITS,60,9:15:00 PM
  //   THURSDAY,Danny VanZandt,HIGH DIVE,60,12:30:00 AM
  //   THURSDAY,Of the Son & Spirit,HIGH DIVE,60,11:30:00 PM
  //   THURSDAY,Appolo's Den,HIGH DIVE,60,10:30:00 PM
  //   THURSDAY,Chance,HIGH DIVE,60,9:30:00 PM
  //   THURSDAY,Kat Steih and the Ferals,POLKA DOT,60,11:30:00 PM
  //   THURSDAY,Henry Walters,POLKA DOT,60,10:30:00 PM
  //   THURSDAY,Holy Profane,POLKA DOT,60,9:30:00 PM
  //   THURSDAY,Jeff Jablonski,POLKA DOT,60,8:30:00 PM
  //   THURSDAY,JP From the HP,PAINTED LADY,45,12:45:00 AM
  //   THURSDAY,Julia LeBril (Comedy),PAINTED LADY,15,12:30:00 AM
  //   THURSDAY,Mahonies,PAINTED LADY,45,11:45:00 PM
  //   THURSDAY,Jason Brent (Comedy),PAINTED LADY,15,11:30:00 PM
  //   THURSDAY,Rough Patch,PAINTED LADY,45,10:45:00 PM
  //   THURSDAY,Dr. Haj,PAINTED LADY,60,9:45:00 PM
  //   THURSDAY,James Linck,SEA LEAGUE,60,12:15:00 AM
  //   THURSDAY,Phased Out,SEA LEAGUE,60,11:15:00 PM
  //   THURSDAY,CRUNE,SEA LEAGUE,60,10:15:00 PM
  //   THURSDAY,Dancepack,SEA LEAGUE,60,9:15:00 PM
  //   THURSDAY,Characteritics,CLUB COYOTE,60,12:30:00 AM
  //   THURSDAY,Lava,CLUB COYOTE,60,11:30:00 PM
  //   THURSDAY,Months of Moon,CLUB COYOTE,60,10:30:00 PM
  //   THURSDAY,Entropicales,CLUB COYOTE,60,9:30:00 PM
  //   THURSDAY,Sunil Sawani,BANK SUEY,60,9:00:00 PM
  //   THURSDAY,Somthing,BANK SUEY,60,8:00:00 PM
  //   THURSDAY,Keelan Starr,BANK SUEY,60,7:00:00 PM
  //   THURSDAY,Clair Sargent,BANK SUEY,60,6:00:00 PM
  //   THURSDAY,The My Ways,NEW DODGE,60,12:30:00 AM
  //   THURSDAY,PolarStar,NEW DODGE,60,11:30:00 PM
  //   THURSDAY,Television City,NEW DODGE,60,10:30:00 PM
  //   THURSDAY,Roil Treatment,NEW DODGE,60,9:30:00 PM
  //   THURSDAY,DJ Lyriq,CAMPAU TOWER,60,8:30:00 PM
  //   THURSDAY,DJ G Baby,CAMPAU TOWER,60,10:30:00 PM
  //   FRIDAY,MRKT,OUTER LIMITS,60,12:15:00 AM
  //   FRIDAY,#CoOwnaz,OUTER LIMITS,60,11:15:00 PM
  //   FRIDAY,The Antibuddies,OUTER LIMITS,60,10:15:00 PM
  //   FRIDAY,The Hand,OUTER LIMITS,60,9:15:00 PM
  //   FRIDAY,Black Swan Dive Bomb,HIGH DIVE,60,12:30:00 AM
  //   FRIDAY,Remnants,HIGH DIVE,60,11:30:00 PM
  //   FRIDAY,Stormfeldt,HIGH DIVE,60,10:30:00 PM
  //   FRIDAY,Magnolia,HIGH DIVE,60,9:30:00 PM
  //   FRIDAY,Origami Phase,POLKA DOT,60,12:00:00 AM
  //   FRIDAY,(Paul Ein)Haus Arrest,POLKA DOT,60,11:00:00 PM
  //   FRIDAY,Jim Cherewick,POLKA DOT,60,10:00:00 PM
  //   FRIDAY,Fish Fly,POLKA DOT,60,9:00:00 PM
  //   FRIDAY,Double Winter,PAINTED LADY,60,12:45:00 AM
  //   FRIDAY,ZEM,PAINTED LADY,60,11:45:00 PM
  //   FRIDAY,Wild Shape,PAINTED LADY,60,10:45:00 PM
  //   FRIDAY,SeaHag,PAINTED LADY,60,9:45:00 PM
  //   FRIDAY,Eck!,SEA LEAGUE,60,12:30:00 AM
  //   FRIDAY,H8 Mile,SEA LEAGUE,60,11:30:00 PM
  //   FRIDAY,Ante-Madder,SEA LEAGUE,60,10:30:00 PM
  //   FRIDAY,Dylan Fox and The Wave,SEA LEAGUE,60,9:30:00 PM
  //   FRIDAY,Fen Fen,CLUB COYOTE,60,12:30:00 AM
  //   FRIDAY,Mazinga,CLUB COYOTE,60,11:30:00 PM
  //   FRIDAY,Cobra Youth,CLUB COYOTE,60,10:30:00 PM
  //   FRIDAY,The Wretched Sights,CLUB COYOTE,60,9:30:00 PM
  //   FRIDAY,Frizz,BANK SUEY,60,9:00:00 PM
  //   FRIDAY,John Salvage,BANK SUEY,60,8:00:00 PM
  //   FRIDAY,Dyzioek,BANK SUEY,60,7:00:00 PM
  //   FRIDAY,The Turnbuckles,BANK SUEY,60,6:00:00 PM
  //   FRIDAY,Pet Psychic,NEW DODGE,60,12:30:00 AM
  //   FRIDAY,Spectrum 3,NEW DODGE,60,11:30:00 PM
  //   FRIDAY,HAILALIEN,NEW DODGE,60,10:30:00 PM
  //   FRIDAY,Post Imperial Jazz Band,NEW DODGE,60,9:30:00 PM
  //   FRIDAY,Craig Brown Band,GHOST LIGHT,60,12:45:00 AM
  //   FRIDAY,Going Gones,GHOST LIGHT,60,11:45:00 PM
  //   FRIDAY,Dirty Copper,GHOST LIGHT,60,10:45:00 PM
  //   FRIDAY,Genetic Armageddon,GHOST LIGHT,60,9:45:00 PM
  //   FRIDAY,Devin Jetski,ANT HALL,60,12:00:00 AM
  //   FRIDAY,DJ PP Girlfriend,ANT HALL,60,11:00:00 PM
  //   FRIDAY,Lux Esto,ANT HALL,60,10:00:00 PM
  //   FRIDAY,Decibel Vibes (Dewey Decibel/Venus Vibes,ANT HALL,60,9:00:00 PM
  //   FRIDAY,Cult of Spaceskull,SMALLS,60,12:00:00 AM
  //   FRIDAY,Edison Hollow,SMALLS,60,11:00:00 PM
  //   FRIDAY,Cherry Drop,SMALLS,60,10:00:00 PM
  //   FRIDAY,The Strains,SMALLS,60,9:00:00 PM
  //   FRIDAY,Spill,SMALLS,60,8:00:00 PM
  //   FRIDAY,Suede Brain,WHISKEY,60,12:15:00 AM
  //   FRIDAY,Detroit 442,WHISKEY,60,11:15:00 PM
  //   FRIDAY,Angel of Mars,WHISKEY,60,10:15:00 PM
  //   FRIDAY,Tread Lightlies,WHISKEY,60,9:15:00 PM
  //   FRIDAY,Hall Pass,PLAV POST 12,60,12:45:00 AM
  //   FRIDAY,Mod Lang,PLAV POST 13,60,11:45:00 PM
  //   FRIDAY,Mirror Mask,PLAV POST 14,60,10:45:00 PM
  //   FRIDAY,Lemon Bucket Orchestra,PLAV POST 15,60,9:45:00 PM
  //   FRIDAY,Time Creep,BUMBOS,60,12:00:00 AM
  //   FRIDAY,Quality Cinema Band,BUMBOS,60,11:00:00 PM
  //   FRIDAY,Mango Star,BUMBOS,60,10:00:00 PM
  //   FRIDAY,Checker,BUMBOS,60,9:00:00 PM
  //   FRIDAY,The Slouches,HENRIETTAHAUS,60,12:15:00 AM
  //   FRIDAY,Kennedy Greenrod,HENRIETTAHAUS,60,11:15:00 PM
  //   FRIDAY,Callie Simon,HENRIETTAHAUS,60,10:15:00 PM
  //   FRIDAY,Mae Wa,HENRIETTAHAUS,60,9:15:00 PM
  //   FRIDAY,Loose Koozies,PORT BAR,60,12:30:00 AM
  //   FRIDAY,Alluvial Fans,PORT BAR,60,11:30:00 PM
  //   FRIDAY,Krystian Quint & the Quitters,PORT BAR,60,10:30:00 PM
  //   FRIDAY,Tony Paris & Sugarburn,PORT BAR,60,9:30:00 PM
  //   FRIDAY,Closed Circuit Cassettes,FLORIAN EAST,60,12:15:00 AM
  //   FRIDAY,Scum Queens,FLORIAN EAST,60,11:15:00 PM
  //   FRIDAY,Johnstonstons,FLORIAN EAST,60,10:15:00 PM
  //   FRIDAY,FRED,FLORIAN EAST,60,9:15:00 PM
  //   FRIDAY,"Bernat% Gino% Andrea Ghita & Jorissen",BLACK SALT,240,9:00:00 PM
  //   FRIDAY,Party Stomp,KELLYS,240,10:00:00 PM
  //   FRIDAY,John Krautner ,CAFE 1925,45,8:00:00 PM
  //   FRIDAY,The Burning Ponies,CAFE 1926,45,7:15:00 PM
  //   FRIDAY,Nancy Friday,CAFE 1927,60,6:15:00 PM
  //   FRIDAY,Louis Crutchfield,CAFE 1928,45,5:30:00 PM
  //   FRIDAY,ENDMASS,DETROIT THREADS,60,12:00:00 AM
  //   FRIDAY,Body & Spade,DETROIT THREADS,60,10:30:00 PM
  //   FRIDAY,T.Linder,DETROIT THREADS,60,9:00:00 PM
  //   FRIDAY,Pitchblnd,DETROIT THREADS,60,8:00:00 PM
  //   FRIDAY,Dan Wagner,DETROIT THREADS,60,7:00:00 PM
  //   FRIDAY,Let's Download a Car,COFFEETRON,60,8:00:00 PM
  //   FRIDAY,Aidan Pope,COFFEETRON,60,7:00:00 PM
  //   FRIDAY,Renalien,COFFEETRON,60,6:00:00 PM
  //   FRIDAY,RobbyNine (Saturnine Hello),SHOWTIME,60,2:00:00 PM
  //   FRIDAY,RobbyNine (Saturnine Hello),SHOWTIME,60,8:00:00 PM
  //   FRIDAY,248ty,CAMPAU TOWER,45,8:30:00 PM
  //   FRIDAY,bccording,CAMPAU TOWER,45,9:15:00 PM
  //   FRIDAY,wetdogg,CAMPAU TOWER,60,10:00:00 PM
  //   FRIDAY,208,CAMPAU TOWER,60,11:00:00 PM
  //   SATURDAY,The Stools,OUTER LIMITS,60,12:15:00 AM
  //   SATURDAY,Carbon Decoy,OUTER LIMITS,60,11:15:00 PM
  //   SATURDAY,Rogue Satellites,OUTER LIMITS,60,10:15:00 PM
  //   SATURDAY,Cheddar,OUTER LIMITS,60,9:15:00 PM
  //   SATURDAY,The Imaginatron,HIGH DIVE,60,12:30:00 AM
  //   SATURDAY,Carjack,HIGH DIVE,60,11:30:00 PM
  //   SATURDAY,Dang Quixote,HIGH DIVE,60,10:30:00 PM
  //   SATURDAY,Rose St.Germaine,HIGH DIVE,60,9:30:00 PM
  //   SATURDAY,Big Life,POLKA DOT,60,12:00:00 AM
  //   SATURDAY,Ryan Allen Band,POLKA DOT,60,11:00:00 PM
  //   SATURDAY,Honest to God jug band,POLKA DOT,60,10:00:00 PM
  //   SATURDAY,PHS,POLKA DOT,60,9:00:00 PM
  //   SATURDAY,Starlings,PAINTED LADY,60,12:45:00 AM
  //   SATURDAY,Reggi Roomers,PAINTED LADY,60,11:45:00 PM
  //   SATURDAY,Troy Gregory and the Mercury Gauntlett,PAINTED LADY,60,10:45:00 PM
  //   SATURDAY,Selma Oxor,PAINTED LADY,60,9:45:00 PM
  //   SATURDAY,Werewolf Jones,SEA LEAGUE,60,12:30:00 AM
  //   SATURDAY,Zastava,SEA LEAGUE,60,11:30:00 PM
  //   SATURDAY,Electric Bug,SEA LEAGUE,60,10:30:00 PM
  //   SATURDAY,Pretty Island,SEA LEAGUE,60,9:30:00 PM
  //   SATURDAY,Norcos y Horchata,CLUB COYOTE,60,12:30:00 AM
  //   SATURDAY,Yeji Boys,CLUB COYOTE,60,11:30:00 PM
  //   SATURDAY,Slizz,CLUB COYOTE,60,10:30:00 PM
  //   SATURDAY,Velvet Snakes,CLUB COYOTE,60,9:30:00 PM
  //   SATURDAY,Brian Blair,BANK SUEY,60,9:00:00 PM
  //   SATURDAY,Connor Dodson,BANK SUEY,60,8:00:00 PM
  //   SATURDAY,Patty Beef & Neighbor Dog Eat Pork & Beans,BANK SUEY,60,7:00:00 PM
  //   SATURDAY,Pedro Meadows,BANK SUEY,60,6:00:00 PM
  //   SATURDAY,FROSTisRad,NEW DODGE,60,12:30:00 AM
  //   SATURDAY,The Black List,NEW DODGE,60,11:30:00 PM
  //   SATURDAY,Kix94,NEW DODGE,60,10:30:00 PM
  //   SATURDAY,Federal Dank,NEW DODGE,60,9:30:00 PM
  //   SATURDAY,Doop and the Inside Outlaws,GHOST LIGHT,60,12:45:00 AM
  //   SATURDAY,Livernois,GHOST LIGHT,60,11:45:00 PM
  //   SATURDAY,Gold Crayon,GHOST LIGHT,60,10:45:00 PM
  //   SATURDAY,Gashounds,GHOST LIGHT,60,9:45:00 PM
  //   SATURDAY,Scott Z,ANT HALL,60,12:00:00 AM
  //   SATURDAY,Aunti Chanel,ANT HALL,60,11:00:00 PM
  //   SATURDAY,CANDYSHACK (Voodoo/Stimpak),ANT HALL,60,10:00:00 PM
  //   SATURDAY,Dirt Room,ANT HALL,60,9:00:00 PM
  //   SATURDAY,Amino Acids,SMALLS,60,12:25:00 AM
  //   SATURDAY,Idiot Kids,SMALLS,60,11:25:00 PM
  //   SATURDAY,Glass Chimera,SMALLS,55,10:30:00 PM
  //   SATURDAY,Bastardous,SMALLS,55,9:35:00 PM
  //   SATURDAY,Sonic Smut,SMALLS,55,8:40:00 PM
  //   SATURDAY,Dead Surf,SMALLS,55,7:45:00 PM
  //   SATURDAY,Core Values,WHISKEY,60,12:15:00 AM
  //   SATURDAY,Marcie and the Music Machine,WHISKEY,60,11:15:00 PM
  //   SATURDAY,Long Square,WHISKEY,60,10:15:00 PM
  //   SATURDAY,Palmer,WHISKEY,60,9:15:00 PM
  //   SATURDAY,Detroit Party Marching Band,PLAV POST 12,60,12:45:00 AM
  //   SATURDAY,Dear Darkness,PLAV POST 13,60,11:45:00 PM
  //   SATURDAY,Goldyngambit,PLAV POST 14,60,10:45:00 PM
  //   SATURDAY,Tears of a Martian,PLAV POST 15,60,9:45:00 PM
  //   SATURDAY,Day Residue,BUMBOS,60,12:00:00 AM
  //   SATURDAY,TY,BUMBOS,60,11:00:00 PM
  //   SATURDAY,buckshot98,BUMBOS,60,10:00:00 PM
  //   SATURDAY,Caveman Woodman,BUMBOS,60,9:00:00 PM
  //   SATURDAY,Matt Smith,HENRIETTAHAUS,60,12:15:00 AM
  //   SATURDAY,Same Eyes,HENRIETTAHAUS,60,11:15:00 PM
  //   SATURDAY,MOONMSST,HENRIETTAHAUS,60,10:15:00 PM
  //   SATURDAY,Dominant Hand,HENRIETTAHAUS,60,9:15:00 PM
  //   SATURDAY,Winestoned Cowboys,PORT BAR,60,12:30:00 AM
  //   SATURDAY,BRENDA,PORT BAR,60,11:30:00 PM
  //   SATURDAY,Menage Detroit,PORT BAR,60,10:30:00 PM
  //   SATURDAY,Bitch Kraft,PORT BAR,60,9:30:00 PM
  //   SATURDAY,,FLORIAN EAST,60,12:15:00 AM
  //   SATURDAY,Jackamo,FLORIAN EAST,60,11:15:00 PM
  //   SATURDAY,Yeddie,FLORIAN EAST,60,10:15:00 PM
  //   SATURDAY,Milan & The Ellipsis,FLORIAN EAST,60,9:15:00 PM
  //   SATURDAY,Secrets & Mike Trombley,BLACK SALT,240,9:00:00 PM
  //   SATURDAY,Danny Kroha,CAFE 1925,60,6:00:00 PM
  //   SATURDAY,Emily Rose ,CAFE 1926,60,5:30:00 PM
  //   SATURDAY,Chloe Drallos,CAFE 1927,60,4:50:00 PM
  //   SATURDAY,Jeffrey St John,CAFE 1928,60,4:10:00 PM
  //   SATURDAY,Matt Daher,COFFEETRON,60,8:00:00 PM
  //   SATURDAY,Stacy McCloud,COFFEETRON,60,7:00:00 PM
  //   SATURDAY,RobbyNine/Dusty D\'Annunzio,SHOWTIME,60,2:00:00 PM
  //   SATURDAY,RobbyNine/Dusty D\'Annunzio,SHOWTIME,60,8:00:00 PM`)
  // );
  //const schedule = useEventStore((state) => state.events);
  useEffect(() => {
    if (scheduleQuery) {
      const tempEvents = scheduleQuery.split("-");
      // console.log(tempEvents);

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
    //  console.log(schedule);
  }, [currentPage, schedule]);

  return (
    <>
      {" "}
      <div className="font-newAms">
        <main className=" mb-auto font-newAms z-40">
          <div className="z-50 top-0 sticky w-screen bg-gradient-to-br from-[#1F214D] via-[#50366F] via-[#BF3475] to-[#EE6C45]">
            <HouseBanner />
          </div>
          {currentPage == "selector" && <EventSelector events={events} />}
          {/* {currentPage == "schedule" && <EventSchedule />} */}
          {currentPage == "schedule" && scheduleType == "schedule" && <EventGrid />}
          {currentPage == "schedule" && scheduleType == "poster" && <EventPoster />}
          <div className="cursor-none h-[60px] fixed bottom-[60px]"></div>
        </main>
        <footer className="z-50">
          <div className=" fixed  bottom-[60px]">
            <div className="flex w-screen justify-end">
              <div>
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
                <BottomNav />
              </div>
            </div>
          </div>
        </footer>
        <ShareModal handler={shareSchedule} />
        <dialog id="poster-modal" className="modal">
          <div className="modal-box w-[80vw] h-[80vh]">
            <h3 className="font-bold text-lg"></h3>
            {posterImg && <p className="py-4">Success!</p>}

            {posterImg && <img src={posterImg} alt="" />}
            {!posterImg && (
              <>
                <div className="flex w-full justify-center items-center mt-48 gap-2">
                  <div className="animate-fade-right animate-once animate-duration-[2000ms] animate-delay-500 animate-ease-in text-xs">
                    ... loading image
                  </div>
                  <div className="animate-spin flex justify-center items-center w-14">
                    <LoadSpin />
                  </div>
                </div>
              </>
            )}
            <div className="modal-action">
              <form method="dialog ">
                <button
                  onClick={() => {
                    const dialogEl = document.getElementById("poster-modal");
                    dialogEl.close();
                    setPosterImg(null);
                  }}
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >
                  ✕
                </button>
                {posterImg && (
                  <>
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
                        setPosterImg(null);
                      }}
                      className="btn mx-2 hidden md:block"
                    >
                      Download
                    </button>
                    <button
                      onClick={() => {
                        shareMobileImage(posterImg);
                        const dialogEl = document.getElementById("poster-modal");
                        dialogEl.close();
                        setPosterImg(null);
                      }}
                      className="btn md:hidden"
                    >
                      Share
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </dialog>
      </div>{" "}
    </>
  );
}

export default App;
