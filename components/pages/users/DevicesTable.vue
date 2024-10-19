<template>
  <!-- TODO: add deferred -->
  <DataTable :value="data">
    <Column field="name" header="Name" />

    <Column header="Platform">
      <template #body="slotProps">
        <div class="flex items-center gap-2">
          <m-icon :value="slotProps.data.platform.icon" />

          <span v-text="slotProps.data.platform.name" />
        </div>
      </template>
    </Column>

    <Column header="Activity">
      <template #body="slotProps">
        <div class="flex items-center gap-2">
          <value-quantity
            value-class="text-3xl"
            quantity-class="text-2xl text-secondary"
            :value="slotProps.data.activityNumber"
            :quantity="slotProps.data.activityQuantity"
          />

          <up-down-indicator
            v-if="
              !!slotProps.data.activityIncrease &&
              slotProps.data.activityIncrease !== 0
            "
            :value="slotProps.data.activityIncrease"
            :quantity="slotProps.data.activityIncreaseQuantity"
          />
        </div>
      </template>
    </Column>

    <Column header="Errors">
      <template #body="slotProps">
        <div>
          <value-quantity
            :class="{
              'text-red-500': slotProps.data.errorNumber >= 5,
              'font-black': slotProps.data.errorNumber >= 5,
            }"
            value-class="text-3xl"
            quantity-class="text-2xl text-secondary"
            :value="slotProps.data.errorNumber"
            :quantity="slotProps.data.errorQuantity"
          />
        </div>
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
interface DevicePlatform {
  icon: string;
  iconUrl?: boolean;
  name: string;
}

interface Device {
  name: string;
  platform: DevicePlatform;
  activityNumber: number;
  activityQuantity?: string;
  activityIncrease?: number;
  activityIncreaseQuantity?: string;
  errorNumber: number;
  errorQuantity?: string;
}

const platforms = {
  android: {
    icon: String.fromCharCode(0xe859),
    name: "Android",
  },
  ios: {
    icon: String.fromCharCode(0xe027),
    name: "Android",
  },
  browserMobile: {
    icon: String.fromCharCode(0xe64c),
    name: "Browser/Mobile",
  },
  browserDesktop: {
    icon: String.fromCharCode(0xe64c),
    name: "Browser/Desktop",
  },
  desktop: {
    icon: String.fromCharCode(0xe30a),
    name: "Desktop",
  },
};

const data: Array<Device> = [
  {
    name: "Chrome 129.0.6668.100",
    platform: platforms.browserDesktop,
    activityNumber: 100,
    activityQuantity: "K",
    activityIncrease: 5,
    activityIncreaseQuantity: "%",
    errorNumber: 5,
  },
  {
    name: "Xiaomi 15+ pro ultra",
    platform: platforms.android,
    activityNumber: 35,
    activityQuantity: "K",
    activityIncrease: 14,
    activityIncreaseQuantity: "%",
    errorNumber: 2,
  },
  {
    name: "Iphone 15+",
    platform: platforms.ios,
    activityNumber: 36,
    activityQuantity: "K",
    activityIncrease: -3,
    activityIncreaseQuantity: "%",
    errorNumber: 30,
  },
  {
    name: "Firefox mobile",
    platform: platforms.browserMobile,
    activityNumber: 1,
    activityQuantity: "K",
    activityIncrease: 0,
    errorNumber: 3,
  },
];
</script>

<style lang="scss" scoped></style>
