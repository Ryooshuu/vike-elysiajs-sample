<template>
  <div class="app">
    [Layout]
    <a href="/">Home</a> |
    <a href="/about">About</a>
    <slot />
  </div>
</template>

<style lang="scss">
body {
  background-color: black;
  color: white;
}
</style>
