import { useAppStore } from "@/stores/app";
import type { IconValue } from "vuetify/lib/composables/icons.mjs";


// should check events mapper list
const CheckerEventsMapper:{[key:string]:(...args:unknown[]) => string | undefined} = {
    DEVICE_CONNECTION: () => {
        const appStore = useAppStore();
        if(!appStore.getConnectedDeviceIp){
            return "Please establish a connection to a device first.";
        }
        return void 0;
    }
}


/**
 * Navigation list
 * https://pictogrammers.com/library/mdi/
 */
const navList = [
    {
        name: "Home",
        link: "/",
        icon: "mdi-home",
        children: [],
    },
    {
        name: "Device Scanner",
        link: "/scanner",
        icon: "mdi-home-search-outline",
        children: [],
    },
    {
        name: "Device Info",
        link: "/device-info",
        check: ["DEVICE_CONNECTION"],
        icon: "mdi-memory",
        children: [],
    },
    {
        name: "Device Setting",
        check: ["DEVICE_CONNECTION"],
        icon: "mdi-cog-outline",
        children: [
            {
                name: "General",
                link: "/device-setting",
                check: ["DEVICE_CONNECTION"],
                icon: "mdi-tune-vertical-variant"
            },
            {
                name: "TIME APP",
                link: "/settings/time-app",
                check: ["DEVICE_CONNECTION"],
                icon: "mdi-clock-time-eight-outline"
            },            
            {
                name: "DATE APP",
                link: "/settings/date-app",
                check: ["DEVICE_CONNECTION"],
                icon: "mdi-calendar"
            },
            {
                name: "TEMP APP",
                link: "/settings/temperature-app",
                check: ["DEVICE_CONNECTION"],
                icon: "mdi-thermometer"
            },                       
        ],
    },
] as NavItem[];


// get matched event callback
export const getMatchedEventCallback = (eventName: string) => {
    for (const key in CheckerEventsMapper) {
        if (key === eventName) {
            return CheckerEventsMapper[key];
        }
    }
    return void 0;
}


export interface NavItem {
    name: string,
    link: string,
    icon?: IconValue,
    check?: string[]
    children: NavItem[],
}

export default navList;