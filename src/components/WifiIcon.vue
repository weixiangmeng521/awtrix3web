<template>
    <svg width="130px" height="130px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- 最大弧 -->
        <path d="M2.67 9.56C5.14 7.35 8.41 6 12 6C15.59 6 18.86 7.35 21.33 9.56"
            :stroke="singleRange[3] ? '#000' : '#ccc'" stroke-width="2" fill="none" stroke-linecap="round" />

        <!-- 中间弧 -->
        <path d="M4.6 12.5C6.55 10.7 9.15 10 12 10C14.85 10 17.45 10.7 19.4 12.5"
            :stroke="singleRange[2] ? '#000' : '#ccc'" stroke-width="2" fill="none" stroke-linecap="round" />

        <!-- 最小弧 -->
        <path d="M7.96 15.56C9.03 14.59 10.45 14 12 14C13.55 14 14.97 14.59 16.04 15.56"
            :stroke="singleRange[1] ? '#000' : '#ccc'" stroke-width="2" fill="none" stroke-linecap="round" />

        <!-- 中心点 -->
        <circle cx="12" cy="18" r="1.5" :fill="singleRange[0] ? '#000' : '#ccc'" />
    </svg>
</template>

<script lang="ts" setup>
const props = defineProps<{
    value: number | undefined;
}>();

const singleRange = ref<Array<boolean>>(new Array<boolean>(4).fill(false));

function rende(value:number) {
    value = Math.abs(value);
    singleRange.value = new Array<boolean>(4).fill(false);
    let times = 0;
    if (30 <= value && value < 50) {
        times = 4;
    }
    if (50 <= value && value < 60) {
        times = 3;
    }
    if (60 <= value && value < 70) {
        times = 2;
    }
    if (70 <= value && value < 80) {
        times = 1;
    }
    for (let i = 0; i <= times; i++) {
        singleRange.value[i] = true;
    }
}


watch(props, (newProps) => {
    newProps.value && rende(newProps.value)
}, { deep: true })

onMounted(() => {
})

onUnmounted(() => {
})
</script>
<style lang="css" scoped></style>