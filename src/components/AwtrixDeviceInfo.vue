<template>
    <v-card class="mx-auto mt-10" :loading="!!deviceInfo">
        <v-card-item>
            <v-card-title>
                Card title
            </v-card-title>

            <v-card-subtitle>
                Card subtitle secondary text
            </v-card-subtitle>
        </v-card-item>

        <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import type { AwtrixStats } from '@/api/awtrix';

const props = defineProps<{
    deviceInfo: AwtrixStats | undefined;
}>();

onMounted(() => {

});


</script>
