import type { AwtrixStats } from "./awtrix";

export default class AwtrixClient{
    private deviceIP: string;
    constructor(deviceIP: string){
        this.deviceIP = deviceIP;
    }

    /**
     * get Awtrix Device Info
     * @returns 
     */
    async getAwtrixDeviceInfo(): Promise<AwtrixStats>{
        const response = await fetch(`http://${this.deviceIP}/api/stats`, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }



}