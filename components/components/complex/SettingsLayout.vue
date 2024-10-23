<template>
  <div class="settings">
    <div v-for="section in sections" :key="section.title" class="section">
      <div class="header">
        <span class="text-xl font-bold">{{ section.title }}</span>
      </div>

      <div class="items">
        <template v-for="item in section.items" :key="item.key">
          <div class="divider" />

          <div class="item">
            <div class="label">
              <span class="title" v-text="item.title" />
              <span class="subtitle" v-text="item.subtitle" />
            </div>

            <div class="data">
              <template v-if="isEditMode(item)">
                <div class="value">
                  <template v-if="item.type == 'text'">
                    <InputText
                      v-model="textEditData!.value"
                      :class="isEditDataError ? '!border-red-500' : undefined"
                      type="text"
                    />
                  </template>

                  <template v-else-if="item.type == 'image'">
                    <FileUpload
                      mode="basic"
                      custom-upload
                      auto
                      severity="secondary"
                      class="p-button-outlined"
                      @select="onFileSelect"
                    />
                  </template>
                </div>

                <div class="actions !opacity-100">
                  <block-ui :blocked="isEditDataError">
                    <icon-button
                      icon="check"
                      severity="primary"
                      @click="finishEditMode()"
                    />
                  </block-ui>

                  <icon-button
                    icon="close"
                    severity="danger"
                    @click="cancelEditMode()"
                  />
                </div>
              </template>

              <template v-else>
                <template v-if="item.type == 'text'">
                  <span class="value" v-text="item.value" />

                  <div class="actions">
                    <icon-button
                      icon="content_copy"
                      severity="secondary"
                      @click="copyText(item.value)"
                    />

                    <icon-button
                      icon="edit"
                      severity="primary"
                      @click="startEditMode(item)"
                    />
                  </div>
                </template>

                <template v-else-if="item.type == 'image'">
                  <div class="value">
                    <label-image
                      class="!size-[64px] !bg-window"
                      :label="item.label"
                      :image="item.value"
                    />
                  </div>

                  <div class="actions">
                    <icon-button
                      icon="edit"
                      severity="primary"
                      @click="startEditMode(item)"
                    />

                    <icon-button
                      icon="delete"
                      severity="secondary"
                      @click="deleteImageItem(item)"
                    />
                  </div>
                </template>
              </template>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FileUploadSelectEvent } from "primevue/fileupload";

interface BaseSettingsItem {
  key: string;
  type: "text" | "image";
  title: string;
  subtitle: string;
}

interface TextSettingsItem extends BaseSettingsItem {
  type: "text";
  value: string;
}

interface ImageSettingsItem extends BaseSettingsItem {
  type: "image";
  value?: string;
  label: string;
}

type SettingsItem = TextSettingsItem | ImageSettingsItem;

interface Section {
  title: string;
  items: Array<SettingsItem>;
}

const props = defineProps<{
  sections: Array<Section>;
  validation: (key: string, value: string) => boolean;
}>();

const emits = defineEmits<{
  updateTextItem: [
    {
      item: TextSettingsItem;
      value: string;
    },
  ];
  updateImage: [
    {
      item: SettingsItem;
      value: unknown;
    },
  ];
  deleteImage: [SettingsItem];
}>();

const textEditData = ref<
  | {
      item: TextSettingsItem;
      value: string;
    }
  | undefined
>();

const imageEditData = ref<
  | {
      item: ImageSettingsItem;
      file: unknown;
    }
  | undefined
>();

const isEditDataError = computed(() => {
  const data = textEditData.value;
  if (data == undefined) return false;

  return !props.validation(data.item.key, data.value);
});

const isEditMode = computed(() => (item: SettingsItem) => {
  return (
    textEditData.value?.item.key == item.key ||
    imageEditData.value?.item.key == item.key
  );
});

function copyText(text: string) {
  navigator.clipboard.writeText(text);
}

function cancelEditMode() {
  textEditData.value = undefined;
  imageEditData.value = undefined;
}

function startEditMode(item: SettingsItem) {
  cancelEditMode();

  if (item.type == "text") {
    textEditData.value = {
      item: item,
      value: item.value,
    };
  } else if (item.type == "image") {
    imageEditData.value = {
      item: item,
      file: null,
    };
  }
}

function onFileSelect(event: FileUploadSelectEvent) {
  imageEditData.value = {
    item: imageEditData.value!.item,
    file: event.files[0],
  };
}

function deleteImageItem(item: ImageSettingsItem) {
  emits("deleteImage", item);

  cancelEditMode();
}

function finishEditMode() {
  if (textEditData.value != null) {
    emits("updateTextItem", {
      item: textEditData.value!.item,
      value: textEditData.value!.value,
    });
  } else if (imageEditData.value != null) {
    emits("updateImage", {
      item: imageEditData.value!.item,
      value: imageEditData.value!.file,
    });
  }

  cancelEditMode();
}
</script>

<style scoped lang="scss">
@import url(@/assets/css/main.scss);

.settings {
  @apply flex flex-col gap-2;

  .divider {
    @apply w-full h-px;
    @apply bg-surface-800;
  }

  .section {
    .items {
      @apply flex flex-col gap-2;
      @apply mt-1;
    }

    .item {
      @apply min-h-[48px];
      @apply flex flex-col sm:flex-row sm:items-center gap-2;

      .label {
        flex: 1;
        @apply col;
        @apply text-sm;

        .title {
          @apply font-bold;
        }

        .subtitle {
          @apply text-secondary;
        }
      }

      .data {
        flex: 2;
        @apply flex items-center gap-2;

        .actions {
          @apply flex;
          @apply sm:opacity-0 transition;
        }
      }

      &:hover {
        .actions {
          @apply opacity-100;
        }
      }
    }
  }
}
</style>
