<template>
  <dashboard-layout>
    <div class="col-span-4 flex flex-col gap-4 !h-[600px]">
      <app-card title="Total requests" class="flex-1">
        <active-users-chart class="flex-1 -mx-5" />

        <text-up-down-indicator
          class="mt-2"
          icon="&#xe7fd;"
          :value="34"
          quantity="%"
          label="from last month"
        />
      </app-card>

      <app-health-card class="flex-1" />
    </div>

    <features-card class="col-span-8 !h-[600px]">
      <template #extras>
        <div class="info-section">
          <div class="text-xl text-surface-400">Total requests</div>

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

    <panel
      header="App features"
      class="col-span-full !bg-surface-900 !border-0 !rounded-xl"
      toggleable
    >
      <template #icons>
        <icon-button icon="&#xe164;" @click="featuresSortOp.toggle($event)" />

        <Popover ref="featuresSortOp">
          <span class="text-sm text-secondary">Sort by</span>

          <div class="mt-2 flex flex-col">
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
      </template>

      <div class="lg:grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        <feature-card v-for="(_, index) in Array(10)" :key="index" />
      </div>
    </panel>

    <functions-table class="col-span-full" />
  </dashboard-layout>
</template>

<script setup lang="ts">
const featuresSortOp = ref();
</script>
