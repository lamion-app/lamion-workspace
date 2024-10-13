<template>
  <radar-chart :items="data" name="devices" />
</template>

<script setup lang="ts">
const data = [
  {
    name: "Android",
    number: 65,
  },
  {
    name: "IOS",
    number: 59,
  },
  {
    name: "WEB/Deskto",
    number: 90,
  },
  {
    name: "WEB/Mobile",
    number: 81,
  },
  {
    name: "Desktop",
    number: 56,
  },
];
</script>

<style scoped></style>
