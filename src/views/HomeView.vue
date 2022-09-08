<template>
  <div class="container">
    <div class="wrapper">
      <h1>Please, choose below <br> what you want <br>to do with baggage</h1>
      <div class="btns-wrapper">
        <router-link class="link_button" :to="{name: 'transport'}">Transport</router-link>
        <router-link class="link_button send" :to="{name: 'send'}">Send</router-link>
      </div>
      <div class="img_block">
        <img src='@/assets/back.png' />
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>