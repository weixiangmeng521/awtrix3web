<template>
  <v-footer app height="40" class="d-flex justify-center align-center font-weight-light">
    &copy; {{ currentYear }} weixiangmeng521. All rights reserved.
  </v-footer>
</template>
<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>
<style scoped lang="sass">
  .social-link :deep(.v-icon)
    color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
    text-decoration: none
    transition: .2s ease-in-out

    &:hover
      color: rgba(25, 118, 210, 1)
</style>
