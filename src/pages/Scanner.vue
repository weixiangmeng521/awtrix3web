<template>
  <AdminLayout>
    <template #main>

      <v-card
        v-show="scanState === 'idle' || scanState === 'scanning'"
        max-width="450"
        text="Scanning local network available devices may take a while."
        title="Scanning Devices"
        class="mx-auto animate__animated animate__fadeIn"
      >
        <template v-slot:actions>
          <v-btn
            :loading="scanState === 'scanning'"
            class="flex-grow-1"
            height="48"
            variant="tonal"
            color="primary"
            @click="startScannDevices"
          >Start</v-btn>
        </template>
      </v-card>

      <v-row v-show="scanState === 'done'" class="animate__animated animate__fadeIn">
        <v-col cols="12" md="4" v-for="item in deviceList" :key="item.ip">
          <v-card>
            <template v-slot:title>
              {{ item.ip }}
            </template>

            <template v-slot:subtitle>
              <v-badge
                color="success"
                inline
                dot
              ></v-badge>
              Online
            </template>

            <template v-slot:text>
              Local Area Network devices
            </template>
          </v-card>
        </v-col>
      </v-row>

    </template>
  </AdminLayout>
</template>

<script lang="ts" setup>
import { useWebSocket, type WebSocketResponseDataType } from '@/hooks/useWebSocket';
import AdminLayout from '@/layouts/AdminLayout.vue';
const { isConnected, onMessage, send } = useWebSocket();
const scanState = ref<'idle' | 'scanning' | 'done'>('idle');
const deviceList = ref<DeviceInfo[]>([]);

type DeviceInfo = {
  ip: string;
  isAwtrixDevice: boolean;
}


// when the websocket receive scann_devices event 
function onMessageReciver(data: WebSocketResponseDataType<string>) {
  if (data.refer === "scann_devices") {
    if (data.payload && data.type === 1) {
      deviceList.value.push({ 
        ip: data.payload,
        isAwtrixDevice: false,
      });
      scanState.value = 'scanning';
    }
    if (data.type === 4) {
      scanState.value = 'done';
    }
  }
}



// start scanning devices
function startScannDevices() {
  scanState.value = 'scanning';
  deviceList.value = [];
  send({ event: "scann_devices" });
}

onBeforeMount(() => {
  onMessage(onMessageReciver)
})

onMounted(() => {
  send({ event: "scann_devices" });
})

</script>
