<template>
    <v-chip-group column>
        <v-chip v-if="!lock" v-for="(key, value) in props.appInfo" :key="key" :class="props.currentApp === value ? 'curApp' : ''"
            @click="changeAppEvent(String(value))">{{ value }}</v-chip>

        <v-progress-circular v-if="lock" :indeterminate="lock" class="ms-2 mb-4" size="24"></v-progress-circular>
    </v-chip-group>

</template>
<script lang="ts" setup>
import type { AppLoopInfo } from "@/api/awtrix.d"

const props = defineProps<{
    appInfo: AppLoopInfo | undefined;
    currentApp: string | undefined;
}>()

const lock = ref(false);

watch(props, () => {
    lock.value = false;
}, { deep: true })

const emit = defineEmits<{
    changeApp: [value: string],
}>()

function changeAppEvent(value: string) {
    if (lock.value) return;
    emit('changeApp', value);
    lock.value = true;
}

</script>
<style lang="css" scoped>
.curApp {
    background-color: rgb(76, 175, 80);
    color: #fff;
}
</style>