<template>
  <app-layout scrollable>
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

        <div class="flex flex-col gap-2">
          <app-card
            v-for="(_, i) in Array(2)"
            :key="i"
            class="flex-1"
            :title="['See app functions', 'Manage crashes'][i]"
            title-class="font-bold text-2xl"
          >
            <template #action>
              <icon-button
                class="!text-2xl !bg-primary-500 !text-primary-950"
                icon="&#xf1e1;"
                @click="
                  navigateTo({
                    name: i == 0 ? 'features-functions' : 'crashes',
                  })
                "
              />
            </template>
          </app-card>
        </div>
      </div>

      <features-card class="col-span-full lg:col-span-8 !h-[600px]">
        <template #extras>
          <div class="info-section">
            <div class="text-xl text-surface-400">Total events</div>

            <value-quantity
              class="text-4xl"
              value="5.67"
              quantity="M"
              quantity-class="text-3xl text-secondary"
            />
          </div>

          <div class="info-section">
            <div class="text-xl text-surface-400">By last month</div>
            <value-quantity
              class="text-4xl"
              value="300"
              quantity="K"
              quantity-class="text-3xl text-secondary"
            />
          </div>

          <div class="info-section">
            <div class="text-xl text-surface-400">Rate</div>
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
        <app-card
          class="!flex-row items-center justify-between"
          title="App features"
          subtitle="Total 30 features"
        >
          <div class="flex flex-wrap gap-2">
            <Button
              severity="secondary"
              rounded
              @click="featuresSortOp.toggle($event)"
            >
              <span class="material-symbols-outlined text-lg">&#xe164;</span>

              <text>Sort by</text>
            </Button>

            <Popover ref="featuresSortOp">
              <div class="flex flex-col">
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
          />
        </div>
      </div>
    </dashboard-layout>
  </app-layout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "main",
});

const featuresSortOp = ref();
</script>
