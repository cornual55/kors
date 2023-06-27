<template>
  <div>
    <div
      :class="{ hidden: !showSidebar }"
      class="fixed right-0 left-0 top-0 bottom-0 p-6 bg-gray-200 z-50"
    >
      <svg
        class="ml-auto cursor-pointer"
        @click="showSidebar = false"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"
        />
      </svg>
      <input
        v-model="search"
        @input="onChange"
        :placeholder="placeholder"
        class="mt-10 px-5 py-3 m-auto block w-full"
        @click="isOpen = true"
        type="text"
      />
      <ul v-show="isOpen">
        <li
          v-for="(result, i) in results"
          :key="i"
          @click="setResult(result)"
          class="p-2 mt-2 bg-gray-300/60 hover:bg-gray-300 cursor-pointer"
        >
          {{ result.name }}
        </li>
      </ul>
      <ul class="mt-10" v-if="order">
        <li
          v-for="(select, i) in selected"
          class="bg-green/70 hover:bg-green cursor-pointer px-3 py-1 mt-1"
          @click="
            selected = selected.filter((x) => x.id !== select.id);
            this.$emit('update:modelValue', selected);
          "
          :key="i"
        >
          {{ i + 1 }}: {{ select.name }}
        </li>
      </ul>
      <ul class="mt-10" v-else-if="numeric">
        <li
          v-for="(select, i) in selected"
          class="bg-green/50 hover:bg-green px-3 py-1 mt-1"
          :key="i"
        >
          {{ select.name }}
          <img
            class="w-4 inline float-right ml-4 mt-[0.3rem] cursor-pointer"
            @click="
              selected = selected.filter((x) => x.id !== select.id);
              this.$emit('update:modelValue', selected);
            "
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjMgMjAuMTY4bC04LjE4NS04LjE4NyA4LjE4NS04LjE3NC0yLjgzMi0yLjgwNy04LjE4MiA4LjE3OS04LjE3Ni04LjE3OS0yLjgxIDIuODEgOC4xODYgOC4xOTYtOC4xODYgOC4xODQgMi44MSAyLjgxIDguMjAzLTguMTkyIDguMTggOC4xOTJ6Ii8+PC9zdmc+"
          />
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
    <div
      class="relative h-[3.5rem] transition-all cursor-pointer bg-white hover:bg-gray-200"
      @click="showSidebar = true"
    >
      <div class="p-4 search float-left w-full h-full" type="text">
        {{ placeholder }}
      </div>
      <div class="absolute right-0 h-full flex items-center">
        <img
          class="w-5 mr-3"
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik00IC43NTVsMTQuMzc0IDExLjI0NS0xNC4zNzQgMTEuMjE5LjYxOS43ODEgMTUuMzgxLTEyLTE1LjM5MS0xMi0uNjA5Ljc1NXoiLz48L3N2Zz4="
        />
      </div>
    </div>
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
    selected: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      search: "",
      results: [],
      isOpen: true,
      showSidebar: false,
    };
  },
  mounted() {
    this.search = "";
    this.filterResults();
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
        let temp_results = [];
        for (let i = 0; i < this.selected.length; i++) {
          this.selected[i].place = i + 1;
        }
      }
      if (this.numeric) {
        result.quantity = 1;
      }
      if (!this.selected.find((x) => x.id === result.id)) {
        this.selected.push(result);
      }
      this.isOpen = false;
      this.search = "";
      this.$emit("update:modelValue", this.selected);
    },
  },
};
</script>

<style lang="postcss" scoped></style>
