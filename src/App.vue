<template>
  <router-view/>
</template>

<style>
body {
  background-color: #2c3e50;
  font-family: "Roboto";
  color: #fff;
  font-size: 16px;
  line-height: 18px;
  font-weight: 300;
}
.container {
  display: block;
  max-width: 360px;
  margin: 0 auto;
}
.wrapper {
  padding: 0 5px;
}
h1{
  text-align: center;
  font-size: 22px;
  line-height: 24px;
  text-transform: uppercase;
  font-weight: 400;
  margin: 20px 0;
}

.img_block {
  width: 100%;
  text-align: center;
}
.img_block img{
  height: auto;
  margin-top: 75px;
  width: 60%;
}

.btns-wrapper {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 50px;
}
.link_button {
  display: inline-block;
  color: white;
  background-color: seagreen;
  padding: 10px 25px;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 20px;
  line-height: 20px;
  font-weight: 400;
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
  text-align: left;
  width: 100%;
}
.form-group select,
.form-group .v3dp__datepicker {
  max-width: 292px;
  width: 100%;
}
input,
select {
  border: 1px solid white;
  border-radius: 4px;
  width: 260px;
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
form p.right {
  font-size: 12px;
  text-align: right;
}
form select option,
form .city_input {
  text-transform: capitalize;
}

form .radio_input {
  width: 100%;
  display: block;
  margin: 5px 0;
}
form .custom_radio{
  position: absolute;
  z-index: -1;
  opacity: 0;
}

form .custom_radio+label {
  display: inline-flex;
  align-items: center;
  user-select: none;
}
form .custom_radio+label::before {
  content: '';
  display: inline-block;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid #adb5bd;
  border-radius: 0.25em;
  margin-right: 0.5em;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
}

form .custom_radio:checked+label::before {
  border-color: #0b76ef;
  background-color: #0b76ef;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
}

form .radio_input input {
  width: auto;
}

input::placeholder{
  color: rgba(255, 255, 255, 0.6);
}

p.info {
  border: 3px solid #0080005e;
  background-color: #7896b5;
  padding: 7px;
  border-radius: 3px;
}

.results .item{
  width: 100%;
  margin-bottom: 10px;
}
.results .item_info {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.results .item_info .city{
  text-transform: capitalize;
}
.results .item .type{
  width: 100%;
  font-size: 14px;
  line-height: 14px;
  text-align: left;
  padding-left: 15px;
  color: #a9a9a9;
}
.results .item a{
  font-size: 18px;
  text-transform: uppercase;
  color: darkseagreen;
  text-decoration: none;
}

label>span{
  color: darkgray;
  font-size: 14px;
}
</style>
