<template>
  <NuxtLink :to="{ name: 'profile' }" class="w-full">
    <Card class="profile">
      <template #content>
        <div class="profile-content">
          <Avatar
            class="avatar"
            :label="
              account.image == null || account.image.length == 0
                ? account.username.charAt(0).toUpperCase()
                : undefined
            "
            :image="
              account.image == null || account.image.length == 0
                ? undefined
                : account.image
            "
            size="large"
            shape="circle"
          />

          <div class="profile-data">
            <span class="name" v-text="account.username" />

            <NuxtLink :to="{ name: 'auth-logout' }" class="logout"
              >Logout
            </NuxtLink>
          </div>

          <span class="material-icons">chevron_right</span>
        </div>
      </template>
    </Card>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
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
}
</style>
