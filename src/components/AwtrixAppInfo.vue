<template>
    <v-card class="mx-auto mt-10" :loading="!props.appInfo" max-width="600">
        <v-card-title>Awtrix App</v-card-title>
        <v-card-item>
            <v-chip-group column>
                <v-chip v-for="(key, value) in props.appInfo" :key="key"
                    :class="props.currentApp === value ? 'curApp' : ''">{{ value }}</v-chip>
            </v-chip-group>

            <v-divider></v-divider>
            <CSwitch :state="(props.powerState ?? false)" title="Power"  @update-state="changeState"/>

            <v-divider></v-divider>
            <CSwitch :state="(props.autoBrightness ?? false)" title="Auto Brightness"  @update-state="changeAutoBrightnessState"/>
            

        </v-card-item>
    </v-card>
</template>
<script lang="ts" setup>
import type { AppLoopInfo } from "@/api/awtrix.d"
import CSwitch from "./CSwitch.vue";
const props = defineProps<{
    appInfo: AppLoopInfo | undefined,
    currentApp: string | undefined,
    powerState: boolean,
    autoBrightness: boolean,
}>();

const emit = defineEmits<{
    changePower: [value: Boolean],
    changeAutoBrightness: [value: Boolean],    
}>()

const changeState = (val: Boolean) => {
    emit('changePower', val)
}

const changeAutoBrightnessState = (val: Boolean) => {
    emit('changeAutoBrightness', val)
}

</script>
<style lang="css" scoped>
.curApp {
    background-color: rgb(76, 175, 80);
    color: #fff;
}
.deep :deep(.v-switch__track){
    opacity: 1;
}
</style>
