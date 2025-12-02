<template>
    <v-col class="text-left">
        <span class="text-h2 font-weight-light" v-text="value"></span>
        <span class="subheading font-weight-light me-1 ml-2">Lux</span>
    </v-col>
    <v-slider v-model="slideValue" :max="props.max" :min="props.min" :step="1" thumb-label color="rgb(76, 175, 80)"
        @update:model-value="dragEvent" :disabled="props.disabled">
        <template v-slot:prepend>
            <v-btn color="#000" icon="mdi-minus" size="small" variant="text" @click="decrement"></v-btn>
        </template>

        <template v-slot:append>
            <v-btn color="#000" icon="mdi-plus" size="small" variant="text" @click="increment"></v-btn>
        </template>
    </v-slider>
</template>
<script lang="ts" setup>
const props = defineProps({
    value: {
        type: Number,
        require: true,
    },
    max: {
        type: Number,
        require: true,
    },
    min: {
        type: Number,
        require: true,
    },
    disabled: {
        type: Boolean,
        require: false,
    }
});

const slideValue = ref(props.value);

let dragTimer: ReturnType<typeof setTimeout> | null = null;

const emit = defineEmits<{
    onSlideChange: [Number];
}>();

// watch the dragger change event
watch(props, (newProps) => {
    slideValue.value = newProps.value
}, { deep: true })


const clamp = (value: number) => {
    const min = props.min ?? 0;
    const max = props.max ?? 100;
    return Math.min(max, Math.max(min, value));
};

const decrement = () => {
    const newVal = clamp((slideValue.value ?? 0) - 1);
    slideValue.value = newVal;
    emit("onSlideChange", slideValue.value ?? 0);
};

const increment = () => {
    const newVal = clamp((slideValue.value ?? 0) + 1);
    slideValue.value = newVal;
    emit("onSlideChange", slideValue.value ?? 0);
};

const dragEvent = () => {
    if (dragTimer) clearTimeout(dragTimer);

    dragTimer = setTimeout(() => {
        emit("onSlideChange", slideValue.value ?? 0);
    }, 300);
};
</script>
<style lang="css" scoped></style>
