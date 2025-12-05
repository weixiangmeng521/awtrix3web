<template>
    <div>
        <v-combobox v-if="!lock" :label="props.placeHolder" v-model="selected" :items="props.list ?? []"
            @update:model-value="onChanged"></v-combobox>
        <v-progress-circular v-if="lock" :indeterminate="lock" class="ms-2 mb-4 mt-4" size="24"></v-progress-circular>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
    list: string[],
    selected: number,
    placeHolder: string,
}>()

const emit = defineEmits<{
    "onChanged": [number],
}>();

const selected = ref<string>("");
const lock = ref<boolean>(false);

watch(props, () => {
    // change state lock
    lock.value = false;
}, { deep: true })


const getIndex = (cur: string) => {
    const _list = props.list ?? [];
    const index = _list.indexOf(cur);
    if (index === -1) return 0;
    return index;
}

const onChanged = (changedOption: string) => {
    if (lock.value) return;
    const list = props.list ?? [];
    const index = getIndex(changedOption);
    const curSelect = (list[index]) as string;
    selected.value = curSelect;
    emit("onChanged", index);
    lock.value = true;
}

onMounted(() => {
    const list = props.list ?? [];
    const curSelect = (list[props.selected ?? 0] ?? "") as string;
    selected.value = curSelect;
})

</script>
