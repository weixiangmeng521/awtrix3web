<template>
    <v-app :theme="theme">
        <v-layout class="rounded rounded-md border main">
            <!-- <v-btn icon="mdi-menu"></v-btn> -->
            <v-app-bar class="px-3" style="position: fixed;">
                <v-app-bar-nav-icon @click.prevent="toggleDrawer"></v-app-bar-nav-icon>
                <img src="@/assets/awtrix-logo.png" alt="Awtrix Logo" height="32"
                    :class="!isConnected ? 'grayscale ml-3' : 'ml-3'" />
                <p class="font-weight-bold ml-3">
                    Awtrix3
                </p>
                <v-spacer></v-spacer>
                <v-btn :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
                    :text="theme === 'light' ? 'Sun' : 'Mon'" slim @click.prevent="onChangeTheme"></v-btn>
            </v-app-bar>

            <v-navigation-drawer permanent v-model="shouldOpenDrawer" style="position: fixed;">
                <v-list nav class="navigation" v-model:opened="navOpen">
                    <div v-for="item in navList">
                        <v-list-item v-if="!item.children.length" :key="item.link" :title="item.name"
                            @click.prevent="nav2(item.link)">
                            <template v-slot:prepend>
                                <v-icon :icon="item.icon"></v-icon>
                            </template>
                        </v-list-item>
                        <v-list-group v-else :value="item.name">
                            <template v-slot:activator="{ props }">
                                <v-list-item v-bind="props" :title="item.name">
                                    <template v-slot:prepend>
                                        <v-icon :icon="item.icon"></v-icon>
                                    </template>
                                </v-list-item>
                            </template>

                            <v-list-item v-for="(childItem, i) in item.children" :key="i" :title="childItem.name"
                                @click.prevent="nav2(childItem.link)">
                                <template v-slot:prepend>
                                    <v-icon :icon="childItem.icon"></v-icon>
                                </template>
                            </v-list-item>
                        </v-list-group>
                    </div>
                </v-list>

                <template v-slot:append>
                    <div class="pa-2" v-if="appStore.getConnectedDeviceIp && shouldShodRebootBtn()">
                        <v-btn block prepend-icon="mdi-refresh" class="pa-2" color="red" variant="outlined"
                            @click="rebootDevice">
                            <template v-slot:prepend>
                                <v-icon color="red"></v-icon>
                            </template>
                            Reboot Device
                        </v-btn>
                    </div>
                </template>
            </v-navigation-drawer>

            <v-main class="d-flex justify-center">
                <v-container>
                    <slot name="main" />
                    <AppFooter />
                </v-container>
            </v-main>
        </v-layout>
    </v-app>
</template>
<script lang="ts" setup>
import AwtrixClient from "@/api/awtrixClient";
import navList from "@/config/NavConfig"
import { useWebSocket } from "@/hooks/useWebSocket";
import { useAppStore } from "@/stores/app";
import { encodeBase64 } from "@/utils/base64";
import type { SystemThemeType } from "@/stores/app";
const router = useRouter()
const route = useRoute()
const shouldOpenDrawer = ref(false)
const { isConnected } = useWebSocket();
const awtrixClinet = ref<AwtrixClient>();
const appStore = useAppStore();
const theme = ref<SystemThemeType>('light');

watch(theme, (val) => {
    appStore.setSystemTheme(val);
})

const DO_NOT_SHOW_REBOOT_BTN_NAV_LIST = [
    "/reconnection/[refer]",
];

const navOpen = ref(['Device Setting'])


// changec theme
function onChangeTheme() {
    const curTheme = theme.value === 'light' ? 'dark' : 'light';
    theme.value = curTheme;
}

// navgation to
function nav2(link: string) {
    router.push(link)
}

function toggleDrawer() {
    shouldOpenDrawer.value = !shouldOpenDrawer.value
}

// when windows width changed
function onWindowsChangedEvent() {
    const width = window.innerWidth;
    shouldOpenDrawer.value = width >= 1200;
}

function shouldShodRebootBtn() {
    const name = route.name;
    return !DO_NOT_SHOW_REBOOT_BTN_NAV_LIST.includes(name);
}

async function rebootDevice() {
    if (!awtrixClinet.value) return;
    const currentPath = route.path;
    const param = encodeBase64(currentPath);
    nav2(`/reconnection/${param}`);
}

onBeforeMount(() => {
    awtrixClinet.value = new AwtrixClient(appStore.getConnectedDeviceIp);
})

onMounted(() => {
    onWindowsChangedEvent()
    window.addEventListener("resize", onWindowsChangedEvent)
})


onUnmounted(() => {
    window.removeEventListener("resize", onWindowsChangedEvent)
})

</script>
<style lang="css" scoped>
.main {
    min-height: 100vh;
}

.grayscale {
    filter: grayscale(100%);
    transition: .3s;
}

.navigation :deep(.v-list-item__spacer) {
    width: 15px !important;
}

.navigation :deep(.v-list-group__items .v-list-item) {
    padding-inline-start: calc(var(--indent-padding) - 16px) !important
}
</style>