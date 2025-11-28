// Utilities
import type { AwtrixStats } from '@/api/awtrix';
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
    }catch(e){
      return data as T;
    }
  }
  return (state as { [key: string]: unknown })[key] as T;
}


function setData2LocalStoraget(that: any, key: string, data: unknown){
  const obj = that as unknown as { [key: string]: unknown };
  obj[key] = data;
}



export const useAppStore = defineStore('app', {
  state: () => ({
    connectedDeviceIp: '',
    awtrixInfo: null as null | AwtrixStats,
  }),
  getters: {
    getConnectedDeviceIp: (state) => {
      return loadDataBoforeCheckLocalStorage<string>('connectedDeviceIp', state);
    },
    getAwtrixInfo: (state) => {
      const data = loadDataBoforeCheckLocalStorage<AwtrixStats>('awtrixInfo', state);
      console.log(data);
      return data;
    },
  },
  actions: {
    setShouldConnectDeviceIp(ip: string) {
      setData2LocalStoraget(this, "connectedDeviceIp", ip)
    },
    setAwtrixDeviceVersion(info: AwtrixStats) {
      setData2LocalStoraget(this, "awtrixInfo", info)
    },
  },
})
