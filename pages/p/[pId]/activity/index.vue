<script setup lang="ts">
definePageMeta({
  layout: "main",
  title: "activity.title",
  auth: true,
});

const viewport = useViewport();
const { useProjectLoadAlias } = useProjects();

const viewVariants = [
  {
    name: "calendar",
    icon: "calendar_month",
  },
  {
    name: "list",
    icon: "format_list_bulleted",
  },
];
const viewMode = ref(viewVariants[0]);

const selectedMonth = ref(startOfMonth(new Date()));

const { isLoading, data } = useProjectLoadAlias(
  (id, month) => {
    return useApiCall<ActivityFull>(`/project/${id}/activity/full`, {
      query: {
        date: formatDateISO(month),
      },
    });
  },
  [selectedMonth],
);

const calendarItems = computed(() => mapCalendarItems(data.value?.calendar));
const selectedItem = ref<CalendarItem>();

const dateRange = computed(() => {
  const inputDate = selectedMonth.value;

  const startDate = startOfMonth(inputDate);

  const endDate = new Date(inputDate);
  endDate.setMonth(endDate.getMonth() + 1);
  endDate.setDate(0);

  return {
    startDate: startDate,
    endDate: endDate,
  };
});

watch(calendarItems, (items) => {
  selectedItem.value = items[0];
});

const findCalendarItemByDate = computed(() => (date: Date) => {
  return calendarItems.value.find((x) => isSameDate(x.date, date));
});

function onItemSelected(item?: CalendarItem) {
  if (viewport.isLessThan("lg") && !!item) {
    navigateTo(
      createProjectLink("activity-date", {
        date: formatDateISO(item.date),
      }),
    );
  } else {
    selectedItem.value = item;
  }
}

function takeDate(index: number) {
  const date = new Date(selectedMonth.value);

  date.setMonth(date.getMonth() + index);

  selectedMonth.value = date;
}

function startOfMonth(date: Date) {
  const newDate = new Date(date);
  newDate.setDate(1);
  newDate.setHours(0);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);
  return newDate;
}
</script>

<template>
  <app-layout :is-loading="isLoading">
    <app-card>
      <div class="col gap-8">
        <div class="flex flex-wrap justify-between gap-2">
          <h1 class="text-4xl font-medium">
            {{ $locale("activity.title") }}
          </h1>

          <div class="actions flex flex-wrap items-center gap-2">
            <icon-button icon="&#xe5cb;" @click="takeDate(-1)" />

            <i18n-d
              class="w-[130px] text-center capitalize-start"
              tag="span"
              :value="selectedMonth"
              :format="{ year: 'numeric', month: 'long' }"
            />

            <icon-button icon="&#xe5cc;" @click="takeDate(1)" />
          </div>
        </div>

        <select-button
          v-model="viewMode"
          :options="viewVariants"
          option-label="name"
        >
          <template #option="slotData">
            <m-icon :value="slotData.option.icon" />
          </template>
        </select-button>
      </div>
    </app-card>

    <Tabs v-if="!!data" class="mt-8" :value="viewMode.name">
      <TabPanels>
        <TabPanel :value="viewVariants[0].name">
          <list-details
            list-class="lg:max-w-[400px]"
            :items="calendarItems"
            :selected-item="selectedItem"
            @click:item="onItemSelected($event)"
          >
            <template #item="{ item, index }">
              <app-card
                class="cursor-pointer border-2 border-transparent focus-within:border-primary"
                :tabindex="index"
                no-gap
              >
                <span class="text-lg font-black">{{
                  $d(item.date, "short")
                }}</span>

                <activity-info :item="item" />
              </app-card>
            </template>

            <template #details="{ item }">
              <app-card class="!gap-6">
                <activity-date-details :date="item.date" />
              </app-card>
            </template>

            <template #empty>
              <app-card class="w-full">
                <h1 class="text-center text-xl">
                  {{ $locale("activity.noActivityFound") }}
                </h1>
              </app-card>
            </template>
          </list-details>
        </TabPanel>

        <TabPanel :value="viewVariants[1].name">
          <app-card class="!py-2 max-lg:!contents">
            <div class="-mx-5 -mt-4 -mb-2 overflow-x-auto">
              <calendar-layout
                class="min-w-[1500px]"
                grid
                :start-date="dateRange.startDate"
                :end-date="dateRange.endDate"
              >
                <template #default="{ date, inRange }">
                  <nuxt-link
                    :class="{
                      'opacity-50': !inRange,
                    }"
                    class="size-full aspect-square px-4 py-2 col items-center gap-2 cursor-pointer"
                    :to="
                      createProjectLink('activity-date', {
                        date: formatDateISO(date),
                      })
                    "
                  >
                    <div
                      class="px-4 text-2xl font-medium"
                      v-text="date.getDate()"
                    />

                    <activity-info
                      v-if="findCalendarItemByDate(date)"
                      :item="findCalendarItemByDate(date)!"
                    />
                  </nuxt-link>
                </template>
              </calendar-layout>
            </div>
          </app-card>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </app-layout>
</template>
