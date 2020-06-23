<template>
  <b-form class="mt-5" @submit="submitData">
    <b-form-row align-h="center">
      <b-col>
        <b-form-group id="input-group-1" label="First Name" label-for="input-1">
          <b-form-input id="input-1" placeholder="Enter first name" v-model="userData.firstName"></b-form-input>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group id="input-group-2" label="Last Name" label-for="input-2">
          <b-form-input id="input-2" placeholder="Enter last name" v-model="userData.lastName"></b-form-input>
        </b-form-group>
      </b-col>
    </b-form-row>
    <b-form-row>
      <b-col>
        <label for="date-of-birth">Date of birth</label>
        <b-form-datepicker
          id="date-of-birth"
          v-model="userData.dateOfBirth"
          class="mb-2"
          locale="id"
          :max="maxDate"
        ></b-form-datepicker>
      </b-col>
    </b-form-row>
    <b-form-row>
      <b-col md="12">
        <b-form-group id="provinces-group" label="Province" label-for="provinces">
          <select class="custom-select" v-model="province">
            <option
              v-for="province in locationApi.provinces"
              :key="province.id"
              :value="province.id"
            >{{ province.name }}</option>
          </select>
        </b-form-group>
      </b-col>
      <b-col md="12">
        <b-form-group id="constituency-group" label="District" label-for="constituency">
          <select
            class="custom-select"
            :disabled="!locationApi.districts.length"
            v-model="district"
          >
            <option
              v-for="district in locationApi.districts"
              :key="district.id"
              :value="district.id"
            >{{ district.name }}</option>
          </select>
        </b-form-group>
      </b-col>
      <b-col md="12">
        <b-form-group id="constituency-group" label="Constituency" label-for="constituency">
          <select
            class="custom-select"
            v-model="constituency"
            :disabled="!locationApi.constituency.length"
          >
            <option
              v-for="constituency in locationApi.constituency"
              :key="constituency.id"
              :value="constituency.id"
            >{{ constituency.name }}</option>
          </select>
        </b-form-group>
      </b-col>
      <b-col md="12">
        <b-form-group id="village-group" label="Village" label-for="village">
          <select class="custom-select" v-model="village" :disabled="!locationApi.village.length">
            <option
              v-for="village in locationApi.village"
              :key="village.id"
              :value="village.id"
            >{{ village.name }}</option>
          </select>
        </b-form-group>
      </b-col>
    </b-form-row>
    <b-form-row>
      <b-col>
        <b-form-group id="input-group-2" label="Salary" label-for="input-2">
          <b-form-input
            id="input-2"
            placeholder="Enter salary"
            v-model="userData.salary"
            type="number"
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-form-row>
    <b-button type="submit" variant="primary">
      <b-spinner small v-if="isLoading"></b-spinner>
      <span v-if="!isLoading">Submit</span>
      <span v-else>Submiting...</span>
    </b-button>
  </b-form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return {
      userData: {
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        salary: ""
      },
      province: "",
      district: "",
      constituency: "",
      village: "",
      locationApi: {
        provinces: [],
        districts: [],
        constituency: [],
        village: []
      },
      maxDate: new Date(today),
      isLoading: false,
      error: ""
    };
  },
  methods: {
    submitData(e) {
      e.preventDefault();
      this.isLoading = true;
      axios({
        url: process.env.VUE_APP_URL_MOCK,
        method: "POST",
        data: {
          firstName: this.userData.firstName,
          lastName: this.userData.lastName,
          dateOfBirth: this.userData.dateOfBirth,
          salary: this.userData.salary,
          province: this.province,
          district: this.district,
          village: this.village
        }
      })
        .then(() => {})
        .catch(err => {
          this.error = err.response;
        })
        .finally(() => {
          alert(`
            First Name: ${this.userData.firstName}
            Last Name: ${this.userData.lastName}
            Date of Birth: ${this.userData.dateOfBirth}
            Province: ${this.mockProvince}
            District: ${this.mockDistrict}
            Constituency: ${this.mockConstituency}
            Village: ${this.mockvillage}
            Salary: ${this.userData.salary}
          `);
          this.isLoading = false;
        });
    },
    filterName(arr, id) {
      const name = arr.filter(el => el.id === id);
      return name.length && name[0].name;
    }
  },
  watch: {
    province: function(value) {
      axios
        .get(`${process.env.VUE_APP_URL_WILAYAH}/kabupaten?idpropinsi=${value}`)
        .then(({ data }) => {
          this.locationApi.districts = data.data;
        });
    },
    district: function(value) {
      axios
        .get(
          `${process.env.VUE_APP_URL_WILAYAH}/kecamatan?idkabupaten=${value}`
        )
        .then(({ data }) => {
          this.locationApi.constituency = data.data;
        });
    },
    constituency: function(value) {
      axios
        .get(
          `${process.env.VUE_APP_URL_WILAYAH}/kelurahan?idkecamatan=${value}`
        )
        .then(({ data }) => {
          this.locationApi.village = data.data;
        });
    }
  },
  computed: {
    mockProvince: function() {
      const name = this.locationApi.provinces.filter(
        el => el.id === this.province
      );
      return name.length && name[0].name;
    },
    mockDistrict: function() {
      return this.filterName(this.locationApi.districts, this.district);
    },
    mockConstituency: function() {
      return this.filterName(this.locationApi.constituency, this.constituency);
    },
    mockvillage: function() {
      return this.filterName(this.locationApi.village, this.village);
    }
  },
  created() {
    axios
      .get(`${process.env.VUE_APP_URL_WILAYAH}/provinsi`)
      .then(({ data }) => {
        this.locationApi.provinces = data.data;
      });
  }
};
</script>

<style></style>
