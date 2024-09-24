<template>
  <app-card
    title="Average in-app activity"
    subtitle="See how much time users spend on each screen"
  >
    <div class="flex flex-col gap-4">
      <div
        v-for="(_, index) in Array(5)"
        :key="index"
        class="flex gap-2 items-center"
      >
        <Avatar
          :label="`#${index + 1}`"
          shape="square"
          size="large"
          class="!text-lg !size-14"
        />

        <div class="flex flex-col flex-1 mb-1">
          <span class="text-lg font-bold">Screen #{{ index + 1 }}</span>

          <span class="text-xs font-medium"
            >{{ `${90 - index * 10}%` }} total time</span
          >
        </div>

        <div class="time">
          <span class="text-xl font-bold" v-text="90 - index * 10" />
          <span class="text-lg font-medium ms-1 text-surface-400">h</span>
        </div>
      </div>
    </div>
  </app-card>
</template>

<script setup lang="ts"></script>

<style scoped></style>
