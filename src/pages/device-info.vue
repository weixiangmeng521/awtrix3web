<template>
  <AdminLayout>
    <template #main>
      <v-container class="flex" max-width="1200">
        <v-row>
          <v-col cols="12" md="4">
            <AwtrixDeviceInfo :deviceInfo="deviceInfo" />
          </v-col>
          <v-col cols="12" md="4">
            <AwtrixAppInfo :appInfo="appLoopInfo" :settingInfo="settingsInfo" :currentApp="deviceInfo?.app"
              :powerState="deviceInfo?.matrix ?? false" :autoBrightness="settingsInfo?.ABRI ?? false"
              :autoNextApp="settingsInfo?.ATRANS ?? false" @change-power="changePowerEvent"
              @change-auto-brightness="changeAutoBrightnessEvent" @change-auto-next-app="changeAutoNext2AppEvent"
              @change-app="changeAppEvent" @onScreenBrightnessSet="changeScreenBrightnessEvent" />
          </v-col>
          <v-col cols="12" md="4">
            <AwtrixNativeApp :settingInfo="settingsInfo" @changed-dat-app-state="changedDatAppStateEvent"
              @changed-hum-app-state="changedHumAppStateEvent" @changed-matp-app-state="changedMatpAppStateEvent"
              @changed-temp-app-state="changedTempAppStateEvent" @changed-tim-app-state="changedTimAppStateEvent" />

          </v-col>
        </v-row>
      </v-container>
    </template>
  </AdminLayout>
</template>

<script lang="ts" setup>
import AdminLayout from '@/layouts/AdminLayout.vue';
import AwtrixDeviceInfo from '@/components/AwtrixDeviceInfo.vue';
import AwtrixAppInfo from "@/components/AwtrixAppInfo.vue";
import { useAppStore } from '@/stores/app';
import AwtrixClient from '@/api/awtrixClient';
import type { AppLoopInfo, AwtrixSettings, AwtrixStats } from '@/api/awtrix';
import { useNotificationStore } from '@/hooks/useNotificationStore';
const awtrixClinet = ref<AwtrixClient>();
const appStore = useAppStore();
const deviceInfo = ref<AwtrixStats>();
const settingsInfo = ref<AwtrixSettings>();
const appLoopInfo = ref<AppLoopInfo>();
const notification = useNotificationStore();
const eventIntervalMap = ref<Map<string, number>>(new Map());
const intervalTime = 1000;

// Enable or disable the native date app (requires reboot).
async function changedDatAppStateEvent(state: Boolean) {
  if (!awtrixClinet.value) return;
  try {
    await awtrixClinet.value.setDAT_APPState(state as boolean);
  } catch (e) {
    notification.push("Awtrix connection error", 'error', intervalTime);
  }
  notification.push("Changing this setting requires restarting the device.", 'warning', intervalTime * 2);
}

// 	Enable or disable the native humidity app (requires reboot).
async function changedHumAppStateEvent(state: Boolean) {
  if (!awtrixClinet.value) return;
  try {
    await awtrixClinet.value.setHUM_APPState(state as boolean);
  } catch (e) {
    notification.push("Awtrix connection error", 'error', intervalTime);
  }
  notification.push("Changing this setting requires restarting the device.", 'warning', intervalTime * 2);
}

// Enable or disable the native temperature app (requires reboot).
async function changedTempAppStateEvent(state: Boolean) {
  if (!awtrixClinet.value) return;
  try {
    await awtrixClinet.value.setTEMP_APPState(state as boolean);
  } catch (e) {
    notification.push("Awtrix connection error", 'error', intervalTime);
  }
  notification.push("Changing this setting requires restarting the device.", 'warning', intervalTime * 2);
}

// 	Enable or disable the native time app (requires reboot).
async function changedTimAppStateEvent(state: Boolean) {
  if (!awtrixClinet.value) return;
  try {
    await awtrixClinet.value.setTIM_APPState(state as boolean);
  } catch (e) {
    notification.push("Awtrix connection error", 'error', intervalTime);
  }
  notification.push("Changing this setting requires restarting the device.", 'warning', intervalTime * 2);
}

// Enable or disable the matrix. Similar to power endpoint but without the animation.
async function changedMatpAppStateEvent(state: Boolean) {
  if (!awtrixClinet.value) return;
  try {
    await awtrixClinet.value.setMATP_APPState(state as boolean);
  } catch (e) {
    notification.push("Awtrix connection error", 'error', intervalTime);
  }
  notification.push("Changing this setting requires restarting the device.", 'warning', intervalTime * 2);
}

// change power event
async function changePowerEvent(state: Boolean) {
  if (!awtrixClinet.value) return;
  try {
    await awtrixClinet.value.setAwtrixPower(state);
  } catch (e) {
    notification.push("Awtrix connection error", 'error', intervalTime);
  }
}


// change auto brightness
async function changeAutoBrightnessEvent(state: Boolean) {
  if (!awtrixClinet.value) return;
  try {
    await awtrixClinet.value.setBrightnessAutoControll(state as boolean);
  } catch (e) {
    notification.push("Awtrix connection error", 'error', intervalTime);
  }
}


// Automatic switching to the next app.
async function changeAutoNext2AppEvent(state: Boolean) {
  if (!awtrixClinet.value) return;
  try {
    await awtrixClinet.value.setAutoSwitching2NextApp(state as boolean);
  } catch (e) {
    notification.push("Awtrix connection error", 'error', intervalTime);
  }
}

// Switch to Specific App
async function changeAppEvent(appname: string) {
  if (!awtrixClinet.value) return;
  try {
    await awtrixClinet.value.setSpecificApp(appname);
  } catch (e) {
    notification.push("Awtrix connection error", 'error', intervalTime);
  }
}

// Matrix brightness.
async function changeScreenBrightnessEvent(value: number) {
  if (!awtrixClinet.value) return;
  try {
    await awtrixClinet.value.setMatrixBrightness(value);
  } catch (e) {
    notification.push("Awtrix connection error", 'error', intervalTime);
  }
  if (value > 200) {
    notification.push("Brightness above 200 is not recommended, as it may damage the LED lights.", 'warning', intervalTime * 2);
  }
}


/**
 * get all looping app
 */
async function fetchApiLoop() {
  if (!awtrixClinet.value) return;
  let data;
  try {
    data = await awtrixClinet.value.getAwtrixApiLoopInfo();
  } catch (e) {
    notification.push("Awtrix connection error", 'error', intervalTime);
  }
  appLoopInfo.value = data;
}

/**
 * get awtrix device info
 */
async function fetchAwtrixDeviceInfo() {
  if (!awtrixClinet.value) return;
  let data;
  try {
    data = await awtrixClinet.value.getAwtrixDeviceInfo();
  } catch (e) {
    notification.push("Awtrix connection error", 'error', intervalTime);
  }
  deviceInfo.value = data;
  data && appStore.setAwtrixDeviceInfo(data)
}


async function fetchAwtrixDeviceSettings() {
  if (!awtrixClinet.value) return;
  let data;
  try {
    data = await awtrixClinet.value.getSettingInfo();
  } catch (e) {
    notification.push("Awtrix connection error", 'error', intervalTime);
  }
  settingsInfo.value = data;
  data && appStore.setAwtrixSettings(data)
}


async function intervalDeviceInfo() {
  await Promise.all([
    fetchAwtrixDeviceInfo(),
    fetchAwtrixDeviceSettings(),
  ])
}


onBeforeMount(async () => {
  // init
  await fetchAwtrixDeviceInfo();
  await fetchApiLoop();
})


onMounted(() => {
  awtrixClinet.value = new AwtrixClient(appStore.getConnectedDeviceIp);
  const h = setInterval(intervalDeviceInfo, 2000);
  eventIntervalMap.value.set("intervalDeviceInfo", h);
})

onUnmounted(() => {
  const h = eventIntervalMap.value.get("intervalDeviceInfo");
  clearInterval(h)
})
</script>
