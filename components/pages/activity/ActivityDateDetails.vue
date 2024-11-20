<script setup lang="ts">
import type { ActivityDetails } from "~/components-types/pages/Activity";

const props = defineProps<{
  date: Date;
}>();

const { useProjectLoad } = useProjects();

const { data, isLoading } = useProjectLoad(
  (id, date) => useApiCall<ActivityDetails>(`/project/${id}/activity/${date}`),
  computed(() => formatDateISO(props.date)),
);

const userActivityItems = computed(() =>
  mapTimeChartDto(data.value?.user_activity_time),
);
</script>

<template>
  <div class="col gap-6">
    <h2 class="text-4xl font-bold capitalize-start">{{ $d(date, "long") }}</h2>

    <template v-if="isLoading || !data">
      <progress-spinner />
    </template>

    <template v-else>
      <div class="flex flex-wrap gap-2">
        <app-card
          class="min-w-[200px] flex-1 bg-window"
          :title="$locale('activity.details.activeUsers')"
          title-class="text-sm font-medium text-secondary"
        >
          <value-quantity
            class="text-6xl"
            :value="data.active_users"
            quantity-class="text-secondary"
          />
        </app-card>

        <app-card
          class="min-w-[250px] flex-1 bg-window"
          :title="$locale('activity.details.triggeredEvents')"
          title-class="text-sm font-medium text-secondary"
        >
          <value-quantity
            class="text-6xl"
            :value="data.total_events"
            quantity-class="text-secondary"
          />
        </app-card>

        <app-card
          class="min-w-[100px] flex-1 bg-window"
          :title="$locale('activity.details.crashesCount')"
          title-class="text-sm font-medium text-secondary"
        >
          <value-quantity
            class="text-6xl"
            :value="data.crashes"
            quantity-class="text-secondary"
          />
        </app-card>
      </div>

      <app-card
        :title="$locale('activity.details.mostUsedFeatures')"
        title-class="text-sm font-medium text-secondary"
      >
        <div class="items col gap-2">
          <template
            v-for="(feature, index) in data.top_features"
            :key="feature.id"
          >
            <div class="flex gap-2 justify-between items-center">
              <div>
                <span class="font-bold line-clamp-1" :title="feature.title"
                  >{{ feature.title }}n</span
                >

                <div class="flex items-center gap-1 text-sm text-secondary">
                  <span>{{ $locale("activity.details.totalEvents") }}</span>

                  <value-quantity
                    class="font-black"
                    :value="feature.total_events"
                  />
                </div>
              </div>

              <value-quantity
                class="text-xs font-black"
                :value="feature.total_events_percent.toFixed(1)"
                custom-quantity="%"
              />
            </div>

            <divider
              v-if="index < data.top_features.length - 1"
              class="!my-0"
            />
          </template>
        </div>
      </app-card>

      <app-card
        class="!overflow-x-auto"
        :title="$locale('activity.details.inAppActivity')"
      >
        <user-activity-time
          class="!h-[400px] -mx-3"
          :items="userActivityItems"
        />
      </app-card>
    </template>
  </div>
</template>
