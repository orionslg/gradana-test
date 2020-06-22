<template>
  <b-form class="mt-5">
    <b-form-row align-h="center">
      <b-col>
        <b-form-group id="input-group-1" label="First Name" label-for="input-1">
          <b-form-input
            id="input-1"
            placeholder="Enter first name"
            v-model="userData.firstName"
          ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group id="input-group-2" label="Last Name" label-for="input-2">
          <b-form-input
            id="input-2"
            placeholder="Enter last name"
            v-model="userData.lastName"
          ></b-form-input>
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
        ></b-form-datepicker>
      </b-col>
    </b-form-row>
  </b-form>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        salary: ""
      },
      location: {
        province: "",
        district: "",
        constituency: "",
        village: ""
      }
    };
  }
};
</script>

<style></style>
