<template>
  <div class="relative w-screen h-screen flex center px-8 py-4">
    <app-logo class="absolute top-4 left-8 max-lg:hidden" />

    <div class="h-full flex items-center">
      <app-card class="max-sm:!contents min-w-[25vw]">
        <slot />
      </app-card>
    </div>
  </div>
</template>
