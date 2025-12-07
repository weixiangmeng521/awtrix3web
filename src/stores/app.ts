// Utilities
import type { AwtrixSettings, AwtrixStats } from '@/api/awtrix';
import { defineStore, type PiniaCustomStateProperties, type StateTree } from 'pinia'


/**
 * load data from localStorage before checking store
 * @param key 
 * @returns 
 */
const loadDataBoforeCheckLocalStorage = <T>(key: string, state: PiniaCustomStateProperties<StateTree>): T => {
  const data = window.localStorage.getItem(key);
  if (data) {
    try {
      const res = JSON.parse(data) as T;
      return res as T;
    } catch (e) {
      return data as T;
    }
  }
  return (state as { [key: string]: unknown })[key] as T;
}


function setData2LocalStoraget(that: any, key: string, data: unknown) {
  const obj = that as unknown as { [key: string]: unknown };
  obj[key] = data;
  window.localStorage.setItem(key, JSON.stringify(data));
}

// theme type
export type SystemThemeType = 'dark' | 'light';


export const useAppStore = defineStore('app', {
  state: () => ({
    theme: 'light' as SystemThemeType,
    connectedDeviceIp: '',
    awtrixInfo: null as null | AwtrixStats,
    awtrixSettings: null as null | AwtrixSettings,
    awtrixTransitionEffects: [] as string[],
  }),
  getters: {
    getSystemTheme: (state) => {
      return loadDataBoforeCheckLocalStorage<string>('theme', state);
    },
    getConnectedDeviceIp: (state) => {
      return loadDataBoforeCheckLocalStorage<string>('connectedDeviceIp', state);
    },
    getAwtrixInfo: (state) => {
      return loadDataBoforeCheckLocalStorage<AwtrixStats>('awtrixInfo', state);
    },
    getAwtrixSettings: (state) => {
      return loadDataBoforeCheckLocalStorage<AwtrixSettings>('awtrixSettings', state);
    },
    getAwtrixTransitionEffects: (state) => {
      return loadDataBoforeCheckLocalStorage<string[]>('awtrixTransitionEffects', state);
    }
  },
  actions: {
    setShouldConnectDeviceIp(ip: string) {
      setData2LocalStoraget(this, "connectedDeviceIp", ip)
    },
    setAwtrixDeviceInfo(info: AwtrixStats) {
      setData2LocalStoraget(this, "awtrixInfo", info)
    },
    setAwtrixSettings(info: AwtrixSettings) {
      setData2LocalStoraget(this, "awtrixSettings", info)
    },
    setSystemTheme(theme: SystemThemeType){
      setData2LocalStoraget(this, 'theme', theme)
    },
    setAwtrixTransitionEffects(list:string[]){
      setData2LocalStoraget(this, 'awtrixTransitionEffects', list)
    },
    clearAll() {
      window.localStorage.clear();
      this.$dispose();
    }
  },
})
