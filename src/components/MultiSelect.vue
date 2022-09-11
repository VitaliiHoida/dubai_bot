<template>
  <div class="multiselect-wrapper"
       :class="{ 'open-dropdown': shown }"
  >
    <div class="select-wrapper">
      <!--  @click.stop - запрещает ивент клика по документу для сворачивания списка    -->
      <div class="select"
           readonly="readonly"
           @click.stop="show"
      >
        <div v-for="item in defaultValues"
             :key="item.id"
             class="item">
          {{ item.value }}
        </div>

        <input type="text"
               v-if="defaultValues.length === 0"
               v-model="search"
               placeholder="Tap to choose..."
               class="search-input"
               name="type"
               readonly
        />

      </div>
    </div>

    <div class="droped">
      <ul class="droplist">
        <li v-for="item in filteredList" :key="item.id" @click="choose(item)" :class="{'choosen': this.defaultValues.includes(item)}">
          <span> {{ item.value }} </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    defaultValues: Array,
    values: Array,
  },
  data() {
    return {
      shown: false,
      items: [],
      search: '',
    }
  },
  methods: {
    choose(e) {
      let value = e;
      this.show();
      this.$emit("choose-drop", value);
      this.search = '';
    },
    show() {
      this.shown = !this.shown;
    },
    result() {
      this.items.push(this.values.value);
    },
    deleteItem(e){
      this.choose(e);
    },
  },
  computed: {
    filteredList() {
      return this.values.filter( item => {
        return item.value.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  created() {
    /*сворачиваем дропдаун при клике в любой точке*/
    document.addEventListener('click', this.hide);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.hide);
  }
};
</script>

<style>

.multiselect-wrapper.open-dropdown .droped {
  border: 1px solid #fff;
  height: auto;
}

.multiselect-wrapper .droped{
  border: none;
  position: absolute;
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
  margin: 5px 0 0 0;
  width: auto;
  left: 0;
  right: 0;
  height: 0;
  z-index: 5;
}

.multiselect-wrapper ul {
  border: none;
  list-style: none;
  background-color: #fff;
  border-radius: 4px;
  padding: 0;
  overflow: hidden;
  width: auto;
  left: 0;
  right: 0;
  margin: 0;
}

.multiselect-wrapper ul li {
  line-height: 16px;
  font-size: 16px;
  padding: 10px 15px;
  color: #000;
}

.multiselect-wrapper ul li:hover {
  background-color: #0d6efd;
}

.multiselect-wrapper {
  position: relative;
  cursor: default;
  width: 292px;
  margin: 0 auto;
}

.select {
  display: flex;
  flex-wrap: wrap;
  min-height: 46px;
  border: 1px solid #FFF;
  border-radius: 4px;
}

.item{
  padding: 4px 8px;
  margin:5px;
  font-size: 16px;
  border-radius: 3px;
  background-color: mediumseagreen;
  display: flex;
  align-items: center;
}

.item-delete{
  font-size: 16px;
  margin: 0 5px;
  cursor: pointer;
}
.item-delete:hover{
  font-weight: bold;
}

.choosen{
  opacity:0.5;
}
.choosen:hover{
  background-color: #c1d6cc;
}

.search-input{
  width: 100%;
  border: none;
  border-radius: 0.375rem;
}

.search-input.positioned{
  padding: 5px 15px;
  border-bottom: 1px solid #4e555b;
  border-radius: unset;
}
.search-input.positioned:focus{
  outline: none;
}
</style>
