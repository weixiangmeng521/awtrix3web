<template>
  <AdminLayout>
    <template #main>
      <!-- scann card begin -->
      <v-card max-width="450" 
        title="Device Reboot" 
        :text="`It may take a moment to complete. (${waitTime}s)`" 
        class="mx-auto animate__animated animate__fadeIn"
      >

        <!-- this is connected okey icon -->
        <div class="py-12 text-center">
          <div class="loading mr-auto ml-auto mb-6" v-if="isLoading">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <v-icon v-else class="mb-6" color="success" icon="mdi-check-circle-outline" size="128"></v-icon>
        </div>
      </v-card>
      <!-- scann card end -->
    </template>
  </AdminLayout>
</template>

<script lang="ts" setup>
import AwtrixClient from '@/api/awtrixClient';
import { useNotificationStore } from '@/hooks/useNotificationStore';
import AdminLayout from '@/layouts/AdminLayout.vue';
import router from '@/router';
import { useAppStore } from '@/stores/app';
import { decodeBase64 } from '@/utils/base64';
const route = useRoute();
const refer = ref<string>("");
const awtrixClinet = ref<AwtrixClient>();
const appStore = useAppStore()
const notification = useNotificationStore();
const interval = 3000;
const isLoading = ref(true);
const sleep = async (t: number) => await new Promise(r => setTimeout(() => r(void 0), t));
const waitTime = ref(0);

const getReferParam = () => {
  const routeParams = route.params as { [key: string]: string };
  const refer64 = routeParams?.refer ?? "";
  return decodeBase64(refer64);
}

// send notification and jump to home page
const notifyAndJump = async (content: string) => {
  notification.push(content, 'error', interval);
  await sleep(interval);
  router.push("/");
}


const rebootDevice = async () => {
  if (!awtrixClinet.value) {
    notifyAndJump("Initialize client error");
    return;
  }
  await sleep(3000)
  awtrixClinet.value.reboot()
  await awtrixClinet.value.requestUntilSuccess();
  isLoading.value = false;
  await sleep(1800)
  const path = refer.value || "/";
  window.location.href = path;
}

onBeforeMount(() => {
  refer.value = getReferParam();

})

let timeHander:number;
onMounted(async () => {
  if (!appStore.getConnectedDeviceIp) {
    notifyAndJump("Invalid device IP, connection error");
    return;
  }
  // timer
  timeHander = setInterval(() => waitTime.value++, 1000);

  awtrixClinet.value = new AwtrixClient(appStore.getConnectedDeviceIp);
  await rebootDevice();
})


onUnmounted(() => {
  clearInterval(timeHander)
})

//
</script>
<style lang="css" scoped>
.loading,
.loading>div {
  position: relative;
  box-sizing: border-box;
}

.loading {
  display: block;
  font-size: 0;
  color: #000;
}

.loading.la-dark {
  color: #333;
}

.loading>div {
  display: inline-block;
  float: none;
  background-color: currentColor;
  border: 0 solid currentColor;
}

.loading {
  width: 72px;
  height: 72px;
}

.loading>div {
  width: 16px;
  height: 16px;
  margin: 4px;
  border-radius: 100%;
  animation-name: ball-grid-pulse;
  animation-iteration-count: infinite;
}

.loading>div:nth-child(1) {
  animation-duration: 0.65s;
  animation-delay: 0.03s;
}

.loading>div:nth-child(2) {
  animation-duration: 1.02s;
  animation-delay: 0.09s;
}

.loading>div:nth-child(3) {
  animation-duration: 1.06s;
  animation-delay: -0.69s;
}

.loading>div:nth-child(4) {
  animation-duration: 1.5s;
  animation-delay: -0.41s;
}

.loading>div:nth-child(5) {
  animation-duration: 1.6s;
  animation-delay: 0.04s;
}

.loading>div:nth-child(6) {
  animation-duration: 0.84s;
  animation-delay: 0.07s;
}

.loading>div:nth-child(7) {
  animation-duration: 0.68s;
  animation-delay: -0.66s;
}

.loading>div:nth-child(8) {
  animation-duration: 0.93s;
  animation-delay: -0.76s;
}

.loading>div:nth-child(9) {
  animation-duration: 1.24s;
  animation-delay: -0.76s;
}

.loading.la-sm {
  width: 36px;
  height: 36px;
}

.loading.la-sm>div {
  width: 8px;
  height: 8px;
  margin: 2px;
}

.loading.la-2x {
  width: 72px;
  height: 72px;
}

.loading.la-2x>div {
  width: 32px;
  height: 32px;
  margin: 8px;
}

.loading.la-3x {
  width: 216px;
  height: 216px;
}

.loading.la-3x>div {
  width: 48px;
  height: 48px;
  margin: 12px;
}

@keyframes ball-grid-pulse {
  0% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.35;
    transform: scale(0.45);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
