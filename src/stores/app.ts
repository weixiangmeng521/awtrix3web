// Utilities
import type { AwtrixSettings, AwtrixStats } from '@/api/awtrix';
import { defineStore } from 'pinia'


function isObject(val: unknown): val is Record<string, any> {
  return val !== null && typeof val === "object" && !Array.isArray(val);
}


// theme type
export type SystemThemeType = 'dark' | 'light';
export const useAppStore = defineStore('app', {
  state: () => ({
    theme: (localStorage.getItem('theme') as SystemThemeType) || 'light',
    connectedDeviceIp: localStorage.getItem('connectedDeviceIp') || '',
    awtrixInfo: JSON.parse(localStorage.getItem('awtrixInfo') || 'null'),
    awtrixSettings: JSON.parse(localStorage.getItem('awtrixSettings') || 'null'),
    awtrixTransitionEffects: JSON.parse(
      localStorage.getItem('awtrixTransitionEffects') || '[]'
    ),
  }),
  getters: {
    getSystemTheme: (state) => state.theme,
    getConnectedDeviceIp: (state) => state.connectedDeviceIp,
    getAwtrixInfo: (state) => state.awtrixInfo,
    getAwtrixSettings: (state) => state.awtrixSettings,
    getAwtrixTransitionEffects: (state) => state.awtrixTransitionEffects,
  },
  actions: {
    setShouldConnectDeviceIp(ip: string) {
      this.connectedDeviceIp = ip
      localStorage.setItem('connectedDeviceIp', ip)
    },

    setAwtrixDeviceInfo(info: AwtrixStats) {
      this.awtrixInfo = info
      localStorage.setItem('awtrixInfo', JSON.stringify(info))
    },

    setAwtrixSettings(info: AwtrixSettings) {
      this.awtrixSettings = info
      localStorage.setItem('awtrixSettings', JSON.stringify(info))
    },

    setSystemTheme(theme: SystemThemeType) {
      this.theme = theme
      localStorage.setItem('theme', theme)
    },

    setAwtrixTransitionEffects(list: string[]) {
      this.awtrixTransitionEffects = list
      localStorage.setItem(
        'awtrixTransitionEffects',
        JSON.stringify(list)
      )
    },

    clearConnection() {
      this.connectedDeviceIp = ''
      this.awtrixInfo = null
      this.awtrixSettings = null
      this.awtrixTransitionEffects = []

      localStorage.removeItem('connectedDeviceIp')
      localStorage.removeItem('awtrixInfo')
      localStorage.removeItem('awtrixSettings')
      localStorage.removeItem('awtrixTransitionEffects')
    },

    clearAll() {
      this.$reset()          // ✅ 正确清空 store
      localStorage.clear()   // ⚠️ 如果你只想清 app 的，建议只 remove 指定 key
    }
  }
})
