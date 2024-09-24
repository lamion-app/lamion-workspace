<template>
  <div class="dashboard">
    <div class="container vertical container-start">
      <in-app-activity-card id="app-activity" class="dashboard-activity-card" />

      <devices-card id="top-devices" class="dashboard-activity-card" />
    </div>

    <div class="container vertical">
      <features-card id="features" class="dashboard-activity-card" />

      <div class="container">
        <activity-report-card
          id="activity-report"
          class="dashboard-activity-card"
        />

        <user-activity-time
          id="activity_time"
          class="dashboard-activity-card"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dashboard {
  @apply flex;
  @apply gap-4;

  .container {
    @apply flex items-start;
    gap: inherit;

    &.vertical {
      @apply flex-col;
    }
  }

  .container-start {
    width: 35%;
  }

  .dashboard-activity-card {
    @apply w-full;
  }

  #features {
    height: 620px;
  }

  #top-devices {
    //flex-basis: 70%;
  }
}
</style>
