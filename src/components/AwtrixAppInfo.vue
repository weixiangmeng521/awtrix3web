<template>
    <v-card class="mx-auto" :loading="!props.settingInfo" max-width="600">
        <v-card-title>General</v-card-title>
        <v-card-item v-if="props.settingInfo">
            <CAppSelection :appInfo="props.appInfo" :currentApp="props.currentApp" @change-app="changeAppEvent" />

            <!-- divider begin -->
            <v-divider></v-divider>
            <!-- divider end -->
            <CSwitch :state="(props.powerState ?? false)" title="Power" @update-state="changeState" />


            <!-- divider begin -->
            <v-divider></v-divider>
            <!-- divider end -->
            <CSwitch :state="(props.settingInfo.BLOCKN ?? false)" title="Block Button" @update-state="changeBlockPhysicalBtnState" />


            <CSwitch class="mr-8" :state="(props.autoBrightness ?? false)"
                :title="(props.autoBrightness ?? false) ? 'Auto Brightness' : 'Manual Brightness'"
                @update-state="changeAutoBrightnessState" />
            <CSlider :disabled="props.settingInfo.ABRI" :value="props.settingInfo.BRI ?? 0" :max="255" :min="0"
                @onSlideChange="onSlideChangeEvent" />



        </v-card-item>
    </v-card>
</template>
<script lang="ts" setup>
import type { AppLoopInfo, AwtrixSettings } from "@/api/awtrix.d"
import CSwitch from "./CSwitch.vue";
import CAppSelection from "./CAppSelection.vue"
import CSlider from "./CSlider.vue";

const props = defineProps<{
    appInfo: AppLoopInfo | undefined,
    settingInfo: AwtrixSettings | undefined,
    currentApp: string | undefined,
    powerState: boolean,
    autoBrightness: boolean,
}>();

const emit = defineEmits<{
    changeApp: [value: string],
    changePower: [value: Boolean],
    changeAutoBrightness: [value: Boolean],
    changeAutoNextApp: [value: Boolean],
    onScreenBrightnessSet: [value: number],
    onAppDurationTimeChanged: [value: number],
    changeBlockPhysicalBtnState: [value: Boolean],
}>()

const changeState = (val: Boolean) => {
    emit('changePower', val)
}

const changeAutoBrightnessState = (val: Boolean) => {
    emit('changeAutoBrightness', val)
}

const changeAppEvent = (name: string) => {
    emit('changeApp', name);
}

const onSlideChangeEvent = (value: Number) => {
    emit('onScreenBrightnessSet', value as number);
}


const changeBlockPhysicalBtnState = (state: Boolean) => {
    emit("changeBlockPhysicalBtnState", state);
}

</script>
<style lang="css" scoped>
.curApp {
    background-color: rgb(76, 175, 80);
    color: #fff;
}

.deep :deep(.v-switch__track) {
    opacity: 1;
}

.c-switch {
    padding-left: 80px;
}
</style>
