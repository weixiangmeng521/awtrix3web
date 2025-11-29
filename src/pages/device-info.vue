<template>
  <AdminLayout>
    <template #main>
      <v-container class="flex" max-width="1200">
        <v-row>
          <v-col cols="12" md="4">
            <AwtrixDeviceInfo :deviceInfo="deviceInfo" />
          </v-col>
          <v-col cols="12" md="4">
            <AwtrixAppInfo :appInfo="appLoopInfo" :currentApp="deviceInfo?.app"
              :powerState="deviceInfo?.matrix ?? false" 
              :autoBrightness="autoBrightnessState"
              @change-power="changePowerEvent"
              @change-auto-brightness="changeAutoBrightnessEvent" />
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
import type { AppLoopInfo, AwtrixStats } from '@/api/awtrix';
import { useNotificationStore } from '@/hooks/useNotificationStore';
const awtrixClinet = ref<AwtrixClient>();
const appStore = useAppStore();
const deviceInfo = ref<AwtrixStats>();
const appLoopInfo = ref<AppLoopInfo>();
const notification = useNotificationStore();
const eventIntervalMap = ref<Map<string, number>>(new Map());
const intervalTime = 1000;
const autoBrightnessState = ref(false);

// change power event
async function changePowerEvent(state: Boolean) {
  if (!awtrixClinet.value) return;
  let data;
  try {
    data = await awtrixClinet.value.setAwtrixPower(state);
  } catch (e) {
    notification.push("Awtrix connection error", 'error', intervalTime);
  }
}

// change auto brightness
async function changeAutoBrightnessEvent(state: Boolean) {
  if (!awtrixClinet.value) return;
  let data;
  try {
    data = await awtrixClinet.value.setBrightnessAutoControll(state as boolean);
  } catch (e) {
    notification.push("Awtrix connection error", 'error', intervalTime);
  }
  autoBrightnessState.value = !autoBrightnessState.value;
}


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


async function intervalDeviceInfo() {
  await fetchAwtrixDeviceInfo()
}


onMounted(() => {
  awtrixClinet.value = new AwtrixClient(appStore.getConnectedDeviceIp);
  const h = setInterval(intervalDeviceInfo, 3000);
  eventIntervalMap.value.set("intervalDeviceInfo", h);
  // init
  fetchAwtrixDeviceInfo();
  fetchApiLoop();
})

onUnmounted(() => {
  const h = eventIntervalMap.value.get("intervalDeviceInfo");
  clearInterval(h)
})
</script>
