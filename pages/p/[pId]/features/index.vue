<template>
  <app-layout>
    <dashboard-layout>
      <div class="col-span-full lg:col-span-4 flex flex-col gap-4 !h-[600px]">
        <app-card :title="$locale('totalEvents')" class="flex-1">
          <active-users-chart class="flex-1 -mx-5" />

          <text-up-down-indicator
            class="mt-2"
            icon="&#xe7fd;"
            :value="34"
            quantity="%"
            :label="$locale('fromLastMonth')"
          />
        </app-card>

        <div class="col gap-2">
          <app-card
            v-for="(_, i) in Array(2)"
            :key="i"
            class="flex-1"
            :title="[$locale('seeAppFunctions'), $locale('manageCrashes')][i]"
            title-class="font-bold text-2xl"
          >
            <template #action>
              <icon-button
                as="router-link"
                class="!text-2xl"
                :class="{
                  '!bg-primary-500': i === 0,
                  '!text-primary-100': i === 0,
                  '!bg-red-500': i === 1,
                  '!text-red-100': i === 1,
                }"
                icon="&#xf1e1;"
                :to="
                  createProjectLink(
                    i === 0 ? 'features-functions' : 'features-crashes',
                  )
                "
              />
            </template>
          </app-card>
        </div>
      </div>

      <features-card class="col-span-full lg:col-span-8 !h-[600px]" />

      <div class="col-span-full hidden lg:block" />

      <div class="col-span-full">
        <app-card
          class="!gap-4"
          :title="$locale('appFeatures')"
          :subtitle="$locale('total_items', { count: 350 })"
        >
          <div class="flex flex-wrap gap-2">
            <Button
              severity="primary"
              rounded
              @click="addFeatureDialogVisible = true"
            >
              <m-icon value="add" />

              <span>{{ $locale("createNewFeature") }}</span>
            </Button>

            <div class="spacer" />

            <Button
              severity="secondary"
              rounded
              @click="featuresSortOp.toggle($event)"
            >
              <span>{{ $locale("sortBy") }}</span>
              <m-icon value="sort" />
            </Button>

            <Popover ref="featuresSortOp">
              <div class="col">
                <button
                  v-for="item in ['Requests', 'Errors', 'Date created']"
                  :key="item"
                  class="rounded px-4 py-2 text-start"
                  :class="{
                    'bg-surface-800': item == 'Requests',
                  }"
                >
                  <span>{{ item }}</span>
                </button>
              </div>
            </Popover>
          </div>
        </app-card>

        <div
          class="mt-4 grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4"
        >
          <feature-card
            v-for="(_, index) in Array(10)"
            :key="index"
            class="bg-surface-900"
            @click:open="
              navigateTo(
                createProjectLink('features-id', {
                  id: 1,
                }),
              )
            "
            @click:edit="showEditDialogVisible = true"
          />
        </div>
      </div>
    </dashboard-layout>

    <add-feature-dialog v-model:visible="addFeatureDialogVisible" />
    <edit-feature-dialog v-model:visible="showEditDialogVisible" />
  </app-layout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "main",
});

useHead({
  title: "Features",
});

const featuresSortOp = ref();

const addFeatureDialogVisible = ref(false);
const showEditDialogVisible = ref(false);
</script>
