<template>
  <auth-container>
    <app-card class="max-sm:!contents" :loading="isLoading">
      <form class="form col gap-2" @submit.prevent="onSubmit">
        <h1 class="text-5xl font-black max-xl:text-center">{{ $locale('registration') }}</h1>

        <input-validated
          v-model="email"
          :show-error="showErrors"
          :error="errors.email"
          :props="emailAttrs"
          class="mt-6"
          :placeholder="$locale('email')"
          icon="mail"
        />

        <input-validated
          v-model="username"
          :show-error="showErrors"
          :error="errors.username"
          :props="usernameAttrs"
          :placeholder="$locale('username')"
          icon="person"
        />

        <input-validated
          v-model="password"
          :show-error="showErrors"
          :error="errors.password"
          :props="passwordAttrs"
          password
          :placeholder="$locale('password')"
          icon="lock"
        />

        <Button rounded class="mt-6" type="submit">{{ $locale('signUp') }}</Button>

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
              :alt="$locale('githubIcon')"
            >

            <span class="max-sm:hidden">{{ $locale('continueWithGithub') }}</span>
          </Button>
        </div>

        <span class="mt-4 text-sm text-secondary text-end">
          <span>{{ $locale('alreadyRegistered') }} </span>

          <nuxt-link class="ms-1 text-primary" to="/auth/login">{{ $locale('signIn') }}</nuxt-link>
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

const { signIn, isLoading } = useAppAuth();

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

function onSubmit() {
  // Show errors only after first submit
  showErrors.value = true;

  const e = Object.keys(errors.value);
  if (e.length > 0) return;

  // TODO: add signup
  signIn.credentials(
    values.email.substring(0, values.email.length - 10), // TODO: remove on prod
    values.password,
  );
}
</script>
