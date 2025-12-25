import type { AppLoopInfo, AvailableTimeFormat, AwtrixSettings, AwtrixStats } from "./awtrix";

/**
 * @deprecated
 */
export default class AwtrixClient {
    private deviceIP: string;
    constructor(deviceIP: string) {
        this.deviceIP = deviceIP;
    }

    /**
     * get Awtrix Device Info
     * @deprecated
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
     * List of all transition effects
     * @deprecated
     */
    async getTransitionEffectList() {
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
     * @deprecated
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
     * @deprecated
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
     * @deprecated
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
     * @deprecated    
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
     * @deprecated    
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
     * @deprecated    
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
     * set calendar header color
     * @deprecated    
     */
    async setCalendarHeaderColor(color: number | string): Promise<string> {
        const payload = {
            CHCOL: color,
        };
        const response = await fetch(`http://${this.deviceIP}/api/settings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.text();
    }


    /**
     * Calendar body color of the time app. 
     * @deprecated    
     */
    async setCalendarBodyColor(color: number | string): Promise<string> {
        const payload = {
            CBCOL: color,
        };
        const response = await fetch(`http://${this.deviceIP}/api/settings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.text();
    }

    /**
     * Date text color of the time app. Use 0 for global text color.
     * @deprecated    
     */
    async setDateAppColor(color: number | string): Promise<string> {
        const payload = {
            DATE_COL: color,
        };
        const response = await fetch(`http://${this.deviceIP}/api/settings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.text();
    }


    /**
     * Date format for the DateApp.
     * @deprecated    
     */
    async setDateFormat(format: string): Promise<string> {
        const payload = {
            DFORMAT: format,
        };
        const response = await fetch(`http://${this.deviceIP}/api/settings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.text();
    }

    /**
     * Humidity text color of the time app. Use 0 for global text color.
     * @deprecated    
     */
    async setHumidityAppColor(color: number | string): Promise<string> {
        const payload = {
            HUM_COL: color,
        };
        const response = await fetch(`http://${this.deviceIP}/api/settings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.text();
    }

    /**
     * Temperature text color of the time app. Use 0 for global text color.
     * @deprecated    
     */
    async setTemperatureAppColor(color: number | string): Promise<string> {
        const payload = {
            TEMP_COL: color,
        };
        const response = await fetch(`http://${this.deviceIP}/api/settings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.text();
    }

    /**
     * Battery text color of the time app. Use 0 for global text color.
     * @deprecated    
     */
    async setBatteryAppColor(color: number | string): Promise<string> {
        const payload = {
            BAT_COL: color,
        };
        const response = await fetch(`http://${this.deviceIP}/api/settings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.text();
    }



    /**
     * Calendar text color in the time app.
     * @deprecated    
     */
    async setCalendarTextColor(color: number | string): Promise<string> {
        const payload = {
            CTCOL: color,
        };
        const response = await fetch(`http://${this.deviceIP}/api/settings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.text();
    }


    /**
     * Shows the temperature in Celsius (Fahrenheit when false).
     * @deprecated    
     */
    async setTempUnit(state: boolean): Promise<string> {
        const payload = {
            CEL: state,
        };
        const response = await fetch(`http://${this.deviceIP}/api/settings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.text();
    }



    /**
     * Time format for the TimeApp.
     * @deprecated    
     */
    async setTimeFormat(format: AvailableTimeFormat): Promise<string> {
        const payload = {
            TFORMAT: format,
        };
        const response = await fetch(`http://${this.deviceIP}/api/settings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.text();
    }


    /**
     * set Matrix brightness.
     * @deprecated    
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
     * @deprecated    
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
     * Choose between app transition effects.
     * @deprecated    
     */
    async setTransitionEffect(value: number) {
        const payload = {
            TEFF: value,
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
     * @deprecated    
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
     * Time taken for the transition to the next app in milliseconds.
     * @deprecated    
    */
    async setTranstionTime(time: number) {
        const payload = {
            TSPEED: time,
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
     * Global text color.
     * @deprecated    
    * @param color	RGB array or hex color
    */
    async setGlobalTextColor(color: string | number) {
        const payload = {
            TCOL: color,
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
     * Sets a global effect overlay (cannot be used with app specific overlays).
     * @deprecated    
     * @param key {OverlayEffects}
    */
    async setOverlayEffect(key: string) {
        const payload = {
            OVERLAY: key,
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
     * Scroll speed modification
     * @deprecated    
     * @param num 0-100%
    */
    async setScrollSpeedModification(num: number) {
        const payload = {
            SSPEED: num,
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
     * Display text in uppercase.
     * @deprecated
    */
    async setDisplayTextInUppercase(value: boolean) {
        const payload = {
            UPPERCASE: value,
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
     * Duration an app is displayed in seconds.
     * @deprecated    
    */
    async setDurationAnAppIsDisplayedInSeconds(sec: number) {
        const payload = {
            ATIME: sec,
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
     * Block physical navigation keys (still sends input to MQTT).
     * @deprecated
    */
    async setBlockPhysicalNavigationKeys(state: Boolean) {
        const payload = {
            BLOCKN: state,
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
     * Play a RTTTL sound from a given RTTTL string:
     * @deprecated    
    */
    async sendRTTTLSoundFromString(str: string) {
        const payload = {
            rttl: str,
        }
        const response = await fetch(`http://${this.deviceIP}/api/rtttl`, {
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
     * Play a RTTTL sound from the MELODIES folder. If you're using a DFplayer, use the /sound API and enter the 4 digit number of your MP3.
     * @deprecated    
    */
    async sendPlaySound(soundName: string) {
        const payload = {
            "sound": soundName,
        }
        const response = await fetch(`http://${this.deviceIP}/api/sound`, {
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
     * @deprecated    
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



    /**
     * Changes the time app style.
     * @deprecated    
     */
    async seTimeMode(mode: number) {
        const payload = {
            TMODE: mode,
        }
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



    /**
     * Text color of the time app. Use 0 for global text color.
     * @deprecated    
     */
    async setTextColorOfTimeApp(color: number | string) {
        const payload = {
            TIME_COL: color,
        }
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

    /**
     * Enable or disable the native time app (requires reboot). 
     * @deprecated
     * @param state 
     * @returns 
     */ 
    async setTIM_APPState(state: boolean) {
        return this.setNativeAppState("TIM", state);
    }

    /**
     * Enable or disable the native time app (requires reboot). 
     * @deprecated
     * @param state 
     * @returns 
     */     
    async setDAT_APPState(state: boolean) {
        return this.setNativeAppState("DAT", state);
    }

    /**
     * Enable or disable the native time app (requires reboot). 
     * @deprecated
     * @param state 
     * @returns 
     */     
    async setHUM_APPState(state: boolean) {
        return this.setNativeAppState("HUM", state);
    }

    /**
     * Enable or disable the native time app (requires reboot). 
     * @deprecated
     * @param state 
     * @returns 
     */     
    async setTEMP_APPState(state: boolean) {
        return this.setNativeAppState("TEMP", state);
    }

    /**
     * Enable or disable the native time app (requires reboot). 
     * @deprecated
     * @param state 
     * @returns 
     */     
    async setBAT_APPState(state: boolean) {
        return this.setNativeAppState("BAT", state);
    }

    /**
     * Enable or disable the native time app (requires reboot). 
     * @deprecated
     * @param state 
     * @returns 
     */     
    async setMATP_APPState(state: boolean) {
        return this.setNativeAppState("MATP", state);
    }

    /**
     * reboot device
     * @deprecated    
    */
    async reboot() {
        const response = await fetch(`http://${this.deviceIP}/api/reboot`, {
            method: 'POST',
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
     * wait device reconnection.
     * @deprecated    
     */
    async requestUntilSuccess() {
        const request = async (maxWait = 3000) => {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), maxWait);
            try {
                const response = await fetch(`http://${this.deviceIP}/api/stats`, {
                    method: 'GET',
                    signal: controller.signal,
                });

                clearTimeout(timeout);

                if (!response.ok) {
                    return void 0;
                }

                return await response.json();
            } catch (err) {
                // 超时或网络错误都会进入这里
                return void 0;
            }
        };

        while (true) {
            const res = await request(1000);
            if (!res) {
                await new Promise(r => setTimeout(() => r(void 0), 100));
                console.log("Reconnect...");
                continue;
            }
            console.log("Connected...");
            return
        }
    }


}