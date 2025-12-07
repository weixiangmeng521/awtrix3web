
/**
 * Available Time Formats:
 * %H:%M:%S	13:30:45	24-hour time with seconds
 * %l:%M:%S	1:30:45	12-hour time with seconds
 * %H:%M	13:30	24-hour time
 * %H %M	13.30	24-hour time with blinking colon
 * %l:%M	1:30	12-hour time
 * %l %M	1:30	12-hour time with blinking colon
 * %l:%M %p	1:30 PM	12-hour time with AM/PM indicator
 * %l %M %p	1:30 PM	12-hour time with blinking colon and AM/PM
 */
export type AvailableTimeFormats =
  | "%H:%M:%S"
  | "%l:%M:%S"
  | "%H:%M"
  | "%H %M"
  | "%l:%M"
  | "%l %M"
  | "%l:%M %p"
  | "%l %M %p";
export type AvailableTimeFormat = typeof AvailableTimeFormats[number];


/**
 * Available Date Formats:
 * %d.%m.%y	16.04.22	Day.Month.Year (short)
 * %d.%m	16.04	Day.Month
 * %y-%m-%d	22-04-16	Year-Month-Day
 * %m-%d	04-16	Month-Day
 * %m/%d/%y	04/16/22	Month/Day/Year
 * %m/%d	04/16	Month/Day
 * %d/%m/%y	16/04/22	Day/Month/Year
 * %d/%m	16/04	Day/Month
 * %m-%d-%y	04-16-22	Month-Day-Year
 */
export type AvailableDateFormats =
  | "%d.%m.%y"
  | "%d.%m"
  | "%y-%m-%d"
  | "%m-%d"
  | "%m/%d/%y"
  | "%m/%d"
  | "%d/%m/%y"
  | "%d/%m"
  | "%m-%d-%y";
export type AvailableDateFormat = typeof AvailableDateFormats[number];



export type AwtrixStats = {
  bat: number;
  bat_raw: number;
  type: number;
  lux: number;
  ldr_raw: number;
  ram: number;
  bri: number;
  temp: number;
  hum: number;
  uptime: number;
  wifi_signal: number;
  messages: number;
  version: string;
  indicator1: boolean;
  indicator2: boolean;
  indicator3: boolean;
  app: string;
  uid: string;
  matrix: boolean;
  ip_address: string;
};

export type AppLoopInfo = {
  [key: string]: number;
}


export const OverlayEffects = [
  "clear",
  "snow",
  "rain",
  "drizzle",
  "storm",
  "thunder",
  "frost",
] as const;

export type OverlayEffect = typeof OverlayEffects[number];

/**
 * https://blueforcer.github.io/awtrix3/#/api?id=display-text-in-colored-fragments
 */
export interface AwtrixSettings {
  MATP: boolean; // ok
  ABRI: boolean; // OK
  BRI: number; // OK
  ATRANS: boolean; // OK
  TCOL: number; // OK
  TEFF: number;  // OK
  TSPEED: number; // OK
  ATIME: number; // OK
  /** Changes the time app style. */
  TMODE: number; // OK
  /** Calendar header color of the time app. */
  CHCOL: number;
  /** Calendar text color in the time app. */
  CTCOL: number;
  /** Calendar body color of the time app. */
  CBCOL: number;
  /** Time format for the TimeApp. */
  TFORMAT: string;
  /** Date format for the DateApp. */
  DFORMAT: string;
  /** Start the week on Monday. */
  SOM: boolean;
  /** Shows the temperature in Celsius (Fahrenheit when false). */
  CEL: boolean;
  BLOCKN: boolean; // ok
  UPPERCASE: boolean; // ok
  /** Color correction for the matrix. */
  CCORRECTION: string;
  /**	Color temperature for the matrix.  */
  CTEMP: string;
  /**	Enable or disable the weekday display. */
  WD: boolean;
  /** Active weekday color. */
  WDCA: number;
  /** Inactive weekday color. */
  WDCI: number;
  TIME_COL: number;
  DATE_COL: number;
  HUM_COL: number;
  TEMP_COL: number;
  BAT_COL: number;
  SSPEED: number; // OK
  TIM: boolean; // OK
  DAT: boolean; // OK
  HUM: boolean; // OK
  TEMP: boolean; // OK
  BAT: boolean; // OK
  /** Allows to set the volume of the buzzer and DFplayer. */
  VOL: number;
  /** Sets a global effect overlay (cannot be used with app specific overlays). */
  OVERLAY: string; // OK
}
