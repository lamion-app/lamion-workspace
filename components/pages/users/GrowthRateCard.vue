<template>
  <app-card title="Growth rate" no-gap>
    <div class="h-full col justify-end gap-6">
      <value-quantity
        class="text-8xl font-medium"
        value="20"
        quantity="%"
        quantity-class="text-7xl text-secondary"
      />

      <text-up-down-indicator
        icon="&#xf22b;"
        :value="5"
        quantity="%"
        label="from last month"
      />
    </div>
  </app-card>
</template>
