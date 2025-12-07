<template>
    <v-row class="mt-0">
        <v-col cols="4" class="d-flex align-center">
            <v-switch hide-details inset v-model="nestState" :color="nestState ? 'rgb(76, 175, 80)' : ''"
                :class="nestState ? 'deep' : ''" @update:model-value="(val) => updateState(val ?? false)" :disabled="lock">
                <template v-slot:label>
                    <v-progress-circular v-if="props.lock" :indeterminate="props.lock" class="ms-2" size="24"></v-progress-circular>
                </template>
            </v-switch>
        </v-col>
        <v-col cols="8" class="d-flex justify-end align-center">
            <v-img :src="props.cover" :alt="'TMODE=' + props.mode" max-width="200" contain draggable="false" :style="{
                filter: !nestState ? 'grayscale(100%)' : 'none'
            }" />
        </v-col>
    </v-row>

</template>

<script lang="ts" setup>
const props = defineProps<{
    cover: string,
    mode: number,
    state: boolean,
    lock: boolean,
}>()
const emit = defineEmits<{
    updateState: [value: Boolean],
}>()

const nestState = ref(props.state);

const updateState = (state: boolean) => {
    emit('updateState', state);
}
</script>
<style lang="css" scoped>
.deep :deep(.v-switch__track) {
    opacity: 1;
}
</style>
