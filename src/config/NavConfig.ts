import type { IconValue } from "vuetify/lib/composables/icons.mjs";

/**
 * Navigation list
 */
const navList = [
    {
        name: "Device Scanner",
        link: "/scanner",
        icon: "mdi-memory"
    }
] as NavItem[];


export interface NavItem {
    name: string,
    link: string,
    icon?: IconValue
}

export default navList;