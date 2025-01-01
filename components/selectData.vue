<template>
  <div class="mt-20 flex flex-col w-full items-center">
    <div class="w-[80rem]">
      <div class="flex w-full justify-center gap-2">
        <div class="flex-1 flex flex-col gap-1.5">
          <span class="text-neutral-200"> Provinsi({{ province }}) </span>
          <USelectMenu
            searchable
            searchable-placeholder="Cari Provinsi..."
            class="w-full"
            color="gray"
            variant="outline"
            size="lg"
            placeholder="Select a person"
            :options="provinceData"
            option-attribute="name"
            value-attribute="value"
            v-model="province"
          />
        </div>
        <div class="flex-1 flex flex-col gap-1.5">
          <span class="text-neutral-200"> Kabupaten/Kota({{ city }}) </span>
          <USelectMenu
            searchable
            searchable-placeholder="Cari Kabupaten/kota..."
            class="w-full"
            color="gray"
            variant="outline"
            size="lg"
            :placeholder="placeholderCity"
            :options="cityData"
            option-attribute="name"
            value-attribute="value"
            v-model="city"
            :disabled="disableCitySearch"
          />
        </div>
      </div>
    </div>
    <div class="w-[80rem] mt-10">
      <TableSchool :code="city" ref="tableSchoolData" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type TableSchool from "./tableSchool.vue";

const props = defineProps(["dataSet"]);
const provinceData = props.dataSet.map((item: any) => ({
  value: item.id,
  name: item.nama,
}));
const province = ref("");

const disableCitySearch = ref(true);
const placeholderCity = ref("Masukan Provinsi Dulu");
const cityData: any = ref("Pilih Provinsi Dulu");
const city = ref("");

const getCityData = async () => {
  const responseCityData = await $fetch("/api/get-state", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ id: province.value }),
  });
  const decryptCityData: any = atob(responseCityData);
  const parseCityData = JSON.parse(decryptCityData);
  cityData.value = parseCityData.data.map((item: any) => ({
    value: item.Kode_Kab,
    name: item.Nama_Kab,
    master: item.Master_Kab,
  }));
  placeholderCity.value = "Cari Kabupaten/kota...";
  disableCitySearch.value = false;
};

const tableSchoolData = ref<InstanceType<typeof TableSchool> | null>(null);
const clearTable = () => {
  if (tableSchoolData.value) {
    tableSchoolData.value.clearTable();
  }
};

watch(province, () => {
  getCityData();
  clearTable();
});
</script>
