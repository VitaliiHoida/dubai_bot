<template>
  <div class="container">
    <div class="wrapper">
      <div class="addit_btns">
        <a href="https://t.me/DP_4h_operatorBot">
          &#9742; Operator</a>
      </div>
      <h1>Please, choose below <br> what you want <br>to do with baggage</h1>
      <p class="info">To use this application, you must have a Telegram login</p>
      <div class="btns-wrapper">
        <router-link class="link_button send" :to="{name: 'send'}">Send</router-link>
        <router-link class="link_button" :to="{name: 'transport'}">Transport</router-link>
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