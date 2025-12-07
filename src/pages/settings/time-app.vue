<template>
    <AdminLayout>
        <template #main>
            <v-container class="flex">
                <v-row>
                    <v-col cols="12" md="4">
                        <AwtrixTimeAppTimeMode :settingInfo="settingsInfo"
                            @onTimeModeChanged="onTimeModeChangedEvent" />
                    </v-col>
                    <v-col cols="12" md="4">
                        <AwtrixTimeAppStyle :settingInfo="settingsInfo"
                            @onCalendarHeaderColorChanged="onCalendarHeaderColorChangedEvent"
                            @onCalendarTextColorChanged="onCalendarTextColorChangedEvent"
                            @onTimeAppTimeFormatChanged="onTimeAppTimeFormatChangedEvent"
                            @onCalendarBodyColorChanged="onCalendarBodyColorChangedEvent"
                             />
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
import type { AvailableTimeFormat, AwtrixSettings } from '@/api/awtrix';
import { useNotificationStore } from '@/hooks/useNotificationStore';
const awtrixClinet = ref<AwtrixClient>();
const appStore = useAppStore();
const settingsInfo = ref<AwtrixSettings>();
const notification = useNotificationStore();
const eventIntervalMap = ref<Map<string, number>>(new Map());
const intervalTime = 3000;


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


async function onTimeModeChangedEvent(mode: number) {
    if (!awtrixClinet.value) return;
    let data;
    try {
        data = await awtrixClinet.value.seTimeMode(mode);
    } catch (e) {
        notification.push("Awtrix connection error", 'error', intervalTime);
    }
}


async function onCalendarHeaderColorChangedEvent(color: string) {
    if (!awtrixClinet.value) return;
    try {
        await awtrixClinet.value.setCalendarHeaderColor(color);
    } catch (e) {
        notification.push("Awtrix connection error", 'error', intervalTime);
    }
}


async function onCalendarTextColorChangedEvent(color: string) {
    if (!awtrixClinet.value) return;
    try {
        await awtrixClinet.value.setCalendarTextColor(color);
    } catch (e) {
        notification.push("Awtrix connection error", 'error', intervalTime);
    }
}


async function onCalendarBodyColorChangedEvent(color: string) {
    if (!awtrixClinet.value) return;
    try {
        await awtrixClinet.value.setCalendarBodyColor(color);
    } catch (e) {
        notification.push("Awtrix connection error", 'error', intervalTime);
    }
}


async function onTimeAppTimeFormatChangedEvent(format: AvailableTimeFormat) {
    if (!awtrixClinet.value) return;
    try {
        await awtrixClinet.value.setTimeFormat(format);
    } catch (e) {
        notification.push("Awtrix connection error", 'error', intervalTime);
    }
}


async function intervalDeviceInfo() {
    await Promise.all([
        fetchAwtrixDeviceSettings(),
    ])
}


onBeforeMount(async () => {
    // make load faster
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
