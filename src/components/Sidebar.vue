<template>
  <div class="bg-gray-100 p-10 rounded-lg">
    <div class="divide-solid divide-black divide-y-0 flex flex-col gap-2">
      <h2 class="text-lg">Место хранения</h2>
      <div class="mt-2">
        <input type="checkbox" id="check1" value="комод" class="" />
        <label for="check1" class="p-3">Комод</label>
      </div>
      <div>
        <input type="checkbox" id="check2" value="Холодильник" />
        <label for="check2" class="p-3">Холодильник</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  props: [],
};
</script>
