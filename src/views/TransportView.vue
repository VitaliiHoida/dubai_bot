<template>
  <div class="container">
    <div class="wrapper">
      <h1>Enter your travel details</h1>
      <form @submit.prevent="onSubmit">
        <p>* - required fields</p>
        <fieldset>
          <fieldset class="form-group">
            <label for="login">*Your Tg login (e.g. @login)</label>
            <input type="text" name="login"  placeholder="" v-model="login">
          </fieldset>
          <fieldset class="form-group">
            <label for="from">*City from</label>
            <input type="text" name="from"  v-model="from">
          </fieldset>
          <fieldset class="form-group">
            <label for="to">*City to</label>
            <input type="text" name="to" v-model="to">
          </fieldset>
          <fieldset class="form-group">
            <label for="type">*Choose the parcel type</label>
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
            <button type="submit" class="sbmt_btn link_button" :disabled="!isSubmitting">Submit</button>
          </fieldset>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vue3-datepicker';

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
    formattedDate() {
      var dd = this.date.getDate();
      if (dd < 10) dd = '0' + dd;
      var mm = this.date.getMonth() + 1;
      if (mm < 10) mm = '0' + mm;
      var yy = this.date.getFullYear() ;

      return dd + '.' + mm + '.' + yy;
    },
    isSubmitting() {
      return (this.login&&this.from&&this.to&&this.type) !== '';
    },
  },
  methods: {
    onSubmit() {

    },
  },

}
</script>

<style>
</style>