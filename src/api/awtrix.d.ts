
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

export type AppLoopInfo= {
    [key:string]: number;
}

export interface AwtrixSettings {
  MATP: boolean; // ok
  ABRI: boolean; // OK
  BRI: number; // OK
  ATRANS: boolean; // OK
  TCOL: number; // OK
  TEFF: number;  // OK
  TSPEED: number; // OK
  ATIME: number;
  TMODE: number;
  CHCOL: number;
  CTCOL: number;
  CBCOL: number;
  TFORMAT: string;
  DFORMAT: string;
  SOM: boolean;
  CEL: boolean;
  BLOCKN: boolean;
  MAT: number;
  SOUND: boolean;
  GAMMA: number;
  UPPERCASE: boolean;
  CCORRECTION: string;
  CTEMP: string;
  WD: boolean;
  WDCA: number;
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
  OVERLAY: string;
}
