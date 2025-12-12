<template>
    <v-card class="mx-auto" :loading="!props.settingInfo">
        <v-card-title>Style</v-card-title>
        <v-card-item v-if="props.settingInfo">
            <!-- divider begin -->
            <v-divider></v-divider>
            <!-- divider end -->
            <CAppTextColorSelection selected-text="Custom App Text Color" unselected-text="Use Global APP Text Color"
                :rgbColor="props.settingInfo.BAT_COL" @on-text-color-changed="onAppTextColorChangedEvent" />

        </v-card-item>
    </v-card>
</template>
<script lang="ts" setup>
import type { AwtrixSettings } from '@/api/awtrix';
const props = defineProps<{
    settingInfo: AwtrixSettings | undefined,
}>()

const emit = defineEmits<{
    "onAppTextColorChanged": [string],
}>();

const onAppTextColorChangedEvent = (color: string) => {
    emit("onAppTextColorChanged", color);
}
</script>
<style lang="css" scoped></style>