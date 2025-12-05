<template>
    <v-dialog max-width="600" width="auto" v-model="colorPickerModal.isShow.value">
        <v-card prepend-icon="mdi-palette" :title="colorPickerModal.info.value.title" width="100%">
            <v-color-picker v-model="colorPickerModal.info.value.color" :modes="['rgb']" :swatches="swatches" class="ma-2" show-swatches></v-color-picker>
            <template v-slot:actions>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="Close" variant="plain" @click="colorPickerModal.close()"></v-btn>
                    <v-btn color="rgb(76, 175, 80)" text="Confirm" variant="tonal" @click="colorPickerModal.confirm()"></v-btn>
                </v-card-actions>
            </template>
        </v-card>
    </v-dialog>
</template>
<script lang="ts" setup>
import { useColorPickerModal } from '@/hooks/useColorPickerModal';

const colorPickerModal = useColorPickerModal();

const swatches = [
    ['#FF0000', '#AA0000', '#550000'],
    ['#FFFF00', '#AAAA00', '#555500'],
    ['#00FF00', '#00AA00', '#005500'],
    ['#00FFFF', '#00AAAA', '#005555'],
    ['#0000FF', '#0000AA', '#000055'],
]


</script>
<style lang="css" scoped></style>
