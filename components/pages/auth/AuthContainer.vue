<template>
  <div class="relative w-screen h-screen flex center px-8 py-4">
    <app-logo class="absolute top-4 left-8 max-lg:hidden" />

    <div class="h-full flex items-center">
      <div class="min-w-[25vw]">
        <slot />
      </div>
    </div>
  </div>
</template>
