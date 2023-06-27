<template>
  <div v-click-outside="() => (isOpen = false)" class="autocomplete">
    <input
      v-model="search"
      @input="onChange"
      @focus="filterResults()"
      @click="isOpen = !isOpen"
      tabindex="0"
      :placeholder="placeholder"
      class="p-4 w-full bg-gray-200/70"
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
        class="bg-gray-300/70 px-3 py-2 mt-2"
        :key="i"
      >
        {{ select.name }}
        <font-awesome-icon
          :icon="['far', 'trash-can']"
        @click="
          selected = selected.filter((x) => x.id !== select.id);
          this.$emit('update:modelValue', selected);
        "
          class="float-right text-gray-700/70 transition-all text-2xl cursor-pointer hover:text-gray-700"
        />
      </li>
    </ul>
    <ul v-else-if="numeric">
      <li
        v-for="(select, i) in selected"
        class="bg-gray-300/70 px-3 py-2 mt-2"
        :key="i"
      >
        <span class="text-lg">{{ select.name }}</span>
        <!-- <img
          class="w-4 inline float-right ml-4 mt-[0.3rem] cursor-pointer"
          @click="
            selected = selected.filter((x) => x.id !== select.id);
            this.$emit('update:modelValue', selected);
          "
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjMgMjAuMTY4bC04LjE4NS04LjE4NyA4LjE4NS04LjE3NC0yLjgzMi0yLjgwNy04LjE4MiA4LjE3OS04LjE3Ni04LjE3OS0yLjgxIDIuODEgOC4xODYgOC4xOTYtOC4xODYgOC4xODQgMi44MSAyLjgxIDguMjAzLTguMTkyIDguMTggOC4xOTJ6Ii8+PC9zdmc+"
        /> -->

        <div class="flex mt-1 justify-between">
          <div>
            Кол-во:

            <input
              min="1"
              class="bg-gray-100 ml-3 text-center inline w-16"
              v-model="select.quantity"
              type="number"
            />
            <select
              class="bg-gray-100 ml-3 text-center inline w-16 h-[24px]"
              type="number"
              v-model="select.id_measure"
            >
              <option v-for="measure in measures" :key="measure.id" :value="measure.id"> {{ measure.name }} </option>
            </select>
          </div>
          <font-awesome-icon
            :icon="['far', 'trash-can']"
            @click="
              selected = selected.filter((x) => x.id_product !== select.id_product);
              this.$emit('update:modelValue', selected);
            "
            class="justify-self-end text-gray-700/70 transition-all text-2xl cursor-pointer hover:text-gray-700"
          />
        </div>
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
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useMeasureStore } from "../stores/MeasuresStore";
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
      if (result.id_product) {
        if (!this.selected.find((x) => x.id_product === result.id_product)) {
          this.selected.push(result);
        }
      } else {
        if (!this.selected.find((x) => x.id === result.id)) {
          this.selected.push(result);
        }
      }

      if (this.order) {
        //for (let i = 0; i < this.selected.length; i++) {
        //  this.selected[i].place = i + 1;
        //  }
      }
      if (this.numeric) {
        result.quantity = 1;
        result.id_measure = this.measures[0].id;
      }

      this.isOpen = false;
      this.$emit("update:modelValue", this.selected);
    },
  },
  setup() {
    let store_measures = useMeasureStore();
    let { measures } = storeToRefs(store_measures);
    store_measures.fetchMeasures();
    return {measures}
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
  height: 150px;
  overflow: auto;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 8px 16px;
  cursor: pointer;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
  @apply bg-green/40;
}
</style>
