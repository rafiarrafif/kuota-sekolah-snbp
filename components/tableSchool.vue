<template>
  <div class="border border-woodsmoke-500 rounded-lg text-woodsmoke-300">
    <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
      <UInput
        icon="i-heroicons-magnifying-glass-20-solid"
        class="w-[16rem]"
        v-model="schoolFilter"
        placeholder="Cari nama sekolah..."
      />
    </div>
    <UTable
      sort-asc-icon="i-heroicons-arrow-up-20-solid"
      sort-desc-icon="i-heroicons-arrow-down-20-solid"
      :ui="{
        td: {
          color: 'text-woodsmoke-200',
        },
        th: {
          color: 'text-white font-bold',
        },
      }"
      :sort-button="{
        icon: 'i-heroicons-sparkles-20-solid',
        color: 'primary',
        variant: 'outline',
        size: '2xs',
        square: false,
      }"
      class="w-full"
      :columns="[
        { key: 'id', label: 'NPSN' },
        { key: 'nama sekolah', label: 'Nama Sekolah', sortable: true },
        { key: 'akreditasi', label: 'Akreditasi', sortable: true },
        { key: 'persen kuota', label: 'Persen Kuota', sortable: true },
        { key: 'total semua siswa', label: 'Total Siswa', sortable: true },
        { key: 'total kuota siswa', label: 'Kuota Siswa', sortable: true },
      ]"
      :rows="filteredSchools"
      :empty-state="{
        icon: 'heroicons:magnifying-glass-circle',
        label: emptyTableText,
      }"
      :loading="loading"
      @select="select"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  code: { type: String },
});
watch(
  () => props.code,
  () => {
    refreshSchool();
  }
);

const emptyTableText = ref("Masukan kota/kabupaten terlebih dahulu");

const loading = ref(false);
const schoolData = ref<any[]>([]);
const schoolFilter = ref("");

const refreshSchool = async () => {
  loading.value = true;
  const responseSchoolData = await $fetch("/api/get-school", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ id: props.code }),
  });
  const decryptSchoolData: any = atob(responseSchoolData);
  const parseCityData: Record<string, any> = JSON.parse(decryptSchoolData);
  schoolData.value = Object.entries(parseCityData).map(([id, value]) => {
    const totalSemuaSiswa = Object.values(
      value["jumlah total siswa"] as Record<string, any>
    ).reduce((sum, val) => sum + parseInt(val), 0);
    const totalKuotaSiswa = Object.values(
      value["kuota siswa"] as Record<string, any>
    ).reduce((sum, val) => sum + parseInt(val), 0);

    return {
      id,
      ...value,
      "total semua siswa": totalSemuaSiswa,
      "total kuota siswa": totalKuotaSiswa,
    };
  });
  loading.value = false;
  emptyTableText.value = "Data tidak ditemukan.";
};

const filteredSchools: any = computed(() => {
  if (!schoolFilter.value) return schoolData.value;

  return schoolData.value.filter((school) => {
    return Object.values(school).some((value) => {
      return String(value)
        .toLowerCase()
        .includes(schoolFilter.value.toLowerCase());
    });
  });
});

const select = (row: any) => {
  console.log("Selected row:", row);
};

const clearTable = () => {
  emptyTableText.value = "Masukan kota/kabupaten terlebih dahulu";
  schoolData.value = [];
};

defineExpose({
  clearTable,
});
</script>
