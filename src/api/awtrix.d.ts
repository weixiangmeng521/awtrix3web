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
  TCOL: number;
  TEFF: number;
  TSPEED: number;
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
  SSPEED: number;
  TIM: boolean; // OK
  DAT: boolean; // OK
  HUM: boolean; // OK
  TEMP: boolean; // OK
  BAT: boolean; // OK
  VOL: number;
  OVERLAY: string;
}
