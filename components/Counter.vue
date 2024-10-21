<template>
  <button
    type="button"
    @click="state.count++"
    class="h-10 px-6 font-semibold rounded-md bg-black text-white"
  >
    Counter: {{ state.count }}
  </button>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({ count: 0 })
</script>
