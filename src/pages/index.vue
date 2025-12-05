<template>
  <AdminLayout>
    <template #main>
      <HelloWorld />
    </template>
  </AdminLayout>
</template>

<script lang="ts" setup>
import AwtrixClient from '@/api/awtrixClient';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { useAppStore } from '@/stores/app';

onMounted(() => {
  const app = useAppStore();
  const clinet = new AwtrixClient(app.getConnectedDeviceIp);
  // clinet.sendPlaySound("alarm");
  // clinet.sendRTTTLSoundFromString("Mario:d=4,o=5,b=200:16e6,16e6,16e6,8c6,16e6,8g6,4g,8c6,8g,8e,8a,8b,8a#,a,8g6,8f6,8e6,8c6,8d6,8b");

})
//
</script>
