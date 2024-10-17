<template>
  <app-card
    title="Functions"
    title-class="text-lg font-medium"
    class="!gap-2"
    :loading="isLoading"
  >
    <DataTable :value="content">
      <template #header>
        <div class="w-full flex flex-wrap gap-2 justify-between">
          <IconField>
            <InputIcon>
              <span class="text-lg material-symbols-outlined">&#xe8b6;</span>
            </InputIcon>

            <InputText
              v-model="filters.search"
              :disabled="isLoading"
              class="lg:w-[350px]"
              placeholder="Search"
            />
          </IconField>
        </div>
      </template>

      <template v-if="!isLoading" #empty>
        <span>No functions found.</span>
      </template>

      <Column>
        <template #header>
          <div class="header">
            <span class="font-medium">Activity</span>
          </div>
        </template>

        <template #body="slotProps">
          <div>
            <value-quantity
              class="font-black"
              value-class="text-3xl"
              quantity-class="text-2xl text-secondary"
              :value="slotProps.data.activityNumber"
              :quantity="slotProps.data.activityQuantity"
            />
          </div>
        </template>
      </Column>

      <Column>
        <template #header>
          <div class="header action" @click="namePopover.toggle($event)">
            <span class="font-medium">Name</span>

            <span class="material-symbols-outlined text-lg">&#xef4f;</span>

            <popover ref="namePopover">
              <div class="filter-popover">
                <IconField>
                  <InputIcon>
                    <span class="text-lg material-symbols-outlined"
                      >&#xe8b6;</span
                    >
                  </InputIcon>

                  <InputText
                    v-model="filters.name"
                    :disabled="isLoading"
                    placeholder="Search by name"
                  />
                </IconField>

                <div class="actions">
                  <Button
                    type="button"
                    label="Clear"
                    size="small"
                    severity="secondary"
                    @click="filters.name = ''"
                  />
                </div>
              </div>
            </popover>
          </div>
        </template>

        <template #body="slotProps">
          <span>{{ slotProps.data.name }}</span>
        </template>
      </Column>

      <Column>
        <template #header>
          <div class="header action" @click="featurePopover.toggle($event)">
            <span class="font-medium">Feature</span>

            <span class="material-symbols-outlined text-lg">&#xef4f;</span>

            <popover ref="featurePopover">
              <div class="filter-popover">
                <MultiSelect
                  v-model="filters.feature"
                  :options="features"
                  option-label="name"
                  placeholder="Any"
                />

                <div class="actions">
                  <Button
                    type="button"
                    label="Clear"
                    size="small"
                    severity="secondary"
                    @click="filters.feature = null"
                  />
                </div>
              </div>
            </popover>
          </div>
        </template>

        <template #body="slotProps">
          <span>{{ slotProps.data.feature.name }}</span>
        </template>
      </Column>

      <Column>
        <template #header>
          <div class="header action" @click="screenPopover.toggle($event)">
            <span class="font-medium">Screen</span>

            <span class="material-symbols-outlined text-lg">&#xef4f;</span>

            <popover ref="screenPopover">
              <div class="filter-popover">
                <MultiSelect
                  v-model="filters.screen"
                  :options="screens"
                  option-label="name"
                  placeholder="Any"
                />

                <div class="actions">
                  <Button
                    type="button"
                    label="Clear"
                    size="small"
                    severity="secondary"
                    @click="filters.screen = null"
                  />
                </div>
              </div>
            </popover>
          </div>
        </template>

        <template #body="slotProps">
          <span>{{ slotProps.data.screen.name }}</span>
        </template>
      </Column>

      <Column class="w-[15%]">
        <template #header>
          <div class="header action" @click="tagsPopover.toggle($event)">
            <span class="font-medium">Tags</span>

            <span class="material-symbols-outlined text-lg">&#xef4f;</span>

            <popover ref="tagsPopover">
              <div class="filter-popover">
                <MultiSelect
                  v-model="filters.tags"
                  :options="tags"
                  option-label="name"
                  placeholder="Any"
                />

                <div class="actions">
                  <Button
                    type="button"
                    label="Clear"
                    size="small"
                    severity="secondary"
                    @click="filters.tags = null"
                  />
                </div>
              </div>
            </popover>
          </div>
        </template>

        <template #body="slotProps">
          <div class="flex flex-wrap gap-2">
            <div
              v-for="tag in slotProps.data.tags"
              :key="tag"
              class="relative rounded overflow-hidden"
            >
              <span class="relative px-2 z-10">{{ tag.name }}</span>

              <div
                class="absolute top-0 left-0 size-full opacity-50"
                :style="{ 'background-color': tag.color ?? 'silver' }"
              />
            </div>
          </div>
        </template>
      </Column>
    </DataTable>

    <!-- TODO: add progress bar -->
  </app-card>
</template>

<script setup lang="ts">
const isLoading = ref(false);
const content = ref<Array<FunctionItem>>([]);
const features = ref<Array<FeatureFilter>>([]);
const screens = ref<Array<ScreenFilter>>([]);
const tags = ref<Array<FunctionTag>>([]);

const filters = reactive({
  search: "",
  name: "",
  feature: null,
  screen: null,
  tags: null,
});

const namePopover = ref();
const featurePopover = ref();
const screenPopover = ref();
const tagsPopover = ref();

watch(filters, loadDataAfterTimeout);
onMounted(loadTableData);

let loadTimer: ReturnType<typeof setTimeout> | undefined;

function loadDataAfterTimeout() {
  if (loadTimer !== undefined) {
    clearTimeout(loadTimer);
  }

  loadTimer = setTimeout(loadData, 800);
}

function loadTableData() {
  features.value = [
    { name: "Authorization" },
    { name: "Post" },
    { name: "Home" },
  ];

  screens.value = [
    { name: "Sign in" },
    { name: "Post details" },
    { name: "Home" },
  ];

  tags.value = [
    { name: "UI", color: "blue" },
    { name: "NETWORK", color: "green" },
    { name: "NAVIGATION", color: "magenta" },
    { name: "EXTRA" },
  ];

  loadData();
}

function loadData() {
  if (isLoading.value) return;

  isLoading.value = true;
  setTimeout(() => {
    content.value = [
      {
        name: "Login click",
        totalActivityNumber: 10000,
        activityNumber: 10,
        activityQuantity: "K",
        feature: { name: "Authorization" },
        screen: { name: "Sign in" },
        tags: [{ name: "UI", color: "blue" }],
      },
      {
        name: "Login failed",
        totalActivityNumber: 400,
        activityNumber: 0.4,
        activityQuantity: "K",
        feature: { name: "Authorization" },
        screen: { name: "Sign in" },
        tags: [
          { name: "UI", color: "blue" },
          { name: "NETWORK", color: "green" },
        ],
      },
      {
        name: "Open post details",
        totalActivityNumber: 20000,
        activityNumber: 20,
        activityQuantity: "K",
        feature: { name: "Post" },
        screen: { name: "Home" },
        tags: [
          { name: "UI", color: "blue" },
          { name: "NAVIGATION", color: "magenta" },
        ],
      },
      {
        name: "Like post",
        totalActivityNumber: 120000,
        activityNumber: 120,
        activityQuantity: "K",
        feature: { name: "Post" },
        screen: { name: "Home" },
        tags: [
          { name: "UI", color: "blue" },
          { name: "NETWORK", color: "green" },
        ],
      },
      {
        name: "Load more posts",
        totalActivityNumber: 78000,
        activityNumber: 78,
        activityQuantity: "K",
        feature: { name: "Home" },
        screen: { name: "Home" },
        tags: [{ name: "NETWORK", color: "green" }],
      },
      {
        name: "See post comments",
        totalActivityNumber: 8000,
        activityNumber: 8,
        activityQuantity: "K",
        feature: { name: "Post" },
        screen: { name: "Post details" },
        tags: [
          { name: "UI", color: "blue" },
          { name: "NETWORK", color: "green" },
          { name: "EXTRA" },
        ],
      },
      {
        name: "Open post author",
        totalActivityNumber: 2000,
        activityNumber: 2,
        activityQuantity: "K",
        feature: { name: "Post" },
        screen: { name: "Post details" },
        tags: [
          { name: "UI", color: "blue" },
          { name: "NETWORK", color: "green" },
          { name: "NAVIGATION", color: "magenta" },
        ],
      },
    ];

    isLoading.value = false;
  }, 1500);
}
</script>

<style scoped lang="scss">
.header {
  @apply size-full flex items-center gap-2;

  &.action {
    @apply cursor-pointer;
  }
}

.filter-popover {
  min-width: 200px;
  @apply flex flex-col gap-2;

  .actions {
    @apply flex flex-wrap justify-between gap-2;
  }
}
</style>
