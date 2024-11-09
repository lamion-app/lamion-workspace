<template>
  <app-layout>
    <app-card>
      <div class="col gap-8">
        <div class="flex flex-wrap justify-between gap-2">
          <h1 class="text-4xl font-medium">{{ $locale('activityReport') }}</h1>

          <div class="actions flex flex-wrap items-center gap-2">
            <icon-button icon="&#xe5cb;" />

            <span class="font-medium text-xl">Август 2025</span>

            <icon-button icon="&#xe5cc;" />
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

    <Tabs class="mt-8" :value="viewMode.name">
      <TabPanels>
        <TabPanel :value="viewVariants[0].name">
          <list-details
            class="!max-h-screen"
            list-class="lg:max-w-[400px]"
            :items="listItems"
            :selected-item="selectedItem"
            @click:item="onItemSelected($event)"
          >
            <template #item="{ item }">
              <app-card class="cursor-pointer" no-gap>
                <span class="text-lg font-black"
                  >{{ 1 + item * 3 }} Августа</span
                >

                <activity-info
                  :show-crashes="item % 2 == 0"
                  :show-users="true"
                />
              </app-card>
            </template>

            <template #details="{ item }">
              <app-card class="!gap-6">
                <activity-date-details :item="item" />
              </app-card>
            </template>
          </list-details>
        </TabPanel>

        <TabPanel :value="viewVariants[1].name">
          <app-card class="!py-2 max-lg:!contents">
            <div class="-mx-5 overflow-x-auto">
              <calendar-layout class="min-w-[1000px]" grid>
                <template #default="{ index }">
                  <div
                    :class="{
                      'opacity-50': index < 3,
                    }"
                    class="size-full aspect-square px-4 py-2 col items-center gap-2 cursor-pointer"
                    @click="
                      navigateTo(
                        createProjectLink('activity-date', {
                          date: index,
                        })
                      )
                    "
                  >
                    <div
                      class="px-4 text-2xl font-medium"
                      v-text="index < 3 ? 29 + index : index - 2"
                    />

                    <activity-info
                      :show-crashes="index % 12 === 0 && index > 0"
                      :show-users="index % 4 === 0"
                    />
                  </div>
                </template>
              </calendar-layout>
            </div>
          </app-card>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </app-layout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "main",
});

useHead({
  title: "Activity report",
});

const viewport = useViewport();

const viewVariants = [
  {
    name: "list",
    icon: "format_list_bulleted",
  },
  {
    name: "calendar",
    icon: "calendar_month",
  },
];

const viewMode = ref(viewVariants[0]);

const listItems = [...Array(10).keys()];
const selectedItem = ref(0);

function onItemSelected(item: number) {
  if (viewport.isLessThan("lg")) {
    navigateTo(
      createProjectLink("activity-date", {
        date: item,
      })
    );
  } else {
    selectedItem.value = item;
  }
}
</script>
