<template>
  <app-card
    :title="$locale('averageInAppActivityTitle')"
    :subtitle="$locale('averageInAppActivitySubtitle')"
    title-tag="h2"
  >
    <div class="col gap-4">
      <nuxt-link
        v-for="(_, index) in Array(5)"
        :key="index"
        class="flex gap-2 items-center cursor-pointer"
        :to="createProjectLink('features-id', { id: index })"
      >
        <Avatar
          :label="`#${index + 1}`"
          shape="square"
          size="large"
          class="!text-lg !size-14"
        />

        <div class="col flex-1 mb-1">
          <span class="text-lg font-bold">Функция №{{ index + 1 }}</span>

          <span class="text-xs font-medium">{{
            $locale("ofTotalEvents", { expr: `${90 - index * 10}%` })
          }}</span>
        </div>

        <value-quantity
          :value="90 - index * 10"
          quantity="K"
          value-class="text-xl font-bold"
          quantity-class="text-lg font-medium text-secondary"
        />
      </nuxt-link>
    </div>
  </app-card>
</template>
