<template>
    <v-card class="mx-auto" :loading="!props.settingInfo">
        <v-card-title>Display Mode</v-card-title>
        <v-card-item>
            <!-- divider begin -->
            <v-divider></v-divider>
            <!-- divider end -->
            <CTimeModeSelection :settingInfo="settingInfo" @on-time-mode-changed="onTimeModeChanged" />
        </v-card-item>
    </v-card>
</template>
<script lang="ts" setup>
import type { AwtrixSettings } from '@/api/awtrix';

const props = defineProps<{
    settingInfo: AwtrixSettings | undefined,
}>()

const emit = defineEmits<{
    "onTimeModeChanged": [number],
}>();

const onTimeModeChanged = (mode: number) => {
    emit("onTimeModeChanged", mode);
}

</script>
<style lang="css" scoped></style>