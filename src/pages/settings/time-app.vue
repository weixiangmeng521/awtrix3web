<template>
    <AdminLayout>
        <template #main>
            <v-container class="flex">
                <v-row>
                    <v-col cols="12" md="4">
                        <AwtrixTimeAppController :settingInfo="settingsInfo" @onTimeModeChanged="onTimeModeChangedEvent"/>
                    </v-col>
                </v-row>
            </v-container>
        </template>
    </AdminLayout>
</template>

<script lang="ts" setup>
import AdminLayout from '@/layouts/AdminLayout.vue';
import { useAppStore } from '@/stores/app';
import AwtrixClient from '@/api/awtrixClient';
import type { AwtrixSettings, AwtrixStats } from '@/api/awtrix';
import { useNotificationStore } from '@/hooks/useNotificationStore';
const awtrixClinet = ref<AwtrixClient>();
const appStore = useAppStore();
const deviceInfo = ref<AwtrixStats>();
const settingsInfo = ref<AwtrixSettings>();
const notification = useNotificationStore();
const eventIntervalMap = ref<Map<string, number>>(new Map());
const intervalTime = 3000;


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


async function onTimeModeChangedEvent(mode:number) {
    if (!awtrixClinet.value) return;
    let data;
    try {
        data = await awtrixClinet.value.seTimeMode(mode);
    } catch (e) {
        notification.push("Awtrix connection error", 'error', intervalTime);
    }
}


async function intervalDeviceInfo() {
    await Promise.all([
        fetchAwtrixDeviceInfo(),
        fetchAwtrixDeviceSettings(),
    ])
}


onBeforeMount(async () => {
    // init

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
