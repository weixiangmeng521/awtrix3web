<template>
    <v-app :theme="theme">
        <v-layout class="rounded rounded-md border main">

            <!-- <v-btn icon="mdi-menu"></v-btn> -->
            <v-app-bar class="px-3">
                <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
                <v-spacer></v-spacer>
                <v-btn :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'" :text="theme === 'light' ? 'Sun' : 'Mon'"
                    slim @click="onChangeTheme"></v-btn>
            </v-app-bar>

            <v-navigation-drawer permanent v-model="shouldOpenDrawer">
                <v-list nav>
                    <v-list-item v-for="item in navList" :key="item.link" :title="item.name" @click="nav2(item.link)">
                        <template v-slot:prepend>
                            <v-icon :icon="item.icon"></v-icon>
                        </template>
                    </v-list-item>
                </v-list>
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
import navList from "@/config/NavConfig"
const router = useRouter()
const theme = ref('light')
const shouldOpenDrawer = ref(false)


// changec theme
function onChangeTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
}

// navgation to
const nav2 = (link: string) => {
    router.push(link)
}

function toggleDrawer(){
    shouldOpenDrawer.value = !shouldOpenDrawer.value
}

// when windows width changed
function onWindowsChangedEvent(){
    const width = window.innerWidth;
    shouldOpenDrawer.value = width >= 1200;
}


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
</style>
