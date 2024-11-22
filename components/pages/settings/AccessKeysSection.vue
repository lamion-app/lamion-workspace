<script lang="ts" setup>
defineProps<{
  items: Array<AccessKey>;
}>();

defineEmits<{
  deleteItem: [{ event: Event; item: AccessKey }];
  deleteAll: [];
}>();
</script>

<template>
  <div class="col gap-4">
    <div class="col gap-2">
      <template v-if="items.length > 0">
        <div
          v-for="item in items"
          :key="item.id"
          class="flex justify-between gap-2"
        >
          <div class="col">
            <span class="text-lg font-medium">{{ item.title }}</span>
            <span class="text-sm font-thin">{{
              $d(item.createdAt, "short")
            }}</span>
          </div>

          <icon-button
            icon="delete"
            severity="danger"
            @click="
              $emit('deleteItem', {
                event: $event,
                item: item,
              })
            "
          />
        </div>
      </template>

      <template v-else>
        <h4>{{ $locale("accessKey.noAccessKeys") }}</h4>
      </template>
    </div>

    <div class="mt-2 flex flex-wrap gap-2">
      <Button
        as="router-link"
        class="max-sm:w-full"
        rounded
        severity="primary"
        :to="createProjectLink('settings-token-new')"
      >
        <m-icon value="add" />

        <span>{{ $locale("settings.accessTokens.newAccessToken") }}</span>
      </Button>

      <Button
        v-show="items.length > 0"
        class="max-sm:w-full"
        text
        rounded
        severity="danger"
        @click="$emit('deleteAll')"
      >
        <m-icon value="delete" />

        <span>{{ $locale("settings.accessTokens.revokeAll") }}</span>
      </Button>
    </div>
  </div>
</template>
