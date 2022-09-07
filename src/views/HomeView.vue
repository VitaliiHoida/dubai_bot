<template>
  <div class="container">
    <div class="wrapper">
      <h1>Please, choose below what you want to do with baggage</h1>
      <div class="btns-wrapper">
        <router-link class="link_button" :to="{name: 'transport'}">Transport</router-link>
        <router-link class="link_button send" :to="{name: 'send'}">Send</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.btns-wrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.link_button {
  display: inline-block;
  color: white;
  background-color: seagreen;
  padding: 10px 40px;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 20px;
  line-height: 20px;
  font-weight: 700;
  border-radius: 5px;
  margin: 0 5px;
}
.link_button.send {
  background-color: cadetblue;
}
.link_button:hover {
  transform: scale(1.05);
}
</style>