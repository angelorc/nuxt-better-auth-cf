<script lang="ts" setup>
import { createAuthClient } from "better-auth/client"

const headers = import.meta.server ? useRequestHeaders() : undefined

const authClient = createAuthClient({
  fetchOptions: { headers }
})

const session = await authClient.getSession()

const signIn = async () => {
  await authClient.signIn.social({
    provider: 'github'
  })
}

const signOut = async () => {
  await authClient.signOut()
  window.location.reload()
}
</script>
<template>
  <div>
    <NuxtRouteAnnouncer />
    <h1>Nuxt 3 + BetterAuth</h1>
    <div>
      <button
        v-if="!session?.data"
        @click="signIn"
      >
        Continue with GitHub
      </button>
      <div>
        <pre>{{ session.data }}</pre>
        <button v-if="session.data" @click="signOut">
          Sign out
        </button>
      </div>
    </div>
  </div>
</template>
