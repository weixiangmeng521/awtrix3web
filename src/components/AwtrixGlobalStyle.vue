<template>
    <v-card class="mx-auto" :loading="!props.settingInfo" max-width="600">
        <v-card-title>Style</v-card-title>
        <v-card-item v-if="props.settingInfo">

            <!-- divider begin -->
            <v-divider></v-divider>
            <!-- divider end -->
            <CColorSelection title="Global text color" :rgbColor="props.settingInfo.TCOL"
                @on-color-changed="onColorChangedEvent" />

            <!-- divider begin -->
            <v-divider></v-divider>
            <!-- divider end -->
            <CSingleNumberInput class="mt-2" :value="props.settingInfo.SSPEED" :min="1" :max="100"
                placeholder="Scroll Speed(%)" @submit="onScrollSpeedModificationChangedEvent" />
            <CPullDown :list="OverlayEffectsList" :selected="getOverlayEffectIndex(props.settingInfo?.OVERLAY)"
                placeHolder="Effect Overlay" @on-changed="onEffectOverlayChanged" />



            <!-- divider begin -->
            <v-divider></v-divider>
            <!-- divider end -->
            <CSwitch :state="(props.autoNextApp ?? false)" title="Auto Transition"
                @update-state="changeAutoNextAppState" />
            <CPullDown :list="props.transitionList" :selected="props.settingInfo?.TEFF" placeHolder="Transition effect"
                @on-changed="onTransitionChangedEvent" />
            <CSingleNumberInput :value="props.settingInfo.TSPEED" :min="0" :max="10000"
                placeholder="Transition time (ms)" @submit="transitionTimeSubmit" />
            <CSingleNumberInput :value="props.settingInfo.ATIME" :min="0" :max="10000"
                placeholder="App Duration Seconds" @submit="onAppDurationTimeChangedEvent" />


            <!-- divider begin -->
            <v-divider></v-divider>
            <!-- divider end -->
            <CSwitch :state="(props.settingInfo.UPPERCASE ?? false)" title="Uppercase Letters"
                @update-state="onUppercaseLetterSwitchChanged" />


        </v-card-item>
    </v-card>
</template>
<script lang="ts" setup>
import type { AppLoopInfo, AwtrixSettings, OverlayEffect } from '@/api/awtrix';
import { OverlayEffects } from "@/api/awtrix.d"

const OverlayEffectsList = Object.values(OverlayEffects);

const getOverlayEffectIndex = (overlay: string | undefined) => {
    const curOverlay = (overlay ?? OverlayEffectsList[0]) as OverlayEffect;
    return OverlayEffectsList.indexOf(curOverlay);
}


const props = defineProps<{
    appInfo: AppLoopInfo | undefined,
    settingInfo: AwtrixSettings | undefined,
    autoNextApp: boolean,
    transitionList: string[],    
}>()

const emit = defineEmits<{
    onGlobalTextColorChanged: [string],
    onScrollSpeedModificationChanged: [number],
    onUppercaseLetterSwitchChanged: [boolean],
    onEffectOverlayChanged: [string],
    changeTransitionEffect: [number],
    changeTransitionTime: [number],
    changeAutoNextApp: [Boolean],
    onAppDurationTimeChanged: [number],
}>()

const onColorChangedEvent = (color: string) => {
    emit("onGlobalTextColorChanged", color);
}

const onScrollSpeedModificationChangedEvent = (value: Number) => {
    emit("onScrollSpeedModificationChanged", value as number);
}

const onUppercaseLetterSwitchChanged = (value: Boolean) => {
    emit("onUppercaseLetterSwitchChanged", value as boolean);
}

const onEffectOverlayChanged = (value: number) => {
    const key = OverlayEffectsList[value];
    emit("onEffectOverlayChanged", key as string);
}


const onTransitionChangedEvent = (effectId: number | string) => {
    emit("changeTransitionEffect", Number(effectId));
}

const changeAutoNextAppState = (val: Boolean) => {
    emit('changeAutoNextApp', val)
}

const transitionTimeSubmit = (value: Number) => {
    emit("changeTransitionTime", value as number);
}

const onAppDurationTimeChangedEvent = (value: Number) => {
    emit("onAppDurationTimeChanged", value as number);
}


</script>
<style lang="css" scoped></style>
