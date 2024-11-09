<template>
  <app-card :title="$locale('activeUsers')" title-class="text-lg text-secondary" no-gap>
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
      :label="$locale('fromLastMonth')"
    />
  </app-card>
</template>
