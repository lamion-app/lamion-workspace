<template>
  <app-layout>
    <h1 class="text-5xl font-bold">
      {{ $locale("accessKey.createANewProjectAccessToken") }}
    </h1>

    <app-card class="mt-4">
      <Stepper v-model:value="step" linear>
        <StepList class="max-w-[600px]">
          <Step :value="1">{{ $locale("accessKey.generateToken") }}</Step>
          <Step :value="2">{{ $locale("accessKey.copyToken") }}</Step>
        </StepList>
        <StepPanels>
          <StepPanel :value="1" class="!bg-transparent">
            <div class="col">
              <h3 class="text-2xl font-medium">
                {{ $locale("accessKey.generateAccessToken") }}
              </h3>
              <span>{{ $locale("accessKey.mindTokenName") }}</span>

              <input-text
                class="mt-4 max-w-[350px]"
                :placeholder="$locale('accessKey.tokenName')"
              />

              <div class="mt-6 flex flex-wrap gap-2">
                <Button
                  severity="secondary"
                  :label="$locale('common.simple.cancel')"
                  @click="$router.go(-1)"
                />

                <Button
                  severity="primary"
                  :label="$locale('accessKey.generate')"
                  @click="step = 2"
                />
              </div>
            </div>
          </StepPanel>

          <StepPanel :value="2" class="!bg-transparent">
            <div class="col">
              <h3 class="text-2xl font-medium">
                {{ $locale("accessKey.newTokenReady") }}
              </h3>
              <span>{{ $locale("accessKey.tokenLoseMessage") }}</span>

              <app-card class="mt-4" container-class="items-center flex-row">
                <span>Kr63gkeru4A4fCnXamdoH2e7tb7sn8P2206c</span>

                <icon-button
                  icon="content_copy"
                  @click="copyTextToClipboard('SAMPLE TOKEN COPY')"
                />
              </app-card>

              <div class="mt-6">
                <Button
                  as="router-link"
                  severity="secondary"
                  :label="$locale('accessKey.goToApp')"
                  :to="createProjectLink('settings')"
                />
              </div>
            </div>
          </StepPanel>
        </StepPanels>
      </Stepper>
    </app-card>
  </app-layout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "main",
  keepalive: false,
});

useHead({
  title: "New access token",
});

const step = ref(1);

onMounted(() => {
  step.value = 1;
});
</script>

<style scoped></style>
