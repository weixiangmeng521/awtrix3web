<template>
    <v-card class="mx-auto" :loading="!props.settingInfo" max-width="600">
        <v-card-title>Native App</v-card-title>
        <v-card-item v-if="props.settingInfo">

            <!-- divider begin -->
            <v-divider></v-divider>
            <!-- divider end -->
            <v-row>
                <v-col cols="4">
                    <CSwitch :state="(props.settingInfo.TIM ?? false)" title="TIME"
                        @update-state="changeTIM_APPState" />
                </v-col>
                <v-col cols="8" class="d-flex justify-center align-center">
                    <v-img :src="getTmodeMappingImg(props.settingInfo.TMODE)" alt="Time App Icon" max-width="300" contain :style="{
                        filter: !(props.settingInfo.TIM ?? false) ? 'grayscale(100%)' : 'none'
                    }"
                        draggable="false"></v-img>
                </v-col>
            </v-row>

            <!-- divider begin -->
            <v-divider></v-divider>
            <!-- divider end -->
            <v-row>
                <v-col cols="4">
                    <CSwitch :state="(props.settingInfo.DAT ?? false)" title="DATE"
                        @update-state="changeDAT_APPState" />
                </v-col>
                <v-col cols="8" class="d-flex justify-center align-center">
                    <v-img src="@/assets/native_app/date.png" alt="Time App Icon" max-width="300" contain :style="{
                        filter: !(props.settingInfo.DAT ?? false) ? 'grayscale(100%)' : 'none'
                    }"
                        draggable="false"></v-img>
                </v-col>
            </v-row>


            <!-- divider begin -->
            <v-divider></v-divider>
            <!-- divider end -->
            <v-row>
                <v-col cols="4">
                    <CSwitch :state="(props.settingInfo.HUM ?? false)" title="HUM" @update-state="changeHUM_APPState" />
                </v-col>
                <v-col cols="8" class="d-flex justify-center align-center">
                    <v-img src="@/assets/native_app/humidity.png" alt="Time App Icon" max-width="300" contain :style="{
                        filter: !(props.settingInfo.HUM ?? false) ? 'grayscale(100%)' : 'none'
                    }"
                        draggable="false"></v-img>
                </v-col>
            </v-row>



            <!-- divider begin -->
            <v-divider></v-divider>
            <!-- divider end -->
            <v-row>
                <v-col cols="4">
                    <CSwitch :state="(props.settingInfo.TEMP ?? false)" title="TEMP"
                        @update-state="changeTEMP_APPState" />
                </v-col>
                <v-col cols="8" class="d-flex justify-center align-center">
                    <v-img src="@/assets/native_app/temp.png" alt="Time App Icon" max-width="300" contain :style="{
                        filter: !(props.settingInfo.TEMP ?? false) ? 'grayscale(100%)' : 'none'
                    }"
                        draggable="false"></v-img>
                </v-col>
            </v-row>


            <!-- divider begin -->
            <v-divider></v-divider>
            <!-- divider end -->
            <v-row>
                <v-col cols="4">
                    <CSwitch :state="(props.settingInfo.BAT ?? false)" title="BAT" @update-state="changeBAT_APPState" />

                </v-col>
                <v-col cols="8" class="d-flex justify-center align-center">
                    <v-img src="@/assets/native_app/bat.png" alt="Time App Icon" max-width="300" contain :style="{
                        filter: !(props.settingInfo.BAT ?? false) ? 'grayscale(100%)' : 'none'
                    }"
                        draggable="false"></v-img>
                </v-col>
            </v-row>


            <!-- divider begin -->
            <v-divider></v-divider>
            <!-- divider end -->
            <!-- <v-row>
                <v-col cols="4">
                    <CSwitch :state="(props.settingInfo.MATP ?? false)" title="MATP"
                        @update-state="changeMATP_APPState" />
                </v-col>
                <v-col cols="8" class="d-flex justify-center align-center">
                    <v-img src="@/assets/native_app/time/1.png" alt="Time App Icon" max-width="300" contain
                        draggable="false"></v-img>
                </v-col>
            </v-row>

             -->
        </v-card-item>
    </v-card>
</template>
<script lang="ts" setup>
import type { AwtrixSettings } from '@/api/awtrix';
import TMODE_MAPPING from '@/config/TimeMode';

const props = defineProps<{
    settingInfo: AwtrixSettings | undefined,
}>()

const emit = defineEmits<{
    changedTimAppState: [value: Boolean],
    changedDatAppState: [value: Boolean],
    changedHumAppState: [value: Boolean],
    changedTempAppState: [value: Boolean],
    changedMatpAppState: [value: Boolean],
    changedBatAppState: [value: Boolean],
}>()


const getTmodeMappingImg = (tmode: number) => {
    for (let i = 0; i < TMODE_MAPPING.length; i++) {
        const item = TMODE_MAPPING[i];
        if(item?.mode === tmode){
            return item.img;
        }
    }
}


const changeTIM_APPState = (state: Boolean) => {
    emit("changedTimAppState", state);
}

const changeDAT_APPState = (state: Boolean) => {
    emit("changedDatAppState", state);
}

const changeHUM_APPState = (state: Boolean) => {
    emit("changedHumAppState", state);
}

const changeTEMP_APPState = (state: Boolean) => {
    emit("changedTempAppState", state);
}

const changeMATP_APPState = (state: Boolean) => {
    emit("changedMatpAppState", state);
}

const changeBAT_APPState = (state: Boolean) => {
    emit("changedBatAppState", state);
}

</script>
<style lang="css" scoped></style>
