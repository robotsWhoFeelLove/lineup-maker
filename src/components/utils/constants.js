import { getDays } from "../../handlers/dateTimeHandlers";

export const DAY_WIDTH = window.innerWidth < 500 ? window.innerWidth : (window.innerWidth - 65) / getDays().length;
