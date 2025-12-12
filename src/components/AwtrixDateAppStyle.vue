<template>
    <v-card class="mx-auto" :loading="!props.settingInfo">
        <v-card-title>Style</v-card-title>
        <v-card-item v-if="props.settingInfo">
            <!-- divider begin -->
            <v-divider></v-divider>
            <!-- divider end -->
            <CAppTextColorSelection selected-text="Custom App Text Color" unselected-text="Use Global APP Text Color"
                :rgbColor="props.settingInfo.DATE_COL" @on-text-color-changed="onAppTextColorChangedEvent" />


            <!-- divider begin -->
            <v-divider></v-divider>
            <!-- divider end -->
            <CPullDown :list="AvailableDateFormatsList" class="mt-4"
                :selected="getAvailableTimeFormatsListIndex(props.settingInfo?.DFORMAT)" placeHolder="Time format"
                @on-changed="onTimeFormatChanged" />



        </v-card-item>
    </v-card>
</template>
<script lang="ts" setup>
import type { AvailableDateFormat, AwtrixSettings } from '@/api/awtrix';
import { AvailableDateFormatsList } from '@/api/awtrix.d'
const props = defineProps<{
    settingInfo: AwtrixSettings | undefined,
}>()

const emit = defineEmits<{
    "onDateAppTimeFormatChanged": [AvailableDateFormat],
    "onAppTextColorChanged": [string],
}>();

const onTimeFormatChanged = (index: number) => {
    emit("onDateAppTimeFormatChanged", AvailableDateFormatsList[index]);
}

const getAvailableTimeFormatsListIndex = (format: AvailableDateFormat) => {
    return AvailableDateFormatsList.indexOf(format)
}

const onAppTextColorChangedEvent = (color: string) => {
    emit("onAppTextColorChanged", color);
}
</script>
<style lang="css" scoped></style>