<template>
  <div class="container">
    <div class="wrapper">
      <h1>Enter your travel details</h1>
      <p class="info">
        Please indicate city names in English<br>
        (e.g. Kyiv, Moscow, Dubai etc.).<br><br>
        * - required fields
      </p>
      <form @submit.prevent="onSubmit">
        <fieldset>
          <fieldset class="form-group">
            <label for="login">* Your Telegram login </label>
            <input type="text" name="login" placeholder="** without @" v-model="login">
          </fieldset>
          <fieldset class="form-group" v-if="isDubai">
            <label for="from">* City from</label>
            <input type="text" name="from" v-model="from">
          </fieldset>
          <fieldset class="form-group" v-else>
            <label for="from">* City from <br> <span>To change - specify Dubai in 'City to'</span></label>
            <input type="text" name="from" :value="from = 'Dubai'" @focusin="event => from = event.target.value"
                   readonly>
          </fieldset>
          <fieldset class="form-group">
            <label for="to">* City to</label>
            <input type="text" name="to" v-model="to">
          </fieldset>
          <fieldset class="form-group">
            <label for="type">* Choose the parcel type</label>
            <multi-select :values="parcelTypes"
                          :default-values="parcelTypesSelected"
                          @choose-drop="chooseParcelType"/>
          </fieldset>
          <fieldset class="form-group" v-if="isBaggage">
            <label for="weight">Choose the allowable baggage weight</label>
            <select v-model="weight" name="weight">
              <option>Up to 5 kg</option>
              <option>Up to 10 kg</option>
              <option>Up to 15 kg</option>
              <option>Up to 20 kg</option>
            </select>
          </fieldset>
          <fieldset class="form-group">
            <label for="date">* Choose the travel date</label>
            <datepicker v-model="date" name="date" class="date_input"/>
          </fieldset>
          <fieldset class="form-group btn">
            <button type="submit" class="sbmt_btn link_button" :disabled="!isSubmitting">Submit</button>
          </fieldset>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vue3-datepicker';
import MultiSelect from "@/components/MultiSelect";
import {mapState, mapActions} from "vuex";

export default {
  components: {
    Datepicker,
    MultiSelect,
  },
  data: () => ({
    login: '',
    from: '',
    to: '',
    date: new Date(),
    weight: '',
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
    ...mapState("transportations", ["data"]),
    isSubmitting() {
      return ((this.login && this.from && this.to !== '') && (this.parcelTypesSelected.length > 0));
    },
    isBaggage() {
      return this.parcelTypesSelected.some(e => e.value === 'Baggage');
    },
    isDubai() {
      return this.to.toLowerCase() === 'dubai';
    },
    formattedDate() {
      let dd = this.date.getDate();
      if (dd < 10) dd = '0' + dd;
      let mm = this.date.getMonth() + 1;
      if (mm < 10) mm = '0' + mm;
      let yy = this.date.getFullYear();
      return yy + '-' + mm + '-' + dd;
    },
    types() {
      let str = '';
      this.parcelTypesSelected.forEach(item => {
        str = str + item.value + ', ';
      });
      return str;
    },
  },
  methods: {
    ...mapActions("transportations", ["createTransportation"]),
    onSubmit() {
      const transportation = {
        login_tg: this.login.toLowerCase(),
        city_from: this.from.toLowerCase(),
        city_to: this.to.toLowerCase(),
        travel_date: this.formattedDate,
        parcel_type: this.types,
        parcel_weight: this.weight.length > 0 ? this.weight : '',
      };
      console.log(transportation);
      /*this.createTransportation({transportation}).then(() => {
            this.$router.push({name: 'success'});
          }
      );*/
    },
    chooseParcelType(e) {
      if (this.parcelTypesSelected.includes(e)) {
        let i = this.parcelTypesSelected.indexOf(e);
        this.parcelTypesSelected.splice(i, 1);
      } else {
        this.parcelTypesSelected.push(e);
      }
    }
  },
  mounted() {
    /*let tg = window.Telegram.WebApp;
    this.login = tg.initDataUnsafe.user.username;*/
  }
}
</script>

<style>
</style>