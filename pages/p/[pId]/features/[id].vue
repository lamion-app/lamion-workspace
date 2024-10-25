<template>
  <app-layout>
    <div class="max-w-[1000px] mx-auto col gap-4">
      <div class="w-full flex items-center justify-between">
        <Button
          class="max-lg:!hidden w-fit"
          rounded
          text
          plain
          @click="$router.go(-1)"
        >
          <m-icon value="arrow_back" />

          <span>Back</span>
        </Button>

        <client-only>
          <component
            :is="$viewport.isLessThan('lg') ? Teleport : 'div'"
            to="#header-actions"
          >
            <div class="flex gap-2 rounded-full px-2 py-1 lg:bg-surface-800">
              <icon-button icon="edit" @click="showEditDialog = true" />
              <icon-button
                icon="delete"
                severity="danger"
                @click="confirmDelete()"
              />
            </div>
          </component>
        </client-only>
      </div>

      <h1 class="text-6xl line-clamp-1">Authorization</h1>

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

      <div class="lg:grid lg:grid-cols-2 gap-4">
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
              <icon-button
                icon="link_off"
                severity="danger"
                @click="confirmDetachFunction($event)"
              />
            </div>
          </app-card>
        </div>
      </app-card>
    </div>

    <confirm-dialog group="dialog" />
    <confirm-popup group="prompt" />

    <edit-feature-dialog v-model:visible="showEditDialog" />
  </app-layout>
</template>

<script setup lang="ts">
import { Teleport } from "vue";

definePageMeta({
  layout: "main",
});

const route = useRoute();
const confirm = useConfirm();
const toast = useToast();

const showEditDialog = ref(false);

const title = computed(() => `Feature #${route.params.id}`);

useHead({
  titleTemplate: title,
});

const functionsSortOp = ref();

const confirmDelete = () => {
  confirm.require({
    group: "dialog",
    message: "Do you want to delete feature? This action cannot be undone.",
    header: "Danger Zone",
    rejectProps: {
      label: "Cancel",
      severity: "secondary",
    },
    acceptProps: {
      label: "Delete",
      severity: "danger",
    },
    accept: () => {
      toast.add({
        severity: "info",
        summary: "Confirmed",
        detail: "Record deleted",
        life: 3000,
      });

      navigateTo(createProjectLink());
    },
    reject: () => {
      toast.add({
        severity: "error",
        summary: "Rejected",
        detail: "You have rejected",
        life: 3000,
      });
    },
  });
};

const confirmDetachFunction = (event: MouseEvent) => {
  confirm.require({
    group: "prompt",
    target: event.currentTarget as HTMLElement,
    message: "Are you sure you want to detach function?",
    rejectProps: {
      label: "Cancel",
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: "Detach",
      severity: "danger",
    },
    accept: async () => {
      toast.add({
        severity: "info",
        summary: "Confirmed",
        detail: "You have accepted",
        life: 3000,
      });
    },
  });
};
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
