<script setup lang="ts">
definePageMeta({
  layout: "main",
  title: () => {
    const route = useRoute();
    const { $i18n } = useNuxtApp();
    const t = $i18n.t;
    const d = $i18n.d;

    const date = parseISODateString(route.params.date.toString());

    return t("activity.details.activityPeriod", {
      expr: d(date, {
        day: "numeric",
        year: "numeric",
        month: "long",
      }),
    });
  },
  validate: async (route) => {
    // Check if the id is made up of digits
    return (
      typeof route.params.date === "string" &&
      !isNaN(Date.parse(route.params.date))
    );
  },
});
</script>

<template>
  <app-layout>
    <div class="mx-auto max-w-6xl">
      <Button
        class="max-lg:!hidden w-fit"
        rounded
        text
        plain
        @click="$router.go(-1)"
      >
        <m-icon value="arrow_back" />

        <span>{{ $locale("common.simple.back") }}</span>
      </Button>

      <app-card class="mt-6 max-lg:!contents">
        <activity-date-details
          :date="parseISODateString($route.params.date.toString())"
        />
      </app-card>
    </div>
  </app-layout>
</template>
