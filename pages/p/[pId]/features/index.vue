<template>
  <app-layout>
    <dashboard-layout>
      <div class="col-span-full lg:col-span-4 flex flex-col gap-4 !h-[600px]">
        <app-card title="Total events" class="flex-1">
          <active-users-chart class="flex-1 -mx-5" />

          <text-up-down-indicator
            class="mt-2"
            icon="&#xe7fd;"
            :value="34"
            quantity="%"
            label="from last month"
          />
        </app-card>

        <div class="col gap-2">
          <app-card
            v-for="(_, i) in Array(2)"
            :key="i"
            class="flex-1"
            :title="['See app functions', 'Manage crashes'][i]"
            title-class="font-bold text-2xl"
          >
            <template #action>
              <icon-button
                class="!text-2xl"
                :class="{
                  '!bg-primary-500': i === 0,
                  '!text-primary-100': i === 0,
                  '!bg-red-500': i === 1,
                  '!text-red-100': i === 1,
                }"
                icon="&#xf1e1;"
                @click="
                  createProjectLink(i === 0 ? 'features-functions' : 'crashes')
                "
              />
            </template>
          </app-card>
        </div>
      </div>

      <features-card class="col-span-full lg:col-span-8 !h-[600px]">
        <template #extras>
          <div class="col">
            <span class="text-xl text-surface-400">Total events</span>

            <value-quantity
              class="text-4xl"
              value="5.67"
              quantity="M"
              quantity-class="text-3xl text-secondary"
            />
          </div>

          <div class="col">
            <span class="text-xl text-surface-400">By last month</span>
            <value-quantity
              class="text-4xl"
              value="300"
              quantity="K"
              quantity-class="text-3xl text-secondary"
            />
          </div>

          <div class="col">
            <span class="text-xl text-surface-400">Rate</span>
            <value-quantity
              class="text-4xl"
              value="10"
              quantity="K/day"
              quantity-class="text-3xl text-secondary"
            />
          </div>
        </template>
      </features-card>

      <div class="col-span-full hidden lg:block" />

      <div class="col-span-full">
        <app-card class="!gap-4" title="App features" subtitle="Total 30 items">
          <div class="flex flex-wrap gap-2">
            <Button
              severity="primary"
              rounded
              @click="addFeatureDialogVisible = true"
            >
              <m-icon value="add" />

              <span>Create new feature</span>
            </Button>

            <div class="spacer" />

            <Button
              severity="secondary"
              rounded
              @click="featuresSortOp.toggle($event)"
            >
              <span>Sort by</span>
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
                })
              )
            "
            @click:edit="addFeatureDialogVisible = true"
          />
        </div>
      </div>
    </dashboard-layout>

    <add-feature-dialog v-model:visible="addFeatureDialogVisible" />
  </app-layout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "main",
});

useHead({
  title: "Features",
});

const { createProjectLink } = useProjects();

const featuresSortOp = ref();

const addFeatureDialogVisible = ref(false);
</script>
