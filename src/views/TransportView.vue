<template>
  <div class="container">
    <div class="wrapper">
      <div class="addit_btns">
        <router-link
          :to="{ name: 'home' }"
          class="back_link"
          >&#9664; To main page</router-link
        >
        <a href="https://t.me/DP_4h_operatorBot">Operator &#9742;</a>
      </div>

      <h1>Enter your travel details</h1>
      <p class="info">
        Please indicate city names in English<br />
        (e.g. Kyiv, Moscow, Dubai etc.).<br /><br />
        * - required fields
      </p>
      <form @submit.prevent="onSubmit">
        <fieldset>
          <fieldset class="form-group">
            <label for="login">* Your Telegram login </label>
            <input
              type="text"
              name="login"
              placeholder="** without @"
              v-model="login"
            />
          </fieldset>
          <fieldset class="form-group">
            <label>* Your direction</label>
            <div class="radio_input">
              <input
                class="custom_radio"
                type="radio"
                id="from"
                value="From"
                name="direction"
                v-model="direction"
              />
              <label for="from">From Dubai</label>
            </div>
            <div class="radio_input">
              <input
                class="custom_radio"
                type="radio"
                id="to"
                value="To"
                name="direction"
                v-model="direction"
              />
              <label for="to">To Dubai</label>
            </div>
          </fieldset>
          <fieldset class="form-group">
            <label for="from">* Another waypoint</label>
            <input
              type="text"
              name="from"
              v-model="city"
              class="city_input"
            />
          </fieldset>
          <fieldset class="form-group">
            <label for="type">* Choose the parcel type</label>
            <multi-select
              :values="parcelTypes"
              :default-values="parcelTypesSelected"
              @choose-drop="chooseParcelType"
            />
          </fieldset>
          <fieldset
            class="form-group"
            v-if="isBaggage"
          >
            <label for="weight">Choose the allowable baggage weight</label>
            <select
              v-model="weight"
              name="weight"
            >
              <option value="5">Up to 5 kg</option>
              <option value="10">Up to 10 kg</option>
              <option value="15">Up to 15 kg</option>
              <option value="20">Up to 20 kg</option>
            </select>
          </fieldset>
          <fieldset class="form-group">
            <label for="date">* Choose the travel date</label>
            <datepicker
              v-model="date"
              name="date"
              class="date_input"
            />
          </fieldset>
          <fieldset class="form-group btn">
            <button
              type="submit"
              class="sbmt_btn link_button"
              :disabled="!isSubmitting"
            >
              Submit
            </button>
          </fieldset>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vue3-datepicker';
import MultiSelect from '@/components/MultiSelect';
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    Datepicker,
    MultiSelect,
  },
  data: () => ({
    login: '',
    city: '',
    date: new Date(),
    weight: '',
    direction: '',
    parcelTypes: [
      {
        id: 0,
        value: 'Documents',
      },
      {
        id: 1,
        value: 'Baggage',
      },
    ],
    parcelTypesSelected: [],
  }),
  computed: {
    ...mapState('transportations', ['data']),
    isSubmitting() {
      return (
        this.login &&
        this.city &&
        this.direction !== '' &&
        this.parcelTypesSelected.length > 0
      );
    },
    isBaggage() {
      return this.parcelTypesSelected.some((e) => e.value === 'Baggage');
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
      let arr = [];
      let res = '';
      this.parcelTypesSelected.forEach((item) => {
        arr.push(item.id);
      });
      if (arr.length > 1) {
        res = 'documents baggage';
      } else if (arr[0] === 0) {
        res = 'documents';
      } else if (arr[0] === 1) {
        res = 'baggage';
      } else {
        res = '';
      }
      return res;
    },
    transportation() {
      return {
        tg_login: this.login?.toLowerCase(),
        city_from:
          this.direction === 'From' ? 'dubai' : this.city.toLowerCase(),
        city_to: this.direction === 'To' ? 'dubai' : this.city.toLowerCase(),
        travel_date: this.formattedDate,
        parcel_type: this.types /*JSON.stringify(this.parcelTypesSelected)*/,
        baggage_weight: this.weight.length > 0 ? Number(this.weight) : 0,
      };
    },
  },
  methods: {
    ...mapActions('transportations', ['createTransportation']),
    onSubmit() {
      this.createTransportation(this.transportation).then(() => {
        window.localStorage.removeItem('transfer');
        this.$router.push({ name: 'success' });
      });
    },
    chooseParcelType(e) {
      if (
        JSON.stringify(this.parcelTypesSelected).includes(JSON.stringify(e))
      ) {
        let i = this.parcelTypesSelected.indexOf(e);
        this.parcelTypesSelected.splice(i, 1);
      } else {
        this.parcelTypesSelected.push(e);
      }
    },
  },
  mounted() {
    let tg = window.Telegram.WebApp;
    this.login = tg.initDataUnsafe.user?.username;

    this.history = JSON.parse(window.localStorage.getItem('transfer'));
    if (this.history?.city_from === 'dubai') {
      this.direction = 'From';
      this.city = this.history?.city_to;
    } else if (this.history?.city_to === 'dubai') {
      this.direction = 'To';
      this.city = this.history?.city_from;
    }
    switch (this.history?.parcel_type) {
      case 'documents baggage':
        this.parcelTypesSelected = [
          { id: 0, value: 'Documents' },
          { id: 1, value: 'Baggage' },
        ];
        break;
      case 'documents':
        this.parcelTypesSelected = [{ id: 0, value: 'Documents' }];
        break;
      case 'baggage':
        this.parcelTypesSelected = [{ id: 1, value: 'Baggage' }];
        break;
      default:
        this.parcelTypesSelected = [];
    }
    switch (this.history?.baggage_weight) {
      case 5:
        this.weight = '5';
        break;
      case 10:
        this.weight = '10';
        break;
      case 15:
        this.weight = '15';
        break;
      case 20:
        this.weight = '20';
        break;
      default:
        this.weight = '';
    }
    if (this.history?.travel_date) {
      this.date = new Date(this.history?.travel_date);
    }
  },
  beforeUpdate() {
    window.localStorage.setItem(
      'transfer',
      JSON.stringify(this.transportation)
    );
  },
};
</script>

<style></style>
