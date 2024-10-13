<template>
  <app-card
    class="!gap-0"
    title="Active users"
    title-class="text-lg text-secondary"
  >
    <value-quantity
      class="text-4xl font-medium"
      value="20"
      quantity="K"
      quantity-class="text-3xl text-secondary"
    />

    <active-users-chart class="mt-2 -mx-5 h-full" />

    <text-up-down-indicator
      class="mt-4"
      icon="&#xe7fd;"
      :value="34"
      quantity="%"
      label="from last month"
    />
  </app-card>
</template>
