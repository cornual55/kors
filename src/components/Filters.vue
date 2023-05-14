<template>
  <div>
    <my-accordion
      v-for="option in options"
      :key="option.name"
      :title="option.name"
    >
      <!-- <h2 class="text-xl" v-if="title">{{ title }}</h2> -->
      <!-- <div class="mt-2 text-gray-800"> -->
      <div v-for="value in option.values" :key="`${option.type} ${value.id}`">
        <input
          @change="
            this.$emit(
              'change',
              { value: value.value, type: option.type },
              $event.target.checked
            )
          "
          type="checkbox"
          
          :id="value.id"
          :value="value.value"
        />
        <label style="user-select: none" :for="value.id" class="p-3 text-sm">{{
          value.name
        }}</label>
      </div>
    </my-accordion>
  </div>
</template>

<script>
export default {
  props: {
    options: Array,
  },
};
</script>

<style></style>
