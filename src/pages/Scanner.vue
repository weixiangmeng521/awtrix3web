<template>
  <AdminLayout>
    <template #main>
      Scanner

    </template>
  </AdminLayout>
</template>

<script lang="ts" setup>
import { useWebSocket, type WebSocketResponseDataType } from '@/hooks/useWebSocket';
import AdminLayout from '@/layouts/AdminLayout.vue';

const { isConnected, onMessage, send } = useWebSocket();

function onMessageReciver(data: WebSocketResponseDataType<unknown>) {
  if (data.refer === "scann_devices") {
    console.log("scann_devices data:", data);
  }
}

watch(isConnected, (newVal) => {
  if (newVal) {
    send({ event: "scann_devices" });
  }
});

onBeforeMount(() => {
  onMessage(onMessageReciver)
})

onMounted(() => {
  send({ event: "scann_devices" });
})

</script>
