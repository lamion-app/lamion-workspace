<template>
  <Dialog
    v-model:visible="visible"
    class="m-4 w-full sm:max-w-[500px]"
    :show-header="false"
    modal
  >
    <BlockUI :blocked="isLoading">
      <div class="col center gap-4 pt-4">
        <h2 class="text-4xl font-black">
          {{ $locale("auth.logout.dialog.title") }}
        </h2>

        <span>{{ $locale("auth.logout.dialog.subtitle") }}</span>

        <div class="w-full flex justify-end gap-2 flex-wrap">
          <Button
            rounded
            text
            :label="$locale('common.simple.cancel')"
            severity="secondary"
            @click="visible = false"
          />

          <Button
            rounded
            text
            :label="$locale('auth.logout.action')"
            severity="danger"
            @click="
              logout();
              visible = false;
            "
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
