<template>
    <v-card class="mx-auto" :loading="!props.settingInfo" max-width="600">
        <v-card-title>APP Style</v-card-title>
        <v-card-item v-if="props.settingInfo">

            <!-- divider begin -->
            <v-divider></v-divider>
            <!-- divider end -->
            <CColorSelection title="Global text color" :rgbColor="props.settingInfo.TCOL" @on-color-changed="onColorChangedEvent"/>
 
            <!-- TODO: UPPERCASE	boolean	Display text in uppercase. -->


            <!-- divider begin -->
            <v-divider></v-divider>
            <!-- divider end -->
            <CSingleNumberInput class="mt-1" :value="props.settingInfo.SSPEED" :min="1" :max="100" placeholder="Scroll Speed" @submit="onScrollSpeedModificationChangedEvent"/>


        </v-card-item>
    </v-card>
</template>
<script lang="ts" setup>
import type { AppLoopInfo, AwtrixSettings } from '@/api/awtrix';

const props = defineProps<{
    appInfo: AppLoopInfo | undefined,
    settingInfo: AwtrixSettings | undefined,
}>()

const emit = defineEmits<{
    "onGlobalTextColorChanged": [string],
    "onScrollSpeedModificationChanged": [number],
}>()

const onColorChangedEvent = (color: string) => {
    emit("onGlobalTextColorChanged", color);
}

const onScrollSpeedModificationChangedEvent = (value: Number) => {
    emit("onScrollSpeedModificationChanged", value as number);
}

</script>
<style lang="css" scoped></style>
