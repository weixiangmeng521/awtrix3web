<template>
    <div>
        <v-card-title class="mt-4 font-weight-bold" style="font-size: 16px;">{{ props.title }}</v-card-title>
        <v-switch :model-value="props.state" hide-details inset @update:model-value="(val) => updateState(val ?? false)"
            :color="props.state ? 'rgb(76, 175, 80)' : ''" :class="props.state ? 'deep' : ''">
            <template v-slot:label>
                <v-progress-circular v-if="lock" :indeterminate="lock" class="ms-2" size="24"></v-progress-circular>
            </template>
        </v-switch>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps({
    title: {
        type: String,
        require: true,
    },
    state: {
        type: Boolean,
        require: true,
    },
});

const lock = ref<boolean>(false);

watch(props, () => {
    // change state lock
    lock.value = false;
}, { deep: true })

const updateState = (val: Boolean) => {
    if (lock.value) return;
    emit('updateState', val)
    lock.value = true;
}

const emit = defineEmits<{
    updateState: [value: Boolean],
}>()

</script>
<style lang="css" scoped>
.deep :deep(.v-switch__track) {
    opacity: 1;
}
</style>