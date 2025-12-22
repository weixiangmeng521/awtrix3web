<template>
  <AdminLayout>
    <template #main>
      <!-- scann card begin -->
      <v-card v-show="scanState === 'idle' || scanState === 'scanning'" max-width="450"
        :title="!appStore.getConnectedDeviceIp.length ? 'Scanning Devices' : getShowingIPText()"
        :text="!appStore.getConnectedDeviceIp.length ? 'Scanning local network available devices may take a while.' : getDeviceInfo()"
        class="mx-auto animate__animated animate__fadeIn">

        <!-- this is connected okey icon -->
        <div class="py-12 text-center" v-if="appStore.getConnectedDeviceIp.length">
          <v-icon class="mb-6" color="success" icon="mdi-check-circle-outline" size="128"></v-icon>
          <div class="text-h4 font-weight-bold">Device is connected</div>
        </div>

        <!-- action button -->
        <template v-slot:actions>
          <v-row>
            <v-col cols="12">
              <v-btn :loading="scanState === 'scanning'" block height="48" variant="tonal" color="primary"
                @click="startScannDevices">{{ !appStore.getConnectedDeviceIp.length ? "Start" : "Change device"
                }}</v-btn>
            </v-col>
            <v-col cols="12" class="pt-0" v-if="appStore.getConnectedDeviceIp.length">
              <v-btn block height="48" variant="tonal" color="error" @click="closeConnection">Disconnection</v-btn>
            </v-col>
            <v-col cols="12" class="pt-0" v-if="appStore.getConnectedDeviceIp.length">
              <v-btn block height="48" variant="tonal" @click="checkDevice" prepend-icon="mdi-open-in-new">
                <template v-slot:prepend>
                  <v-icon color="#818181"></v-icon>
                </template>
                Check device
              </v-btn>
            </v-col>
          </v-row>
        </template>
      </v-card>
      <!-- scann card end -->

      <!-- device list begin -->
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
      <!-- device list end -->

    </template>
  </AdminLayout>
</template>

<script lang="ts" setup>
import { checkDeviceIsAwtrixDevice } from '@/api/checker';
import httpClient from '@/api/schema';
import { useWebSocket, type WebSocketResponseDataType } from '@/hooks/useWebSocket';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { useAppStore } from '@/stores/app';
import AwtrixClient from '@/api/awtrixClient';
import { useNotificationStore } from '@/hooks/useNotificationStore';
const { isConnected, onMessage, send } = useWebSocket();
const scanState = ref<'idle' | 'scanning' | 'done'>('idle');
const deviceList = ref<DeviceInfo[]>([]);
const notification = useNotificationStore();

type DeviceInfo = {
  ip: string;
  state: "idle" | "checking" | "done";
  isAwtrixDevice: boolean;
}

// TODO: scann device mode:  "fast" | "server" 
const CHECK_DEVICE_MODE:string = "fast";

// pinia store
const appStore = useAppStore()

watch(deviceList, async (newList) => {
  for (const device of newList) {
    if (device.state === "idle") {
      device.state = "checking";
      if(CHECK_DEVICE_MODE === "fast") {
        // const isAwtrix = await checkDeviceIsAwtrixDevice(device.ip);
        const res = await httpClient.checkIsAwtrixDevice({ ip: device.ip });
        device.isAwtrixDevice = res.data;
        device.state = "done";
      }
      if(CHECK_DEVICE_MODE === "server") {
        send({ event: "check_awtrix_device" , payload: device.ip });
      }
    }
  }
}, { deep: true });

// when the websocket receive scann_devices event 
function onMessageReciver(data: WebSocketResponseDataType<unknown>) {
  // scann device events
  if (data.refer === "scann_devices") {
    if (data.payload && data.type === 1) {
      deviceList.value.push({
        ip: data.payload as string,
        state: "idle",
        isAwtrixDevice: false,
      });
      scanState.value = 'scanning';
    }
    if (data.type === 4) {
      scanState.value = 'done';
    }
  }
  // check device events
  if (data.refer === "check_awtrix_device") {
    deviceList.value.map((item) => {
      const payload = data.payload as Omit<DeviceInfo, "state" | "isAwtrixDevice"> & { is_awtrix_device: boolean };
      if(item.ip === payload.ip){
        item.isAwtrixDevice = payload.is_awtrix_device;
        item.state = "done";
      }
      return item;
    })
  }
}

// when user select a device
async function selectDevice(device: DeviceInfo) {
  send({ event: "set_awtrix_device_ip" , payload: device.ip})
  appStore.setShouldConnectDeviceIp(device.ip);
  // console.log(httpClient);
  const client = new AwtrixClient(device.ip);
  const data = await client.getAwtrixDeviceInfo();
  appStore.setAwtrixDeviceInfo(data);
  scanState.value = 'idle';
}


// start scanning devices
function startScannDevices() {
  if (!isConnected.value) {
    notification.push("Server connection is on error", 'error', 2000);
    return;
  }

  scanState.value = 'scanning';
  deviceList.value = [];
  send({ event: "scann_devices" });
}

// close connection
function closeConnection() {
  const store = useAppStore();
  store.clearAll();
  send({ event: "remove_awtrix_device" })
  window.location.reload();
}

// get device info 
function getDeviceInfo() {
  const uid = appStore.getAwtrixInfo?.uid ?? "unkown";
  const version = appStore.getAwtrixInfo?.version ?? "unkown";;
  return `${uid} | v${version}`;
}

function getShowingIPText() {
  const ip = appStore.getAwtrixInfo?.ip_address ?? "unknown";
  return `IP: ${ip}`
}


function checkDevice() {
  const address = appStore.getAwtrixInfo?.ip_address;
  if (!address) return;
  window.open("http://" + address, '_blank')
}


onBeforeMount(() => {
  onMessage(onMessageReciver)
})

// onMounted(() => {
//   send({ event: "scann_devices" });
// })

</script>
