<template>
  <div class="main">
    <NuxtLink to="/">
      <div class="card">
        <h2>{{ error.message }}</h2>
        <p>
          An error occurred! Click this text to go back home, and find your way
          back!
        </p>
      </div>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  layout: 'home',
  props: {
    error: {
      type: Object,
      default() {
        return {
          message: 'Unknown error',
        }
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  margin: var(--spacing-card-sm) auto;
  max-width: 800px;
}
</style>
