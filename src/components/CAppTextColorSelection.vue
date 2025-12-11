<template>
    <v-row no-gutters>
        <p class="font-weight-bold mt-4">{{ state ? props.selectedText : props.unselectedText }}</p>
    </v-row>
    <v-row class="pt-0 pb-2 mt-0" v-if="!lock">
        <v-col cols="8" style="mt-4">
            <v-switch :model-value="state" hide-details inset @update:model-value="(val) => updateState(val ?? false)"
                :color="state ? 'rgb(76, 175, 80)' : ''" :class="state ? 'deep' : ''">
            </v-switch>
        </v-col>
        <v-col cols="4" class="pr-4 pl-0 animate__animated animate__fadeIn" v-if="state">
            <v-btn @click="selectEvent" height="55px" width="100%" :color="decimalToHexColor(currentColor)"
                :loading="lock">Change</v-btn>
        </v-col>
    </v-row>
    <v-row class="pt-0 pb-2 mt-0" v-else>
        <v-col cols="4" class="pr-4 pl-4 pt-8 pb-8">
            <v-progress-circular :indeterminate="lock" height="55px" size="24"></v-progress-circular>
        </v-col>
    </v-row>
</template>
<script lang="ts" setup>
import { useColorPickerModal } from "@/hooks/useColorPickerModal";
import { decimalToHexColor, decimalToRGB, rgbToInt } from "@/utils/colorTransform"

const props = defineProps<{
    selectedText: string,
    unselectedText: string
    rgbColor: number,
}>();

const lock = ref<boolean>(false);
const state = ref<boolean>(props.rgbColor !== 0);
const currentColor = ref<number>(props.rgbColor);

watch(props, () => {
    // change state lock
    lock.value = false;
}, { deep: true })

const emit = defineEmits<{
    onTextColorChanged: [value: string],
}>()

const selectEvent = async () => {
    if (lock.value) return;
    const colorPickerModal = useColorPickerModal();
    const title = state ? props.selectedText : props.unselectedText;
    const color = await colorPickerModal.open(title, decimalToRGB(props.rgbColor))
    const hex = decimalToHexColor(rgbToInt(color));
    if (props.rgbColor === rgbToInt(color)) return;
    currentColor.value = rgbToInt(color);
    emit("onTextColorChanged", hex)
    lock.value = true;
}

const updateState = (val: boolean) => {
    if(!val){
        if(lock.value) return;
        state.value = val;
        emit('onTextColorChanged', '0');
        lock.value = true;
        return;
    }
    emit("onTextColorChanged", "#FFFFFF")    
    currentColor.value =  16777215;
    state.value = val;
}

</script>
<style lang="css" scoped>
.deep :deep(.v-switch__track) {
    opacity: 1;
}
</style>