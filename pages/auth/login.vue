<template>
  <auth-container>
    <app-card class="md:min-w-[550px] max-sm:!contents" :loading="isLoading">
      <form class="form col gap-2" @submit.prevent="onSubmit">
        <h1 class="text-5xl font-black max-xl:text-center">
          {{ $locale("auth.signIn.title") }}
        </h1>

        <span class="text-lg text-secondary max-xl:text-center">{{
          $locale("auth.signIn.subtitle")
        }}</span>

        <input-validated
          v-model="email"
          :show-error="showErrors"
          :error="errors.email"
          :props="emailAttrs"
          class="mt-6"
          :placeholder="$locale('auth.email')"
          icon="mail"
        />

        <input-validated
          v-model="password"
          :show-error="showErrors"
          :error="errors.password"
          :props="passwordAttrs"
          password
          :placeholder="$locale('auth.password')"
          icon="lock"
        />

        <div class="w-full flex justify-end">
          <nuxt-link
            class="text-sm text-primary text-end"
            to="/auth/forgot-password"
            >{{ $locale("auth.signIn.forgotPassword") }}
          </nuxt-link>
        </div>

        <span
          v-if="showErrors && !isLoading && isInvalidCredentialsErrorVisible"
          class="text-lg text-red-500 text-center whitespace-pre-line"
        >
          {{ $locale("auth.signIn.credentialsError") }}
        </span>

        <Button rounded class="mt-6" type="submit" :disabled="isLoading"
          >{{ $locale("auth.signIn.action") }}
        </Button>

        <div class="sm:contents flex flex-wrap gap-2">
          <Button
            class="flex-1"
            rounded
            severity="secondary"
            @click="signIn.githubOauth()"
          >
            <img
              class="size-8 object-cover dark:invert"
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              alt="GitHub"
            />

            <span class="max-sm:hidden">{{
              $locale("auth.oauth.continueWithGithub")
            }}</span>
          </Button>
        </div>

        <span class="mt-4 text-sm text-secondary text-end">
          <span>{{ $locale("auth.signIn.notRegisteredYet") }} </span>

          <nuxt-link class="ms-1 text-primary" to="/auth/registration">{{
            $locale("auth.signIn.registerNow")
          }}</nuxt-link>
        </span>
      </form>
    </app-card>
  </auth-container>
</template>

<script setup lang="ts">
import * as yup from "yup";
import { useForm } from "vee-validate";

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});

useHead({
  title: "Login",
});

const { signIn } = useAppAuth();

const validationSchema = yup.object({
  email: yup.string().email().min(4).required(),
  password: yup.string().min(8).required().trim(),
});

const { defineField, values, errors } = useForm({
  validationSchema: validationSchema,
});

const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");

const showErrors = ref(false);
const isLoading = ref(false);
const isInvalidCredentialsErrorVisible = ref(false);

async function onSubmit() {
  // Show errors only after first submit
  showErrors.value = true;

  if (
    !(
      !!email.value &&
      !!password.value &&
      !errors.value["email"] &&
      !errors.value["password"]
    )
  ) {
    return;
  }

  isLoading.value = true;

  try {
    await signIn.credentials(values.email, values.password);

    isInvalidCredentialsErrorVisible.value = false;
  } catch (e) {
    console.error(e);

    isInvalidCredentialsErrorVisible.value = true;
  }

  isLoading.value = false;
}
</script>
