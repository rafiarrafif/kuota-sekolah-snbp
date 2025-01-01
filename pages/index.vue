<template>
  <div>
    <!-- <span>{{ decodedProvinceData }}</span> -->
    <div class="w-full flex justify-center pt-12">
      <div class="flex flex-col items-center">
        <p class="text-sm font-thin text-center text-woodsmoke-50">
          Website ini bukan website resmi SNPMB!
        </p>
        <p class="text-sm font-thin text-center text-woodsmoke-50">
          Data pada website ini diperoleh dari celah API pada
          <a
            class="text-primary-400 font-medium"
            href="https://snpmb.bppp.kemdikbud.go.id/snbp/kuota-sekolah"
            target="_blank"
            >website resmi SNPMB</a
          >.
        </p>
        <p class="text-sm font-thin text-center text-woodsmoke-50">
          Website ini mungkin tak akan bekerja jika API sudah diperbaiki
        </p>
      </div>
    </div>
    <SelectData :data-set="decodedProvinceData" v-if="showSelect" />
    <div v-else>Please Wait..</div>
    <div class="pt-12 pb-12">
      <p class="text-sm font-thin text-center text-woodsmoke-300 mt-2">
        Creator:
        <a
          href="https://www.github.com/rafiarrafif"
          target="_blank"
          class="hover:text-primary-500 cursor-pointer transition-all"
          >Rafi Arrafif</a
        >
      </p>
      <p class="text-sm font-thin text-center text-woodsmoke-300">
        Report abuse:
        <a
          href="mailto:contact@nounoz.com"
          class="hover:text-primary-500 cursor-pointer transition-all"
          >contact@nounoz.com</a
        >
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";

const showSelect = ref(false);
const getProvinceData = ref("");
const decodedProvinceData = ref("");

onMounted(async () => {
  getProvinceData.value = await $fetch("/api/get-province");
  decodedProvinceData.value = JSON.parse(atob(getProvinceData.value));
  showSelect.value = true;
});
</script>
