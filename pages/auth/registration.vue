<template>
  <auth-container>
    <app-card class="md:min-w-[550px] max-sm:!contents" :loading="isLoading">
      <form class="form col gap-2" @submit.prevent="onSubmit">
        <h1 class="text-5xl font-black max-xl:text-center">
          {{ $locale("auth.signUp.title") }}
        </h1>

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
          v-model="username"
          :show-error="showErrors"
          :error="errors.username"
          :props="usernameAttrs"
          :placeholder="$locale('auth.username')"
          icon="person"
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

        <span
          v-if="showErrors && !isLoading && isInvalidCredentialsErrorVisible"
          class="text-lg text-red-500 text-center whitespace-pre-line"
        >
          {{ $locale("auth.signUp.credentialsError") }}
        </span>

        <Button
          rounded
          class="mt-6"
          type="submit"
          :disabled="isLoading || !isFormValid"
          >{{ $locale("auth.signUp.action") }}
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
          <span>{{ $locale("auth.signUp.alreadyRegistered") }} </span>

          <nuxt-link class="ms-1 text-primary" to="/auth/login">{{
            $locale("auth.signIn.action")
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
  title: "Registration",
});

const { signUp, signIn } = useAppAuth();

const validationSchema = yup.object({
  email: yup.string().email().min(4).required(),
  username: yup.string().min(4).required().trim(),
  password: yup.string().min(8).required().trim(),
});

const { defineField, values, errors } = useForm({
  validationSchema: validationSchema,
});

const [email, emailAttrs] = defineField("email");
const [username, usernameAttrs] = defineField("username");
const [password, passwordAttrs] = defineField("password");

const showErrors = ref(false);
const isLoading = ref(false);
const isInvalidCredentialsErrorVisible = ref(false);

const isFormValid = computed(() => {
  return (
    !!email.value &&
    !!username.value &&
    !!password.value &&
    !errors.value["email"] &&
    !errors.value["username"] &&
    !errors.value["password"]
  );
});

async function onSubmit() {
  // Show errors only after first submit
  showErrors.value = true;

  const e = Object.keys(errors.value);
  if (e.length > 0) return;

  isLoading.value = true;

  try {
    await signUp(values.email, values.username, values.password);
    isInvalidCredentialsErrorVisible.value = false;
  } catch (e) {
    console.error(e);

    isInvalidCredentialsErrorVisible.value = true;
  }

  isLoading.value = false;
}
</script>
