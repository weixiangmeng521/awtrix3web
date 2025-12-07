/**
 * The native Time app offers extensive customization options. Almost everything can be configured via the API, and most settings can also be adjusted through the AWTRIX3 app.
 * The time format can be customized to your preferences. By default, it is set to HH:mm.
 * If the selected format doesn't fit on the screen, it will automatically revert to this default.
 * You might notice some lines at the bottom of the screen. These lines represent the weekdays, with the current day highlighted brighter. It is also possible to deactive this weekday bar.
 * You can also customize the colors for the calendar icon, the weekday bar and also the textcolor with the SettingsAPI or the mobile App.
 * The TMODE setting determines the layout and style of the Time App.
 */
const TMODE_MAPPING = [
    { mode: 0, img: new URL("@/assets/native_app/time/0.png", import.meta.url).href },
    { mode: 1, img: new URL("@/assets/native_app/time/1.png", import.meta.url).href },
    { mode: 2, img: new URL("@/assets/native_app/time/2.png", import.meta.url).href },
    { mode: 3, img: new URL("@/assets/native_app/time/3.png", import.meta.url).href },
    { mode: 4, img: new URL("@/assets/native_app/time/4.png", import.meta.url).href },
    { mode: 5, img: new URL("@/assets/native_app/time/5.png", import.meta.url).href },
    { mode: 6, img: new URL("@/assets/native_app/time/6.png", import.meta.url).href },
] as const;

export default TMODE_MAPPING;