<template>
  <app-layout>
    <h1 class="text-5xl font-bold">
      {{ $locale("accessKey.createANewProjectAccessToken") }}
    </h1>

    <app-card class="mt-4">
      <Stepper v-model:value="step" linear>
        <StepList class="max-w-[600px]">
          <Step :value="steps.create.stepNum"
            >{{ $locale("accessKey.generateToken") }}
          </Step>
          <Step :value="steps.result.stepNum"
            >{{ $locale("accessKey.copyToken") }}
          </Step>
        </StepList>
        <StepPanels>
          <StepPanel :value="steps.create.stepNum" class="!bg-transparent">
            <div class="col">
              <h3 class="text-2xl font-medium">
                {{ $locale("accessKey.generateAccessToken") }}
              </h3>
              <span>{{ $locale("accessKey.mindTokenName") }}</span>

              <input-text
                v-model="steps.create.title"
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
                  @click="steps.create.createToken()"
                />
              </div>
            </div>
          </StepPanel>

          <StepPanel :value="steps.result.stepNum" class="!bg-transparent">
            <div class="col">
              <h3 class="text-2xl font-medium">
                {{ $locale("accessKey.newTokenReady") }}
              </h3>
              <span>{{ $locale("accessKey.tokenLoseMessage") }}</span>

              <app-card class="mt-4" container-class="items-center flex-row">
                <span>{{ steps.result.token }}</span>

                <icon-button
                  icon="content_copy"
                  @click="copyTextToClipboard(steps.result.token)"
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
  title: "accessKey.title",
  keepalive: false,
  auth: true,
});

const { handleErrorBlock } = useErrorHandler();
const { selectedProjectId } = useProjects();

const initStep = 1;
const step = ref(initStep);

const steps = reactive({
  create: {
    stepNum: initStep,
    title: ref(""),
    createToken: () => {
      handleErrorBlock(async () => {
        const response = await useApiCall<{ value: string }>(
          `/project/${selectedProjectId.value}/access/key`,
          {
            method: "POST",
            body: {
              title: steps.create.title,
            },
          },
        );

        steps.result.token = response.value;

        step.value = steps.result.stepNum;
      });
    },
  },
  result: {
    stepNum: 2,
    token: ref(""),
  },
});

onMounted(() => {
  step.value = initStep;
});
</script>

<style scoped></style>
