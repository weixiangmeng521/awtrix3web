<template>
    <v-card class="mx-auto" :loading="!props.settingInfo">
        <v-card-title>Style</v-card-title>
        <v-card-item v-if="props.settingInfo">
            <!-- divider begin -->
            <v-divider></v-divider>
            <!-- divider end -->
            <CColorSelection title="Calendar Header Color" :rgbColor="props.settingInfo.CHCOL"
                @on-color-changed="onCalendarHeaderColorChangedEvent" />


            <!-- divider begin -->
            <v-divider></v-divider>
            <!-- divider end -->
            <CColorSelection title="Calendar Body Color" :rgbColor="props.settingInfo.CBCOL"
                @on-color-changed="onCalendarBodyColorChangedEvent" />


            <!-- divider begin -->
            <v-divider></v-divider>
            <!-- divider end -->
            <CColorSelection title="Calendar Text Color" :rgbColor="props.settingInfo.CTCOL"
                @on-color-changed="onCalendarTextColorChangedEvent" />

            <!-- divider begin -->
            <v-divider></v-divider>
            <!-- divider end -->
            <CPullDown :list="AvailableTimeFormatsList" class="mt-4"
                :selected="getAvailableTimeFormatsListIndex(props.settingInfo?.TFORMAT)" placeHolder="Time format"
                @on-changed="onTimeFormatChanged" />



        </v-card-item>
    </v-card>
</template>
<script lang="ts" setup>
import type { AvailableTimeFormat, AwtrixSettings } from '@/api/awtrix';
import { AvailableTimeFormatsList } from '@/api/awtrix.d'
const props = defineProps<{
    settingInfo: AwtrixSettings | undefined,
}>()


// TODO: TIME_COL  => Text color of the time app. Use 0 for global text color.


const emit = defineEmits<{
    "onCalendarHeaderColorChanged": [string],
    "onCalendarTextColorChanged": [string],
    "onCalendarBodyColorChanged": [string],
    "onTimeAppTimeFormatChanged": [AvailableTimeFormat],
}>();

const onTimeFormatChanged = (index:number) => {
    emit("onTimeAppTimeFormatChanged", AvailableTimeFormatsList[index]);
}

const getAvailableTimeFormatsListIndex = (format: AvailableTimeFormat) => {
    return AvailableTimeFormatsList.indexOf(format)
}

const onCalendarHeaderColorChangedEvent = (color: string) => {
    emit("onCalendarHeaderColorChanged", color);
}

const onCalendarTextColorChangedEvent = (color: string) => {
    emit("onCalendarTextColorChanged", color);
}

const onCalendarBodyColorChangedEvent = (color: string) => {
    emit("onCalendarBodyColorChanged", color);
}
</script>
<style lang="css" scoped></style>