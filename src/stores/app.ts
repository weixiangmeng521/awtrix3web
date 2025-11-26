// Utilities
import type { AwtrixStats } from '@/api/awtrix';
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    connectedDeviceIp: '',
    awtrixInfo: null as null | AwtrixStats,
  }),
  getters: {
    getConnectedDeviceIp: (state) => state.connectedDeviceIp,
    getAwtrixInfo: (state) => state.awtrixInfo,
  },
  actions: {
    setShouldConnectDeviceIp(ip: string) {
      this.connectedDeviceIp = ip;
    },
    setAwtrixDeviceVersion(info: AwtrixStats) {
      this.awtrixInfo = info;
    },
  },
})
