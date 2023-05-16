<template>
  <div
    class="relative transition-all hover:drop-shadow-2xl"
    :class="{ 'cursor-pointer': !isAdding, 'hover:scale-110': isAdding }"
  >
    <font-awesome-icon
      :icon="['far', 'plus-square']"
      style="box-sizing: border-box !important"
      class="absolute z-10 h-full w-full transition-all hover:scale-110 p-24 text-gray-700/50"
      @click="isAdding = !isAdding"
      :class="{ hidden: isAdding }"
    />
    <Form
      @invalid-submit="onInvalidSubmit"
      :validation-schema="schema"
      @submit="submitStorage"
    >
      <div
        class="bg-green flex flex-col h-[16rem] rounded-lg"
        :class="{ 'blur-sm': !isAdding }"
      >
        <Field
          type="text"
          placeholder="Название"
          class="p-3 capitalize text-lg bg-inherit placeholder:text-gray-600 rounded-t-lg focus-visible:outline-none"
          name="name"
        />
        <div class="bg-gray-100 p-5 rounded-b-lg flex-1 relative">
          Температура -
          <Field
            type="text"
            maxlength="2"
            @keypress="isNumber"
            name="temperature"
            class="bg-inherit inline w-11"
          />°C <br />Влажность -
          <Field
            type="text"

            maxlength="2"
            name="humidity"
            @keypress="isNumber"
            class="bg-inherit mt-1 inline w-11"
          />
          %
          <my-button class="absolute bottom-3 right-3">Создать</my-button>
          <Field as="select" class="p-3 mt-1" name="type">
            <option value="" disabled selected>Тип места хранения</option>
            <option
              v-for="storage_type in storage_types"
              :key="storage_type.id"
              :value="storage_type.id + ',' + storage_type.name"
            >
              {{ storage_type.name }}
            </option>
          </Field>

          <slot></slot>
        </div>
      </div>
    </Form>
  </div>
</template>

<script>
import { useStoragesStore } from "../stores/StoragesStore";
import { storeToRefs } from "pinia";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  data() {
    return {
      isAdding: false,
    };
  },
  methods: {
    submitStorage({ name, temperature, humidity, type }, { resetForm }) {
      let storage = {};
      storage.name = name;
      storage.temperature = Number(temperature);
      storage.humidity = Number(humidity);
      let type_arr = type.split(",");
      storage.id_type = Number(type_arr[0]);
      storage.type = type_arr[1];
      this.$emit("create", { ...storage });
      resetForm();
      this.isAdding = false;
    },
    isNumber(evt) {
      var charCode = evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      }
      return true;
    },
    onInvalidSubmit({ values, errors, results }) {
      console.log(values);
      console.log(errors);
      console.log(results);
      if (values.temperature == 0) {
        alert("Температура должна быть больше 0");
      }
      if (values.humidity == 0) {
        alert("Влажность должна быть больше 0");
      }
      if (
        !values.type ||
        !values.humidity ||
        !values.temperature ||
        !values.name
      ) {
        alert("Вы не заполнили обязательные поля");
      }
    },
  },
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  setup() {
    const store = useStoragesStore();
    const { storage_types } = storeToRefs(store);

    if (storage_types.length == 0) {
      store.fetchStorageTypes();
    }

    const schema = yup.object({
      name: yup.mixed().required(),
      temperature: yup.number().positive().required(),
      humidity: yup.number().positive().required(),
      type: yup.mixed().required(),
    });

    return { store, storage_types, schema };
  },
};
</script>
