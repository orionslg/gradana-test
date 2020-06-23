<template>
  <div class="mt-3">
    <div>
      <b-row>
        <b-col cols="4">
          <b-form-group id="fieldset-1" label="Row" label-for="input-1">
            <b-form-select
              v-model="page.size"
              :options="options"
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
    </div>
    <div>
      <b-table striped hover :items="launches" :fields="fields"></b-table>
      <div class="text-center">
        <b-spinner type="grow" label="Loading..." v-if="loading"></b-spinner>
      </div>
    </div>
    <div>
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center mt-5">
          <li @click="prevPage" class="page-item mr-3" v-if="!disableBack">
            <a class="page-link" href="#" tabindex="-1">Previous</a>
          </li>
          <span class="text-muted page-number-pos">
            {{ page.current }} of {{ lastPage }}
          </span>
          <li @click="nextPage" class="page-item ml-3">
            <a class="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import axios from "axios";
import {
  ref,
  reactive,
  computed,
  watchEffect,
  watch
} from "@vue/composition-api";
export default {
  setup() {
    const launches = ref([]);

    const page = reactive({ current: 1, size: 10 });
    const offset = computed(() =>
      page.current === 1 ? 1 : page.size * (page.current - 1)
    );
    const disableBack = computed(() => page.current === 1);
    const lastPage = computed(() =>
      launches.value.length ? Math.ceil(launches.value[0].id / page.size) : 0
    );
    const loading = ref(true);
    const options = [
      { value: 10, text: "10" },
      { value: 20, text: "20" },
      { value: 50, text: "50" }
    ];
    const fields = [
      {
        key: "id",
        label: "ID"
      },
      {
        key: "name",
        label: "Name"
      },
      {
        key: "windowstart",
        label: "Window Start"
      },
      {
        key: "windowend",
        label: "Window End"
      }
    ];

    watchEffect(async () => {
      const response = await axios.get(
        `${process.env.VUE_APP_URL_ROCKET}/launch?offset=${offset.value}&limit=${page.size}`
      );
      loading.value = false;
      launches.value = response.data.launches;
    });

    watch(
      () => page.size,
      size => {
        loading.value = true;
      }
    );

    function nextPage() {
      page.current++;
      loading.value = true;
    }

    function prevPage() {
      if (page.current > 1) page.current--;
      loading.value = true;
    }
    return {
      launches,
      page,
      disableBack,
      lastPage,
      fields,
      options,
      loading,
      nextPage,
      prevPage
    };
  }
};
</script>

<style scoped>
.page-number-pos {
  margin-top: 0.5em;
}
</style>
