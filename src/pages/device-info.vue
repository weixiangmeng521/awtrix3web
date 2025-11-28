<template>
  <AdminLayout>
    <template #main>
      <v-container class="flex" max-width="1200">
        <v-row>
        <v-col cols="12" md="4">
          <AwtrixDeviceInfo :deviceInfo="deviceInfo"/>
        </v-col>
        <v-col cols="12" md="8">
          XXX
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
import type { AwtrixStats } from '@/api/awtrix';
import { useNotificationStore } from '@/hooks/useNotificationStore';
const awtrixClinet = ref<AwtrixClient>();
const appStore = useAppStore();
const deviceInfo = ref<AwtrixStats>();
const notification = useNotificationStore();

async function fetchAwtrixDeviceInfo() {
  if(!awtrixClinet.value) return;
  try {
    const data = await awtrixClinet.value.getAwtrixDeviceInfo();
    console.log(data);
  } catch (e) {
    notification.push("Awtrix connection error", 'error', 2000);
  }
}

onBeforeMount(() => {
  awtrixClinet.value = new AwtrixClient(appStore.getConnectedDeviceIp);
})

onMounted(() => {
  fetchAwtrixDeviceInfo();
})

</script>
