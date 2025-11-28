<template>
  <v-app>
    <router-view />

    <v-snackbar-queue v-model="notification.queue" color="primary"></v-snackbar-queue>
  </v-app>
</template>

<script lang="ts" setup>
import { useNotificationStore } from './hooks/useNotificationStore';

const notification = useNotificationStore();

//
</script>
