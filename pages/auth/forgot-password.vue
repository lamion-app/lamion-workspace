<template>
  <div class="h-screen col center gap-4">
    <h1 class="text-4xl font-black">{{ $locale('notAvailableYet') }}</h1>
    <span class="text-sm text-secondary"
      >{{ $locale('thisFeatureIsStillInDevelopment') }}</span
    >

    <Button text rounded @click="$router.go(-1)">{{ $locale('back') }}</Button>
  </div>
</template>
