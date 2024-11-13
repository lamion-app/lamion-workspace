<template>
  <app-card :title="$locale('users.growthRate')" no-gap>
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
        :label="$locale('common.phrases.fromLastMonth')"
      />
    </div>
  </app-card>
</template>
