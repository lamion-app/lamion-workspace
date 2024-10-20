<template>
  <app-layout>
    <div class="max-w-[1000px] col gap-4">
      <h1 class="text-6xl">Authorization</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
        dignissim, eros et consectetur pharetra, risus quam interdum lectus, vel
        pellentesque leo neque at quam. Maecenas maximus ultricies eleifend.
        Nullam porttitor, lacus sed aliquam interdum, mauris turpis placerat
        purus, vulputate pellentesque ex turpis vitae odio. Curabitur pulvinar,
        mi sit amet condimentum vehicula, ipsum tortor dignissim ligula, at
        faucibus dolor eros in leo.
      </p>

      <div class="w-full flex flex-wrap gap-2">
        <div
          v-for="(_, i) in Array(10)"
          :key="i"
          class="relative rounded overflow-hidden"
        >
          <span class="relative px-2 z-10">{{ "Tag name #" + i }}</span>

          <div
            class="absolute top-0 left-0 size-full opacity-50"
            :style="{
              'background-color': ['red', 'blue', 'green', 'yellow', 'silver'][
                i % 5
              ],
            }"
          />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <app-card title="Total events" class="mt-4">
          <active-users-chart class="flex-1 -mx-5" />

          <text-up-down-indicator
            class="mt-2"
            icon="&#xe7fd;"
            :value="34"
            quantity="%"
            label="from last month"
          />
        </app-card>

        <!-- TODO: make red -->
        <app-card title="Crash rate" class="mt-4">
          <active-users-chart class="flex-1 -mx-5" />

          <text-up-down-indicator
            class="mt-2"
            icon="&#xe7fd;"
            :value="34"
            quantity="%"
            label="from last month"
          />
        </app-card>
      </div>

      <app-card title="Functions" title-class="text-xl font-medium">
        <div class="filters flex flex-wrap justify-between gap-2">
          <IconField>
            <InputIcon>
              <span class="text-lg material-symbols-outlined">&#xe8b6;</span>
            </InputIcon>

            <InputText class="w-full lg:w-[350px]" placeholder="Search" />
          </IconField>

          <Button
            severity="secondary"
            rounded
            @click="functionsSortOp.toggle($event)"
          >
            <span>Sort by</span>
            <m-icon value="sort" class="text-lg" />
          </Button>

          <Popover ref="functionsSortOp">
            <div class="col">
              <button
                v-for="item in ['Events count', 'Date added']"
                :key="item"
                class="rounded px-4 py-2 text-start"
                :class="{
                  'bg-surface-800': item == 'Requests',
                }"
              >
                <span>{{ item }}</span>
              </button>
            </div>
          </Popover>
        </div>

        <div class="items col gap-2">
          <app-card
            v-for="index in Array(10).keys()"
            :key="index"
            container-class="!flex-row items-center"
          >
            <div class="page-content flex-1">
              <span class="text-lg font-medium">Function name</span>

              <div class="text-sm font-thin">
                <span>Total events: </span>
                <value-quantity
                  value="20"
                  quantity="K"
                  quantity-class="text-secondary"
                />
              </div>
            </div>

            <div class="actions">
              <icon-button icon="&#xe16f;" severity="danger" />
            </div>
          </app-card>
        </div>
      </app-card>
    </div>
  </app-layout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "main",
});

const functionsSortOp = ref();
</script>

<style scoped lang="scss">
.function {
  .actions {
    @apply opacity-0 transition;
  }

  &:hover {
    .actions {
      @apply opacity-100;
    }
  }
}
</style>
