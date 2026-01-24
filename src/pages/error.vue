<template>
    <AdminLayout>
        <template #main>
            <v-container class="flex">
                <v-row>
                    <v-col cols="12">
                        <div class="text-h4 font-weight-bold mb-6">Error</div>
                        <div class="text-subtitle-1">{{ errorMessage }} </div>
                    </v-col>
                </v-row>
            </v-container>
        </template>
    </AdminLayout>
</template>

<script lang="ts" setup>
import AdminLayout from '@/layouts/AdminLayout.vue';
import { useAppStore } from '@/stores/app';
const defaultMessage = "An unexpected error has occurred. Please try again later.";
const errorMessage = ref<string>("");

onMounted(() => {
    const route = useRoute();
    const query = route.query;
    let msg = defaultMessage;
    for(const key in query){
        if(key === "msg"){
            msg = window.atob(query[key] as string);
        }
    }
    errorMessage.value = msg;
    debugger;
})
</script>
