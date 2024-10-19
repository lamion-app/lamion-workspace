<template>
  <app-layout>
    <app-card>
      <div class="flex flex-col gap-8">
        <div class="flex flex-wrap justify-between gap-2">
          <h1 class="text-4xl font-medium">Activity report</h1>

          <div class="actions flex flex-wrap items-center gap-2">
            <icon-button icon="&#xe5cb;" />

            <span class="font-medium text-xl">October 2025</span>

            <icon-button icon="&#xe5cc;" />
          </div>
        </div>

        <select-button
          v-model="viewMode"
          :options="viewVariants"
          option-label="name"
        >
          <template #option="slotData">
            <span class="material-symbols-outlined">
              {{ slotData.option.icon }}
            </span>
          </template>
        </select-button>
      </div>
    </app-card>

    <Tabs class="mt-8" :value="viewMode.name">
      <TabPanels>
        <TabPanel :value="viewVariants[0].name">
          <app-card class="!px-0 !py-2">
            <calendar-layout grid>
              <template #default="{ index }">
                <div
                  :class="{
                    'opacity-50': index < 3,
                  }"
                  class="size-full aspect-square px-4 py-2 flex flex-col items-center gap-2 cursor-pointer"
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
          </app-card>
        </TabPanel>

        <TabPanel :value="viewVariants[1].name">
          <list-details
            list-class="lg:max-w-[400px]"
            :items="listItems"
            :selected-item="selectedItem"
            @click:item="onItemSelected($event)"
          >
            <template #item="{ item }">
              <app-card class="!gap-0 cursor-pointer">
                <span class="text-lg font-black"
                  >{{ 1 + item * 3 }} August</span
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
      </TabPanels>
    </Tabs>
  </app-layout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "main",
});

const viewport = useViewport();

const viewVariants = [
  {
    name: "calendar",
    icon: String.fromCodePoint(0xebcc),
  },
  {
    name: "list",
    icon: String.fromCodePoint(0xe241),
  },
];

const viewMode = ref(viewVariants[1]);

const listItems = [...Array(10).keys()];
const selectedItem = ref(0);

function onItemSelected(item: number) {
  if (viewport.isLessThan("lg")) {
    navigateTo({
      name: "activity-date",
      params: {
        date: item,
      },
    });
  } else {
    selectedItem.value = item;
  }
}
</script>
