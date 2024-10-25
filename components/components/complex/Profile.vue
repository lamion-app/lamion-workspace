<template>
  <NuxtLink :to="createProjectLink('profile')" class="w-full">
    <app-card class="profile" :class="{ expanded: expanded }">
      <div class="profile-content">
        <label-image :label="account.username" :image="account.image" />

        <div class="profile-data">
          <span class="name" v-text="account.username" />

          <span class="logout" @click.prevent="isLogoutDialogVisible = true"
            >Logout</span
          >
        </div>

        <m-icon class="icon" value="chevron_right" />
      </div>
    </app-card>

    <logout-dialog v-model:visible="isLogoutDialogVisible" />
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  expanded: boolean;
  account: Account;
}>();

const isLogoutDialogVisible = ref(false);
</script>

<style scoped lang="scss">
.profile {
  @apply w-full;

  @media (prefers-color-scheme: light) {
    @apply bg-surface-200 !important;
  }

  .profile-content {
    @apply flex gap-2 items-center;

    .profile-data {
      @apply flex flex-col;
      flex: 1;

      .name {
        @apply text-lg;
      }

      .logout {
        @apply w-min;
        @apply text-sm text-red-400 font-bold;
      }
    }
  }

  &:not(.expanded) {
    @apply p-2;
    @apply flex items-center justify-center;

    .profile-data,
    .icon {
      display: none;
    }
  }
}
</style>
