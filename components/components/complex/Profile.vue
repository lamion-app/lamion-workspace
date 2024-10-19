<template>
  <NuxtLink :to="{ name: 'profile' }" class="w-full">
    <app-card class="profile" :class="{ expanded: expanded }">
      <div class="profile-content">
        <profile-avatar :username="account.username" :image="account.image" />

        <div class="profile-data">
          <span class="name" v-text="account.username" />

          <NuxtLink :to="{ name: 'auth-logout' }" class="logout"
            >Logout
          </NuxtLink>
        </div>

        <span class="icon material-icons">chevron_right</span>
      </div>
    </app-card>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  expanded: boolean;
  account: Account;
}>();
</script>

<style scoped lang="scss">
.profile {
  @apply w-full;

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
