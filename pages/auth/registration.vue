<template>
  <auth-container>
    <form class="form col gap-2">
      <h1 class="text-5xl font-black max-xl:text-center">Registration</h1>

      <InputGroup class="mt-6">
        <InputGroupAddon>
          <m-icon value="mail" />
        </InputGroupAddon>

        <InputText placeholder="Email" />
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <m-icon value="person" />
        </InputGroupAddon>

        <InputText placeholder="Username" />
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <m-icon value="lock" />
        </InputGroupAddon>

        <Password placeholder="Password" />
      </InputGroup>

      <Button rounded class="mt-6" type="submit">Sign up</Button>

      <div class="sm:contents flex flex-wrap gap-2">
        <Button class="flex-1" rounded severity="secondary">
          <img
            class="size-8 object-cover"
            src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png"
            alt="Google Icon"
          />

          <span class="max-sm:hidden">Continue with Google</span>
        </Button>

        <Button class="flex-1" rounded severity="secondary">
          <img
            class="size-8 object-cover invert"
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            alt="GitHub Icon"
          />

          <span class="max-sm:hidden">Continue with GitHub</span>
        </Button>
      </div>

      <span class="mt-4 text-sm text-secondary text-end">
        <span>Already registered? </span>

        <nuxt-link class="text-primary" to="/auth/login">Sign in</nuxt-link>
      </span>
    </form>
  </auth-container>
</template>

<script setup lang="ts">
import AuthContainer from "~/components/pages/auth/AuthContainer.vue";

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});
</script>
