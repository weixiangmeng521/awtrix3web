<template>
  <AdminLayout>
    <template #main>
      <v-container class="flex">
        <v-row>
          <v-col cols="12">
            <AwtrixDeviceInfo :deviceInfo="deviceInfo" />
          </v-col>

        </v-row>
      </v-container>
    </template>
  </AdminLayout>
</template>

<script lang="ts" setup>
import AdminLayout from '@/layouts/AdminLayout.vue';
import AwtrixDeviceInfo from '@/components/AwtrixDeviceInfo.vue';
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
const intervalTime = 3000;
const transitionList = ref<string[]>([]);


/**
 * get all of the transition effect list
 */
async function getTransitionEffectList(){
  if (!awtrixClinet.value) return;
  let list:string[] = [];
  try {
    list = await awtrixClinet.value.getTransitionEffectList();
  } catch (e) {
    notification.push("Awtrix connection error", 'error', intervalTime);
  }
  transitionList.value = list;
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
    await fetchAwtrixDeviceInfo(),
    await fetchAwtrixDeviceSettings(),
  ])
}


onBeforeMount(async () => {
  // init
  await Promise.all([await fetchAwtrixDeviceInfo(), await fetchApiLoop(), await getTransitionEffectList()]);
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
