<template>
  <div class="container">
    <div class="wrapper" v-if="formShow">
      <div class="addit_btns">
        <router-link :to="{ name: 'home' }" class="back_link"
          >&#9664; To main page</router-link
        >
        <a href="https://t.me/DP_4h_operatorBot">Operator &#9742;</a>
      </div>

      <h1>Specify transfer details</h1>
      <p class="info">
        If your city is not there - unfortunately, no one goes there (or from
        there).<br /><br />
        * - required fields
      </p>
      <form @submit.prevent>
        <fieldset>
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
                :checked="direction === 'From'"
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
                :checked="direction === 'To'"
              />
              <label for="to">To Dubai</label>
            </div>
          </fieldset>
          <fieldset class="form-group">
            <label for="to">* Another waypoint</label>
            <semi-select
              :values="citiesTo"
              :default-values="city"
              @choose-drop="chooseCity"
              v-if="direction === 'From'"
            />
            <semi-select
              :values="citiesFrom"
              :default-values="city"
              @choose-drop="chooseCity"
              v-else
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
          <fieldset class="form-group" v-if="isBaggage">
            <label for="weight">Choose your baggage weight</label>
            <select v-model="weight" name="weight">
              <option value="5">Up to 5 kg</option>
              <option value="10">Up to 10 kg</option>
              <option value="15">Up to 15 kg</option>
              <option value="20">Up to 20 kg</option>
            </select>
          </fieldset>
          <fieldset class="form-group">
            <label for="date"
              >*Choose the travel date
              <p class="info">
                Will search for trips within 7 days from the specified date
              </p>
            </label>

            <datepicker v-model="date" name="date" class="date_input" />
          </fieldset>
          <fieldset class="form-group btn">
            <button
              type="button"
              class="sbmt_btn link_button"
              :disabled="!isSubmitting"
              @click="onSubmit"
            >
              Search
            </button>
          </fieldset>
        </fieldset>
      </form>
    </div>
    <div class="wrapper results" v-else>
      <div class="results" v-if="data.length > 0">
        <div class="addit_btns">
          <router-link :to="{ name: 'home' }" class="back_link"
            >&#9664; To main page</router-link
          >
          <a href="#">Operator &#9742;</a>
        </div>
        <h1>We found matches for you 🥳</h1>
        <p class="info">Сlick on the login to contact the person</p>
        <div class="item" v-for="(item, i) in data" :key="i">
          <div class="item_info">
            <span
              >{{ i + 1 }}.
              <a :href="url + item.tg_login">{{ item.tg_login }}</a></span
            >
            <span class="city">{{ item.city_from }}</span> -
            <span class="city">{{ item.city_to }}</span>
            <span>{{ item.travel_date }}</span>
          </div>
          <div class="type" v-if="item.parcel_type === 'documents baggage'">
            Can take Documents, Baggage (up to {{ item.baggage_weight }} kg)
          </div>
          <div class="type" v-if="item.parcel_type === 'baggage'">
            Can take Baggage (up to {{ item.baggage_weight }}
            kg)
          </div>
          <div class="type" v-if="item.parcel_type === 'documents'">
            Can take Documents
          </div>
        </div>
      </div>
      <div class="no_matches" v-else>
        <div class="addit_btns">
          <router-link :to="{ name: 'home' }" class="back_link"
            >&#9664; To main page</router-link
          >
          <a href="#">Operator &#9742;</a>
        </div>
        <h1>
          Unfortunately,<br />
          no matches found 😔
        </h1>
        <p class="info">You can try again later</p>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from "vue3-datepicker";
import multiSelect from "@/components/MultiSelect";
import semiSelect from "@/components/SemiSelect";
import { mapState, mapActions } from "vuex";
import { stringify } from "query-string";

export default {
  components: {
    Datepicker,
    multiSelect,
    semiSelect,
  },
  data: () => ({
    tg: null,
    url: "https://t.me/",
    date: new Date(),
    weight: "",
    city: "",
    direction: "",
    formShow: true,
    parcelTypes: [
      {
        id: 0,
        value: "Documents",
      },
      {
        id: 1,
        value: "Baggage",
      },
    ],
    parcelTypesSelected: [],
    history: {},
  }),
  computed: {
    ...mapState("transportations", ["data"]),
    ...mapState("cities", ["citiesTo", "citiesFrom"]),
    isSubmitting() {
      return (
        this.city &&
        this.direction !== "" &&
        this.parcelTypesSelected.length > 0
      );
    },
    isBaggage() {
      return this.parcelTypesSelected.some((e) => e.value === "Baggage");
    },
    formattedDate() {
      let dd = this.date.getDate();
      if (dd < 10) dd = "0" + dd;
      let mm = this.date.getMonth() + 1;
      if (mm < 10) mm = "0" + mm;
      let yy = this.date.getFullYear();
      return yy + "-" + mm + "-" + dd;
    },
    types() {
      let arr = [];
      let res = "";
      this.parcelTypesSelected.forEach((item) => {
        arr.push(item.id);
      });
      if (arr.length > 1) {
        res = "documents baggage";
      } else if (arr[0] === 0) {
        res = "documents";
      } else if (arr[0] === 1) {
        res = "baggage";
      } else {
        res = "";
      }
      return res;
    },
    params() {
      return {
        city_from:
          this.direction === "From" ? "dubai" : this.city.toLowerCase(),
        city_to: this.direction === "To" ? "dubai" : this.city.toLowerCase(),
        travel_date: this.formattedDate,
        parcel_type: this.types,
        baggage_weight: this.weight.length > 0 ? Number(this.weight) : 0,
      };
    },
  },
  methods: {
    ...mapActions("cities", ["getCityFrom", "getCityTo"]),
    ...mapActions("transportations", ["getTransportation"]),
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
    chooseCity(e) {
      if (this.city === e) {
        this.city = "";
      } else {
        this.city = e;
      }
    },
    onSubmit() {
      console.log(this.params);
      const stringifiedParams = stringify(this.params);
      const apiUrlWithParams = `${stringifiedParams}`;
      this.getTransportation(apiUrlWithParams).then(() => {
        window.localStorage.removeItem("send");
        this.formShow = !this.formShow;
      });
    },
  },
  mounted() {
    this.getCityTo();
    this.getCityFrom();
    this.history = JSON.parse(window.localStorage.getItem("send"));
    if (this.history?.city_from === "dubai") {
      this.direction = "From";
      this.city = this.history?.city_to;
    } else if (this.history?.city_to === "dubai") {
      this.direction = "To";
      this.city = this.history?.city_from;
    }
    switch (this.history?.parcel_type) {
      case "documents baggage":
        this.parcelTypesSelected = [
          { id: 0, value: "Documents" },
          { id: 1, value: "Baggage" },
        ];
        break;
      case "documents":
        this.parcelTypesSelected = [{ id: 0, value: "Documents" }];
        break;
      case "baggage":
        this.parcelTypesSelected = [{ id: 1, value: "Baggage" }];
        break;
      default:
        this.parcelTypesSelected = [];
    }
    switch (this.history?.baggage_weight) {
      case 5:
        this.weight = "5";
        break;
      case 10:
        this.weight = "10";
        break;
      case 15:
        this.weight = "15";
        break;
      case 20:
        this.weight = "20";
        break;
      default:
        this.weight = "";
    }
    if (this.history?.travel_date) {
      this.date = new Date(this.history?.travel_date);
    }
  },
  updated() {
    window.localStorage.setItem("send", JSON.stringify(this.params));
  },
};
</script>

<style></style>
