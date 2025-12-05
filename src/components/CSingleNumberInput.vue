<template>
    <v-row>
        <v-col cols="8">
            <v-number-input :model-value="inputVal" :reverse="false" :max="props.max" :min="props.min" controlVariant="stacked"
                :label="props.placeholder" :hideInput="false" :inset="false" @update:modelValue="inputChangeEvent" :disabled="lock">
            </v-number-input>
        </v-col>
        <v-col cols="4" class="pr-4 pl-0">
            <v-btn @click="submitEvent" height="55px" width="100%" :loading="lock">Submit</v-btn>
        </v-col>
    </v-row>
</template>
<script lang="ts" setup>
const props = defineProps({
    value: {
        type: Number,
        required: false,
    },
    min: {
        type: Number,
        required: true,
    },
    max: {
        type: Number,
        required: true,
    },
    placeholder: {
        type: String,
        required: false,
    },
});

const inputVal = ref<number>(0);
const lock = ref(false);

watch(props, () => {
    // change state lock
    lock.value = false;
}, { deep: true })


const inputChangeEvent = (val:number) => {
    inputVal.value = val;
}

const emit = defineEmits<{
    "submit": [value: Number],
}>();

const submitEvent = () => {
    if(lock.value) return;
    if(inputVal.value === props.value) return;
    emit("submit", inputVal.value)
    lock.value = true;
}

onBeforeMount(() => {
    inputVal.value = props.value ?? 0;
})

</script>
<style lang="css" scoped></style>
