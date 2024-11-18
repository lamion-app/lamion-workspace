<template>
  <app-card class="w-full overflow-x-auto" :loading="isLoading">
    <template #loader>
      <app-loader class="!items-start" />
    </template>

    <DataTable class="table -m-5 pt-2 min-w-[900px]" :value="data">
      <template v-if="!isLoading" #empty>
        <span>{{ $locale("functions.emptyText") }}</span>
      </template>

      <Column>
        <template #header>
          <div class="header">
            <span class="font-medium">{{
              $locale("functions.table.activity")
            }}</span>
          </div>
        </template>

        <template #body="slotProps">
          <div>
            <value-quantity
              class="font-black"
              value-class="text-3xl"
              quantity-class="text-2xl text-secondary"
              :value="slotProps.data.activityNumber"
              :quantity="slotProps.data.activityQuantity"
            />
          </div>
        </template>
      </Column>

      <Column>
        <template #header>
          <div class="header action" @click="namePopover.toggle($event)">
            <span class="font-medium">{{
              $locale("functions.table.name")
            }}</span>

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

                <div class="actions">
                  <Button
                    type="button"
                    :label="$locale('common.simple.clear')"
                    size="small"
                    severity="secondary"
                    @click="filters.name = undefined"
                  />
                </div>
              </div>
            </popover>
          </div>
        </template>

        <template #body="slotProps">
          <span>{{ slotProps.data.name }}</span>
        </template>
      </Column>

      <Column>
        <template #header>
          <div class="header action" @click="featurePopover.toggle($event)">
            <span class="font-medium">{{
              $locale("functions.table.feature")
            }}</span>

            <m-icon class="text-lg" value="filter_alt" />

            <popover ref="featurePopover">
              <div class="filter-popover">
                <MultiSelect
                  v-model="filters.features"
                  :options="features"
                  option-label="name"
                  :placeholder="$locale('common.simple.any')"
                />

                <div class="actions">
                  <Button
                    type="button"
                    :label="$locale('common.simple.clear')"
                    size="small"
                    severity="secondary"
                    @click="filters.features = undefined"
                  />
                </div>
              </div>
            </popover>
          </div>
        </template>

        <template #body="slotProps">
          <span>{{ slotProps.data.feature.name }}</span>
        </template>
      </Column>

      <Column class="w-[15%]">
        <template #header>
          <div class="header action" @click="tagsPopover.toggle($event)">
            <span class="font-medium">{{
              $locale("functions.table.tags")
            }}</span>

            <m-icon class="text-lg" value="filter_alt" />

            <popover ref="tagsPopover">
              <div class="filter-popover">
                <MultiSelect
                  v-model="filters.tags"
                  :options="tags"
                  option-label="name"
                  :placeholder="$locale('common.simple.any')"
                />

                <div class="actions">
                  <Button
                    type="button"
                    :label="$locale('common.simple.clear')"
                    size="small"
                    severity="secondary"
                    @click="filters.tags = undefined"
                  />
                </div>
              </div>
            </popover>
          </div>
        </template>

        <template #body="slotProps">
          <div class="flex flex-wrap gap-2">
            <div
              v-for="tag in slotProps.data.tags"
              :key="tag"
              class="relative rounded overflow-hidden"
            >
              <span class="relative px-2 z-10">{{ tag.name }}</span>

              <div
                class="absolute top-0 left-0 size-full opacity-50"
                :style="{ 'background-color': tag.color ?? 'silver' }"
              />
            </div>
          </div>
        </template>
      </Column>

      <Column class="w-[100px] row-hover">
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

    <!-- TODO: add bottom progress bar -->
  </app-card>
</template>

<script setup lang="ts">
defineProps<{
  isLoading: boolean;
  data: Array<FunctionItem> | undefined;
  features: Array<FeatureFilter> | undefined;
  tags: Array<FunctionTag> | undefined;
}>();

const filters = defineModel<{
  name: string | undefined;
  features: Array<FeatureFilter> | undefined;
  tags: Array<FunctionTag> | undefined;
}>("filters", { required: true });

const namePopover = ref();
const featurePopover = ref();
const tagsPopover = ref();
</script>

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
