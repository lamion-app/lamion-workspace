<template>
  <Dialog
    v-model:visible="visible"
    class="m-4 w-full sm:max-w-[500px]"
    :show-header="false"
    modal
  >
    <BlockUI :blocked="isLoading">
      <div class="col center gap-4 pt-4">
        <h2 class="text-4xl font-black">Confirm action</h2>

        <span>Are you sure you want to log out of your account?</span>

        <div class="w-full flex justify-end gap-2 flex-wrap">
          <Button
            rounded
            text
            label="Cancel"
            severity="secondary"
            @click="visible = false"
          />

          <Button
            rounded
            text
            label="Logout"
            severity="danger"
            @click="logout"
          />
        </div>
      </div>
    </BlockUI>
  </Dialog>
</template>

<script setup lang="ts">
const { logout, isLoading } = useAppAuth();

const visible = defineModel<boolean>("visible", { required: true });
</script>
