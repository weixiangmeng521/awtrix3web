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
import type { AwtrixSettings, AwtrixStats } from '@/api/awtrix';
import { useWebSocket, type WebSocketResponseDataType } from '@/hooks/useWebSocket';
const appStore = useAppStore();
const deviceInfo = ref<AwtrixStats>();
const settingsInfo = ref<AwtrixSettings>();
const { onMessage, send } = useWebSocket();


/**
 * get awtrix device info
 */
async function setAwtrixDeviceInfo(data: AwtrixStats) {
  deviceInfo.value = data;
  data && appStore.setAwtrixDeviceInfo(data)
}



async function setAwtrixDeviceSettings(data: AwtrixSettings) {
  settingsInfo.value = data;
  data && appStore.setAwtrixSettings(data)
}


onBeforeMount(async () => {
  // init
  onMessage((data: WebSocketResponseDataType<unknown>) => {
    const payload = data.payload;
    if (data.refer === "sub_awtrix_states") setAwtrixDeviceInfo(payload as AwtrixStats)
    if (data.refer === "sub_awtrix_settings") setAwtrixDeviceSettings(payload as AwtrixSettings)
  })
})

onMounted(() => {
  send({ event: "sub_awtrix_states" })
  send({ event: "sub_awtrix_settings" })
})

onUnmounted(() => {
  send({ event: "unsub_awtrix_states" })
  send({ event: "unsub_awtrix_settings" })
})
</script>
