<template>
  <div class="battery-wrapper">
    <svg
      class="battery-svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Battery Border -->
      <rect
        x="1"
        y="4"
        width="18"
        height="12"
        rx="2"
        ry="2"
        stroke="currentColor"
        fill="none"
        stroke-width="2"
      />

      <!-- Battery Tip -->
      <rect x="19" y="8" width="3" height="4" rx="1" ry="1" fill="currentColor" />

      <!-- Battery Level (dynamic width + color) -->
      <rect
        x="3"
        y="6"
        :width="fillWidth"
        height="8"
        :fill="batteryColor"
        rx="1"
      />
    </svg>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  value: {
    type: Number,
    required: true
  }
})

// 电池内部最大可用宽度（SVG 内部）
const MAX_WIDTH = 14 // rect x=3 到 x=17

// 动态宽度
const fillWidth = computed(() => {
  const v = Math.max(0, Math.min(100, props.value))
  return (v / 100) * MAX_WIDTH
})

// 动态颜色
const batteryColor = computed(() => {
  if (props.value <= 10) return "#ff3b30" // red
  if (props.value <= 20) return "#ffcc00" // yellow
  return "#4cd964" // green
})
</script>

<style scoped>
.battery-wrapper {
  display: inline-flex;
  vertical-align: middle;
  align-items: center;
  gap: 6px;
}

.percent-text {
  font-size: 14px;
}
</style>
