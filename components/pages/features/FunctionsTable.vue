<script setup lang="ts">
defineProps<{
  isLoading: boolean;
  items: Array<FunctionDetailedDto> | undefined;
  features: Array<FeatureSimpleDto> | undefined;
  tags: Array<FunctionTag> | undefined;
}>();

const filters = defineModel<{
  name: string | undefined;
  features: Array<FeatureSimpleDto> | undefined;
  tags: Array<FunctionTag> | undefined;
}>("filters", { required: true });

const namePopover = ref();
const featurePopover = ref();
const tagsPopover = ref();
</script>

<template>
  <DataTable class="table -m-5 pt-2 min-w-[900px]" :value="items">
    <Column>
      <template #header>
        <div class="header">
          <span class="font-medium">{{
            $locale("functions.table.activity")
          }}</span>
        </div>
      </template>

      <template #body="{ data }">
        <div>
          <value-quantity
            class="font-black"
            :value="data.events"
            value-class="text-3xl"
            quantity-class="text-2xl text-secondary"
          />
        </div>
      </template>
    </Column>

    <Column>
      <template #header>
        <div class="header action" @click="namePopover.toggle($event)">
          <span class="font-medium">{{ $locale("functions.table.name") }}</span>

          <m-icon class="text-lg" value="filter_alt" />

          <popover ref="namePopover">
            <div class="filter-popover">
              <IconField>
                <InputIcon>
                  <m-icon value="search" class="text-lg" />
                </InputIcon>

                <InputText
                  v-model="filters.name"
                  :disabled="isLoading"
                  :placeholder="$locale('functions.searchByName')"
                />
              </IconField>

              <Button
                type="button"
                :label="$locale('common.simple.clear')"
                size="small"
                severity="secondary"
                @click="filters.name = undefined"
              />
            </div>
          </popover>
        </div>
      </template>

      <template #body="{ data }">
        <span>{{ data.title }}</span>
      </template>
    </Column>

    <Column class="w-[25%]">
      <template #header>
        <div class="header action" @click="featurePopover.toggle($event)">
          <span class="font-medium">{{
            $locale("functions.table.feature")
          }}</span>

          <m-icon class="text-lg" value="filter_alt" />

          <popover ref="featurePopover">
            <div class="filter-popover">
              <multi-select
                v-model="filters.features"
                :options="features"
                option-label="title"
                :placeholder="$locale('common.simple.any')"
              >
                <template #option="{ option }">
                  <span
                    class="max-w-[150px] line-clamp-1"
                    :title="option.title"
                    >{{ option.title }}</span
                  >
                </template>
              </multi-select>

              <Button
                type="button"
                :label="$locale('common.simple.clear')"
                size="small"
                severity="secondary"
                @click="filters.features = undefined"
              />
            </div>
          </popover>
        </div>
      </template>

      <template #body="{ data }">
        <div class="flex flex-wrap gap-2">
          <nuxt-link
            v-for="feature in data.features"
            :key="feature.id"
            class="max-w-[100px] rounded px-4 whitespace-nowrap overflow-hidden text-ellipsis"
            :style="{
              backgroundColor: stringToColour(feature.title),
            }"
            :title="feature.title"
            :to="createProjectLink('features-id', { id: feature.id })"
            >{{ feature.title }}
          </nuxt-link>
        </div>
      </template>
    </Column>

    <Column class="w-[15%]">
      <template #header>
        <div class="header action" @click="tagsPopover.toggle($event)">
          <span class="font-medium">{{ $locale("functions.table.tags") }}</span>

          <m-icon class="text-lg" value="filter_alt" />

          <popover ref="tagsPopover">
            <div class="filter-popover">
              <multi-select
                v-model="filters.tags"
                :options="tags"
                option-label="title"
                :placeholder="$locale('common.simple.any')"
              />

              <Button
                type="button"
                :label="$locale('common.simple.clear')"
                size="small"
                severity="secondary"
                @click="filters.tags = undefined"
              />
            </div>
          </popover>
        </div>
      </template>

      <template #body="{ data }">
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in data.tags"
            :key="tag.id"
            class="max-w-[100px] rounded px-4 whitespace-nowrap overflow-hidden text-ellipsis"
            :style="{
              backgroundColor: stringToColour(tag.title),
            }"
            :title="tag.title"
            >{{ tag.title }}
          </span>
        </div>
      </template>
    </Column>

    <Column class="max-md:hidden w-[100px] row-hover">
      <template #body>
        <div class="flex gap-2">
          <icon-button
            class="!bg-surface-700 !bg-opacity-20 !text-surface-100"
            icon="edit"
          />
          <icon-button
            class="!bg-red-700 !bg-opacity-20 !text-red-100"
            icon="delete"
          />
        </div>
      </template>
    </Column>
  </DataTable>
</template>

<style scoped lang="scss">
.header {
  @apply size-full flex items-center gap-2;

  &.action {
    @apply cursor-pointer;
  }
}

.filter-popover {
  min-width: 200px;
  @apply flex flex-col gap-2;

  .actions {
    @apply flex flex-wrap justify-between gap-2;
  }
}
</style>

<style lang="scss">
.p-datatable-table {
  th,
  td {
    &:first-child {
      @apply ps-8 !important;
    }

    &:last-child {
      @apply pe-8 !important;
    }
  }
}

.table {
  .row-hover {
    @apply opacity-0 transition;
  }

  tr:hover {
    .row-hover {
      @apply opacity-100;
    }
  }
}
</style>
