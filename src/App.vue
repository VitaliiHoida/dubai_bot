<template>
  <router-view/>
</template>

<style>
body {
  background-color: #2c3e50;
  font-family: 'Courier New';
  color: #fff;
  font-size: 18px;
  line-height: 20px;
}
.container {
  display: block;
  max-width: 360px;
  width: 100%;
  margin: 0 auto;
}
.wrapper {
  padding: 20px 15px;
  height: 100vh;
}
h1{
  text-align: center;
  font-size: 22px;
  line-height: 24px;
  text-transform: uppercase;
  font-weight: 500;
  margin: 20px 0;
}

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
  cursor: pointer;
}
.link_button.send {
  background-color: cadetblue;
}
.link_button:hover {
  transform: scale(1.05);
}

form, fieldset {
  border: none;
  width: 100%;
  padding: 0;
  margin: 0;
}
fieldset {
  margin: 0;
  padding: 0;
  margin-inline: 0;
  padding-inline: 0;
  padding-block: 0;
}
.form-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
}
.form-group label {
  margin-bottom: 10px;
}
.form-group select,
.form-group .v3dp__datepicker {
  width: 100% ;
}
input,
select {
  border: 1px solid white;
  border-radius: 4px;
  width: 298px;
  padding: 10px 15px;
  background: none;
  color: white;
  font-family: inherit;
  font-size: inherit;
}
input:focus-visible,
select:focus-visible {
  outline: none !important;
}
select>option {
  color: black;
}
.form-group.btn {
  display: flex;

}
.sbmt_btn {
  color: white;
  background-color: seagreen;
  padding:10px 20px;
  border:none;
  border-radius: 5px;
  margin-top: 15px;
  font-family: inherit;
}
.sbmt_btn:hover {
  transform: scale(1.05);
}
.sbmt_btn:disabled {
  background-color: grey;
  cursor: not-allowed;
}
.sbmt_btn:disabled:hover {
  transform: none;
}
form p {
  font-size: 12px;
  text-align: right;
}
</style>
