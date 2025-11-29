import type { AppLoopInfo, AwtrixStats } from "./awtrix";

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
     * set brightness auto controll
     */
    async setBrightnessAutoControll(state:boolean){
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

}