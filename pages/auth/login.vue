<template>
  <auth-container>
    <app-card class="max-sm:!contents" :loading="isLoading">
      <form class="form col gap-2" @submit.prevent="onSubmit">
        <h1 class="text-5xl font-black max-xl:text-center">Welcome back</h1>

        <span class="text-lg text-secondary max-xl:text-center"
          >Please enter your details</span
        >

        <input-validated
          v-model="email"
          :show-error="showErrors"
          :error="errors.email"
          :props="emailAttrs"
          class="mt-6"
          placeholder="Email"
          icon="mail"
        />

        <input-validated
          v-model="password"
          :show-error="showErrors"
          :error="errors.password"
          :props="passwordAttrs"
          password
          placeholder="Password"
          icon="lock"
        />

        <div class="w-full flex justify-end">
          <nuxt-link
            class="text-sm text-primary text-end"
            to="/auth/forgot-password"
            >Forgot password?
          </nuxt-link>
        </div>

        <Button rounded class="mt-6" type="submit">Sign in</Button>

        <div class="sm:contents flex flex-wrap gap-2">
          <Button
            class="flex-1"
            rounded
            severity="secondary"
            @click="signIn.googleOauth()"
          >
            <img
              class="size-8 object-cover"
              src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png"
              alt="Google Icon"
            />

            <span class="max-sm:hidden">Continue with Google</span>
          </Button>

          <Button
            class="flex-1"
            rounded
            severity="secondary"
            @click="signIn.githubOauth()"
          >
            <img
              class="size-8 object-cover invert"
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              alt="GitHub Icon"
            />

            <span class="max-sm:hidden">Continue with GitHub</span>
          </Button>
        </div>

        <span class="mt-4 text-sm text-secondary text-end">
          <span>Not registered yet? </span>

          <nuxt-link class="text-primary" to="/auth/registration"
            >Register now</nuxt-link
          >
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

const { signIn, isLoading } = useAppAuth();

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

function onSubmit() {
  // Show errors only after first submit
  showErrors.value = true;

  const e = Object.keys(errors.value);
  if (e.length > 0) return;

  signIn.credentials(
    values.email.substring(0, values.email.length - 10), // TODO: remove on prod
    values.password,
  );
}
</script>
