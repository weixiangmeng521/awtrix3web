<template>
  <AdminLayout>
    <template #main>
      <!-- scann card -->
      <v-card v-show="scanState === 'idle' || scanState === 'scanning'" max-width="450"
        :text="!appStore.getConnectedDeviceIp.length ? 'Scanning local network available devices may take a while.' : appStore.awtrixInfo?.ip_address" 
        :title="!appStore.getConnectedDeviceIp.length ? 'Scanning Devices' : appStore.awtrixInfo?.uid"
        class="mx-auto animate__animated animate__fadeIn">

        <!-- this is connected okey icon -->
        <div class="py-12 text-center" v-if="appStore.getConnectedDeviceIp.length">
          <v-icon class="mb-6" color="success" icon="mdi-check-circle-outline" size="128"></v-icon>
          <div class="text-h4 font-weight-bold">Device is connected</div>
        </div>

        <template v-slot:actions>
          <v-btn :loading="scanState === 'scanning'" class="flex-grow-1" height="48" variant="tonal" color="primary"
            @click="startScannDevices">{{ !appStore.getConnectedDeviceIp.length ? "Start" : "Select new device" }}</v-btn>
        </template>
      </v-card>

      <v-row v-show="scanState === 'done'" class="animate__animated animate__fadeIn">
        <v-col cols="12" md="4" v-for="item in deviceList" :key="item.ip">
          <v-card :loading="item.state === 'checking'" :color="item.isAwtrixDevice ? '#4CAF50' : ''" dark>
            <v-card-text>
              <div>Local network device</div>

              <p class="text-h4 font-weight-black">{{ item.ip }}</p>
              <div>{{ item.isAwtrixDevice ? "Awtrix device" : "Unknown Device" }}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn v-if="!item.isAwtrixDevice" text="" variant="text" disabled></v-btn>
              <v-btn v-else text="Connect" variant="outlined" block @click="selectDevice(item)"></v-btn>
            </v-card-actions>

          </v-card>
        </v-col>
      </v-row>

    </template>
  </AdminLayout>
</template>

<script lang="ts" setup>
import { checkDeviceIsAwtrixDevice } from '@/api/checker';
import { useWebSocket, type WebSocketResponseDataType } from '@/hooks/useWebSocket';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { useAppStore } from '@/stores/app';
import httpClient from '@/api/schema';
import AwtrixClient from '@/api/awtrixClient';
const { isConnected, onMessage, send } = useWebSocket();
const scanState = ref<'idle' | 'scanning' | 'done'>('idle');
const deviceList = ref<DeviceInfo[]>([]);

type DeviceInfo = {
  ip: string;
  state: "idle" | "checking" | "done";
  isAwtrixDevice: boolean;
}

// pinia store
const appStore = useAppStore()

watch(deviceList, async (newList) => {
  for (const device of newList) {
    if (device.state === "idle") {
      console.log("Checking device:", device.ip);
      device.state = "checking";
      const isAwtrix = await checkDeviceIsAwtrixDevice(device.ip);
      device.isAwtrixDevice = isAwtrix;
      device.state = "done";
    }
  }
}, { deep: true });

// when the websocket receive scann_devices event 
function onMessageReciver(data: WebSocketResponseDataType<string>) {
  if (data.refer === "scann_devices") {
    if (data.payload && data.type === 1) {
      deviceList.value.push({
        ip: data.payload,
        state: "idle",
        isAwtrixDevice: false,
      });
      scanState.value = 'scanning';
    }
    if (data.type === 4) {
      scanState.value = 'done';
    }
  }
}

// when user select a device
async function selectDevice(device: DeviceInfo) {
  appStore.setShouldConnectDeviceIp(device.ip);
  // console.log(httpClient);
  const client = new AwtrixClient(device.ip);
  const data = await client.getAwtrixDeviceInfo();
  appStore.setAwtrixDeviceVersion(data);
  scanState.value = 'idle';
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
