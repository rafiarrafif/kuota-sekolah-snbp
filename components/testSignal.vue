<template>
  <div>
    <h1>{{ text }}</h1>
  </div>
</template>

<script lang="ts" setup>
const text = ref("waiting");

const data = await $fetch("/api/test-api");
text.value = data;
</script>
