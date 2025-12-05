<template>
  <v-app>
    <router-view />

    <!-- notification begin -->
    <v-snackbar-queue v-model="notification.queue" multi-line :timeout="notification.head()?.timeout"
      :color="notification.head()?.color">
    </v-snackbar-queue>
    <!-- notification end -->

    <!-- modal begin -->
    <v-dialog
      v-model="modal.show.value"
      max-width="500"
      width="auto"
    >
      <v-card
        max-width="400"
        :prepend-icon="modal.info.value?.prependIcon"
        :text="modal.info.value?.text"
        :title="modal.info.value?.title"
      >
        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            text="OK"
            @click="modal.close()"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
    <!-- modal end -->
    
    <ColorPickerModal/>
  </v-app>
</template>

<script lang="ts" setup>
import ColorPickerModal from './components/modals/ColorPickerModal.vue';
import { useModal } from './hooks/useModal';
import { useNotificationStore } from './hooks/useNotificationStore';
const notification = useNotificationStore();
const modal = useModal();
</script>
