<template>
    <v-row class="pt-0 pb-2 mt-0" v-if="!lock">
        <v-col cols="8" style="mt-4">
            <p class="data-info font-weight-bold">Global Text Color</p>
        </v-col>
        <v-col cols="4" class="pr-4 pl-0">
            <v-btn @click="selectEvent" height="55px" width="100%" :color="decimalToHexColor(rgbColor)" :loading="lock">Change</v-btn>
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
import { decimalToHexColor, decimalToRGB, rgbToInt} from "@/utils/colorTransform"

const props = defineProps<{
    title: string,
    rgbColor: number,
}>();

const lock = ref<boolean>(false);

watch(props, () => {
    // change state lock
    lock.value = false;
}, { deep: true })

const emit = defineEmits<{
    onColorChanged: [value: string],
}>()

const selectEvent = async () => {
    if(lock.value) return;
    const colorPickerModal = useColorPickerModal();
    const color = await colorPickerModal.open(props.title, decimalToRGB(props.rgbColor))
    const hex = decimalToHexColor(rgbToInt(color));
    if(props.rgbColor === rgbToInt(color)) return;
    emit("onColorChanged", hex)
    lock.value = true;
}


</script>
<style lang="css" scoped>
.data-info{
    height: 55px;
    line-height: 55px;
}

</style>