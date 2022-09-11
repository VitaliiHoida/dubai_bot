<template>
  <div class="container">
    <div class="wrapper" v-if="formShow">
      <h1>Specify transfer details</h1>
      <p class="info">If your city is not there - unfortunately, no one goes there (or from there)</p>
      <form @submit.prevent="onSubmit">
        <p class="right">* - required fields</p>
        <fieldset>
          <fieldset class="form-group">
            <label for="from">* City from</label>
            <select name="from" v-model="from">
              <option v-for="(item, i) in cities" :key="i">{{ item }}</option>
            </select>
          </fieldset>
          <fieldset class="form-group">
            <label for="to">* City to</label>
            <select name="to" v-model="to">
              <option v-for="(item, i) in cities" :key="i">{{ item }}</option>
            </select>
          </fieldset>
          <fieldset class="form-group">
            <label for="type">* Choose the parcel type</label>
            <multi-select :values="parcelTypes"
                          :default-values="parcelTypesSelected"
                          @choose-drop="chooseParcelType"/>
          </fieldset>
          <fieldset class="form-group" v-if="type === 'Baggage'">
            <label for="weight">Choose the allowable baggage weight</label>
            <select v-model="weight" name="weight">
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
      <div class="results" v-if="results.length > 0">
        <h1>We found matches for you 🥳</h1>
        <p class="info">Сlick on the login to contact the person</p>
        <div class="item" v-for="(item, i) in results" :key="i">
          <span>{{ i + 1 }}. <a :href="url + item.login">{{ item.login }}</a></span>
          <span>{{ item.cityFrom }} - {{ item.cityTo }}</span>
          <span>{{ item.date }}</span>
        </div>
      </div>
      <div class="no_matches" v-else>
        <h1>Unfortunately,<br> no matches found 😔</h1>
        <p class="info">You can try again later</p>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from "vue3-datepicker";
import multiSelect from "@/components/MultiSelect";

export default {
  components: {
    Datepicker,
    multiSelect,
  },
  data: () => ({
    url: "https://t.me/",
    from: '',
    to: '',
    date: new Date(),
    type: [],
    weight: '',
    formShow: true,
    cities: ["Lviv", "Kyiv", "Kharkiv"],
    results: [
      {login: "Hoida_V", cityFrom: "Kyiv", cityTo: "Dubai", date: "25.10.2022"}
    ],
    parcelTypes: [
      {
        id: 0,
        value: "Documents"
      },
      {
        id: 1,
        value: "Baggage"
      }
    ],
    parcelTypesSelected: [],
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
      return (this.from && this.to && this.type) !== '';
    },
  },
  methods: {
    chooseParcelType(e) {
      if (this.parcelTypesSelected.includes(e)) {
        let i = this.parcelTypesSelected.indexOf(e);
        this.parcelTypesSelected.splice(i, 1);
      } else {
        this.parcelTypesSelected.push(e);
      }
      this.type = this.parcelTypesSelected;

    },
    onSubmit() {
      this.formShow = !this.formShow;
    },
  },
}
</script>

<style>
</style>