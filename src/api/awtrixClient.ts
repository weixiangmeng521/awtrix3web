import type { AppLoopInfo, AwtrixSettings, AwtrixStats } from "./awtrix";

export default class AwtrixClient {
    private deviceIP: string;
    constructor(deviceIP: string) {
        this.deviceIP = deviceIP;
    }

    /**
     * get Awtrix Device Info
     * @returns 
     */
    async getAwtrixDeviceInfo(): Promise<AwtrixStats> {
        const response = await fetch(`http://${this.deviceIP}/api/stats`, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        return data;
    }

    /**
     * get Awtrix Device Info
     * @returns 
     */
    async getAwtrixApiLoopInfo(): Promise<AppLoopInfo> {
        const response = await fetch(`http://${this.deviceIP}/api/loop`, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }

    /**
     * get Awtrix Device Info
     * @returns 
     */
    async getAlTransitions(): Promise<Array<String>> {
        const response = await fetch(`http://${this.deviceIP}/api/transitions`, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }

    /**
     * get Awtrix Device Info
     * @returns 
     */
    async getAllEffects(): Promise<Array<String>> {
        const response = await fetch(`http://${this.deviceIP}/api/effects`, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }



    /**
    * set awtrix power
    */
    async setAwtrixPower(state: Boolean): Promise<string> {
        const payload = {
            power: state,
        }
        const response = await fetch(`http://${this.deviceIP}/api/power`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.text();
        return data;
    }

    /**
     * get setting info
     */
    async getSettingInfo(): Promise<AwtrixSettings> {
        const response = await fetch(`http://${this.deviceIP}/api/settings`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }

    /**
     * set brightness auto controll
     */
    async setBrightnessAutoControll(state: boolean): Promise<string> {
        const payload = {
            ABRI: state,
        }
        const response = await fetch(`http://${this.deviceIP}/api/settings`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.text();
        return data;
    }

    /**
    * set Matrix brightness.
    */
    async setMatrixBrightness(value: number) {
        const payload = {
            BRI: value,
        }
        const response = await fetch(`http://${this.deviceIP}/api/settings`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.text();
        return data;
    }


    /**
     * Automatic switching to the next app.
     */
    async setAutoSwitching2NextApp(state: boolean) {
        const payload = {
            ATRANS: state,
        }
        const response = await fetch(`http://${this.deviceIP}/api/settings`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.text();
        return data;
    }


    /**
    * Switch to Specific App
    */
    async setSpecificApp(appname: string) {
        const payload = {
            name: appname,
        }
        const response = await fetch(`http://${this.deviceIP}/api/switch`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.text();
        return data;
    }

    /**
     * Internal helper: enable or disable a native AWTRIX app
     */
    private async setNativeAppState(app: string, state: boolean) {
        const payload = {
            [app]: state ? 1 : 0
        };

        const response = await fetch(`http://${this.deviceIP}/api/settings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.text();
    }

    /* ------------------------------
       Native App Toggles (Require Reboot)
    --------------------------------- */

    // Enable or disable the native time app (requires reboot).
    async setTIM_APPState(state: boolean) {
        return this.setNativeAppState("TIM", state);
    }

    // Enable or disable the native date app (requires reboot).
    async setDAT_APPState(state: boolean) {
        return this.setNativeAppState("DAT", state);
    }

    // Enable or disable the native humidity app (requires reboot).
    async setHUM_APPState(state: boolean) {
        return this.setNativeAppState("HUM", state);
    }

    // Enable or disable the native temperature app (requires reboot).
    async setTEMP_APPState(state: boolean) {
        return this.setNativeAppState("TEMP", state);
    }

    // Enable or disable the native battery app (requires reboot).
    async setBAT_APPState(state: boolean) {
        return this.setNativeAppState("BAT", state);
    }

    // Enable or disable the matrix app (like power but without animation)
    async setMATP_APPState(state: boolean) {
        return this.setNativeAppState("MATP", state);
    }

}