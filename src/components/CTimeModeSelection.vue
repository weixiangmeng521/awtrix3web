<template>
    <CTimeModeItem v-for="(item, i) in selectionList" :key="i" :cover="item.img" :mode="item.mode" :state="item.state"
        @update-state="onUpdateEvent(item)" :lock="lock" />
</template>

<script lang="ts" setup>
import type { AwtrixSettings } from '@/api/awtrix';
import TMODE_MAPPING from '@/config/TimeMode';
import { deepClone } from '@/utils/helper';

type CTimeModeItem = { img: string, mode: number, state: boolean };
const props = defineProps<{
    settingInfo: AwtrixSettings | undefined,
}>()
const emit = defineEmits<{
    "onTimeModeChanged": [number],
}>();
const lock = ref(true);
const selectionList = ref<CTimeModeItem[]>(
    TMODE_MAPPING.map(item => ({
        ...item,
        state: false,
    }))
);
const backupSelectionList = TMODE_MAPPING.map(row => ({
    ...row,
    state: false,
}))
Object.freeze(backupSelectionList);


watch(props, () => {
    // change state lock
    lock.value = false;
}, { deep: true })


watch(
    () => props.settingInfo?.TMODE,
    (newVal, oldVal) => {
        if (newVal === oldVal) return;
        const row = selectionList.value.find(item => item.mode === newVal);
        if (!row) return;
        onUpdateEvent(row, true);
    }
);


const onUpdateEvent = async (item: CTimeModeItem, isLock = false) => {
    if (lock.value && !isLock) return;
    selectionList.value = [];
    await nextTick();
    const newMap = deepClone(backupSelectionList);
    newMap.forEach((row) => {
        if (row.mode === item.mode) {
            if(!isLock) emit("onTimeModeChanged", row.mode);
            row.state = true;
        }
    })
    selectionList.value = newMap;
    if(!isLock) lock.value = true;
};
</script>
<style lang="css" scoped>
.deep :deep(.v-switch__track) {
    opacity: 1;
}
</style>
