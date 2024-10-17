<template>
  <h1>{{ heading }}</h1>
  <p>{{ abortReason }}</p>
</template>

<script setup lang="ts">
import { usePageContext } from 'vike-vue/usePageContext';

let { is404, abortReason } = usePageContext();

if (!abortReason) {
  abortReason = is404 ? "This page could not be found." : "An unexpected error occured.";
}

const heading = is404 ? "404 Page Not Found" : "500 Internal Server Error";
</script>
