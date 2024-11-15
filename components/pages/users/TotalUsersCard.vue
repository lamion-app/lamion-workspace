<template>
  <app-card
    :title="$locale('users.totalUsers')"
    title-class="text-lg text-secondary"
    no-gap
    container-class="col -mx-5 overflow-hidden"
  >
    <value-quantity
      class="mx-5 text-4xl font-medium"
      value="500"
      quantity="K"
      quantity-class="text-3xl text-secondary"
    />

    <active-users-chart class="mt-2 flex-1 overflow-hidden" />

    <text-up-down-indicator
      class="mx-5 mt-4"
      icon="&#xe7fd;"
      :value="12"
      quantity="%"
      :label="$locale('common.phrases.fromLastMonth')"
    />
  </app-card>
</template>
