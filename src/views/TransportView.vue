<template>
  <div class="container">
    <div class="wrapper">
      <h1>Enter your travel details</h1>
      <p class="info">
        Please indicate city names in English<br>
        (e.g. Kyiv, Moscow, Dubai etc.)
      </p>
      <form @submit.prevent="onSubmit">
        <p>* - required fields</p>
        <fieldset>
          <fieldset class="form-group">
            <label for="login">* Your Telegram login </label>
            <input type="text" name="login"  placeholder="** without @" v-model="login">
          </fieldset>
          <fieldset class="form-group">
            <label for="from">* City from</label>
            <input type="text" name="from"  v-model="from">
          </fieldset>
          <fieldset class="form-group">
            <label for="to">* City to</label>
            <input type="text" name="to" v-model="to">
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
import {mapState, mapActions} from "vuex";

export default {
  components: {
    Datepicker,
  },
  data: ()=> ({
      login:'',
      from: '',
      to: '',
      date: new Date(),
      type: '',
      weight: '',
  }),
  computed: {
    ...mapState("transportations", ["data"]),
    formattedDate() {
      let dd = this.date.getDate();
      if (dd < 10) dd = '0' + dd;
      let mm = this.date.getMonth() + 1;
      if (mm < 10) mm = '0' + mm;
      let yy = this.date.getFullYear() ;

      return dd + '.' + mm + '.' + yy;
    },
    isSubmitting() {
      return (this.login&&this.from&&this.to&&this.type) !== '';
    },
  },
  methods: {
    ...mapActions("transportations", ["createTransportation"]),
    onSubmit() {
      const transportation = {
        };
      this.createTransportation({transportation}).then(()=>{
          this.$router.push({name: 'success'});}
      );
    },
  },
  mounted() {
    /*let tg = window.Telegram.WebApp;
    this.login = tg.initDataUnsafe.user.username;*/
  }
}
</script>

<style>
</style>