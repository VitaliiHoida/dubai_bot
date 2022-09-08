<template>
  <div class="container">
    <div class="wrapper" v-if="formShow">
      <h1>Specify transfer details</h1>
      <form @submit.prevent="onSubmit">
        <p class="right">* - required fields</p>
        <p class="info">If your city is not there - unfortunately, no one goes there (or from there)</p>
        <fieldset>
          <fieldset class="form-group">
            <label for="from">* City from</label>
            <select name="from" v-model="from">
              <option v-for="(item, i) in cities" :key="i">{{item}}</option>
            </select>
          </fieldset>
          <fieldset class="form-group">
            <label for="to">* City to</label>
            <select name="to" v-model="to">
              <option v-for="(item, i) in cities" :key="i">{{item}}</option>
            </select>
          </fieldset>
          <fieldset class="form-group">
            <label for="type">* Choose the parcel type</label>
            <select v-model="type" name="type">
              <option>Documents</option>
              <option>Baggage</option>
            </select>
          </fieldset>
          <fieldset class="form-group" v-if="type === 'Baggage'">
            <label for="weight">Choose the allowable baggage weight</label>
            <select v-model="weight" name="weight" >
              <option>Up to 5 kg</option>
              <option>Up to 10 kg</option>
              <option>Up to 15 kg</option>
              <option>Up to 20 kg</option>
            </select>
          </fieldset>
          <fieldset class="form-group">
            <label for="date">*Choose the travel date</label>
            <datepicker v-model="date" name="date" class="date_input"/>
          </fieldset>
          <fieldset class="form-group btn">
            <button type="submit" class="sbmt_btn link_button" :disabled="!isSubmitting">Search</button>
          </fieldset>
        </fieldset>
      </form>
    </div>
    <div class="wrapper results" v-else>
      <p>Unfortunately, no matches found :(</p>
      <p>You can try again later</p>
    </div>
  </div>
</template>

<script>
import Datepicker from "vue3-datepicker";

export default {
  components: {
    Datepicker
  },
  data: () => ({
    from: '',
    to: '',
    date: new Date(),
    type: '',
    weight: '',
    formShow: true,
    cities: ["Lviv", "Kyiv", "Kharkiv"],
  }),
  computed: {
    formattedDate() {
      var dd = this.date.getDate();
      if (dd < 10) dd = '0' + dd;
      var mm = this.date.getMonth() + 1;
      if (mm < 10) mm = '0' + mm;
      var yy = this.date.getFullYear();

      return dd + '.' + mm + '.' + yy;
    },
    isSubmitting() {
      return (this.from&&this.to&&this.type) !== '';
    },
  },
  methods: {
    onSubmit() {
      this.formShow = !this.formShow;
    },
  },
}
</script>

<style>
</style>