import type { IconValue } from "vuetify/lib/composables/icons.mjs";

/**
 * Navigation list
 * https://pictogrammers.com/library/mdi/
 */
const navList = [
    {
        name: "Home",
        link: "/",
        icon: "mdi-home"
    },    
    {
        name: "Device Scanner",
        link: "/scanner",
        icon: "mdi-memory"
    },
    {
        name: "Device Info",
        link: "/device-info",
        icon: "mdi-memory"
    },    
] as NavItem[];


export interface NavItem {
    name: string,
    link: string,
    icon?: IconValue
}

export default navList;