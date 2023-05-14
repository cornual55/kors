<template>
  <div class="autocomplete">
    <input
      v-model="search"
      @input="onChange"
      :placeholder="placeholder"
      class="p-4"
      type="text"
    />
    <ul v-show="isOpen" class="autocomplete-results">
      <li
        v-for="(result, i) in results"
        :key="i"
        @click="setResult(result)"
        class="autocomplete-result"
      >
        {{ result.name }}
      </li>
    </ul>
    <ul v-if="order">
      <li
        v-for="(select, i) in selected"
        class="bg-green/50 hover:bg-green cursor-pointer px-3 py-1"
        @click="
          selected = selected.filter((x) => x.id !== select.id);
          this.$emit('update:modelValue', selected);
        "
        :key="i"
      >
        {{ i + 1 }}: {{ select.name }}
      </li>
    </ul>
    <ul v-else-if="numeric">
      <li
        v-for="(select, i) in selected"
        class="bg-green/50 hover:bg-green cursor-pointer px-3 py-1"
        :key="i"
      >
        {{ select.name }}
        <input
          min="1"
          class="bg-inherit inline w-10"
          style="float: right"
          v-model="select.quantity"
          type="number"
        />
      </li>
    </ul>
    <ul v-else class="selected mt-3 flex flex-wrap gap-2">
      <li
        v-for="(select, i) in selected"
        class="bg-green/50 hover:bg-green cursor-pointer px-3 py-1 text-sm w-fit rounded-xl"
        @click="
          selected = selected.filter((x) => x.id !== select.id);
          this.$emit('update:modelValue', selected);
        "
        :key="i"
      >
        {{ select.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    modelValue: "",
    placeholder: "",
    order: {
      type: Boolean,
      default: false,
    },
    numeric: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      search: "",
      results: [],
      isOpen: false,
      selected: [],
    };
  },
  methods: {
    filterResults() {
      this.results = this.items.filter(
        (item) =>
          item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      );
    },
    onChange() {
      this.filterResults();
      this.isOpen = true;
    },
    setResult(result) {
      /* this.search = result; */

      if (this.order) {
        for (let i = 0; i < this.selected.length; i++) {
          this.selected[i].place = i + 1;
        }
      }
      if (this.numeric) {
        for (let i = 0; i < this.selected.length; i++) {
          result.quantity = 1;
        }
      }
      if (!this.selected.find((x) => x.id === result.id)) {
        this.selected.push(result);
      }
      this.isOpen = false;
      this.$emit("update:modelValue", this.selected);
    },
  },
};
</script>

<style lang="postcss">
.autocomplete {
  position: relative;
}

.autocomplete-results {
  padding: 0;
  margin: 0;
  height: 120px;
  overflow: auto;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 12px;
  cursor: pointer;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
  @apply bg-green/40;
}
</style>
