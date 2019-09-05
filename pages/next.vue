<template>
  
  <div class="container">
      <!-- <p>aa</p>
      <p>{{remail}}</p>
      <p>{{able}}</p>
      <p>{{nickName}}</p> -->
      <div class="leftside">
        <p class="leftside__name">{{nickName}}先生</p>
        <img class="leftside__img" v-bind:src="imgSrc(remail)">
       </div>
      <div class="rightside">
          <div class="info">
              <p class="info__key">アドレス</p>
              <p class="info__value">{{remail}}</p>
          </div>
          <div class="info">
              <p class="info__key">ニックネーム</p>
              <p class="info__value">{{value["nickName"]}}</p>
          </div>
          <div class="info">
              <p class="info__key">レッスン料</p>
              <p class="info__value">{{value["money"]}}</p>
          </div>
          <div class="info">
              <p class="info__key">地域</p>
              <p class="info__value">{{value["live"]}}</p>
          </div>
      </div>
      <p class="comment">{{value["comments"]}}</p>
      <nuxt-link to="/">ホームへ</nuxt-link>
  </div>

</template>

<style>
.container {
  /* margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center; */
  margin: 0 auto;
  width: 100%;
}
</style>


<script>

import {store} from "~/components/global.js";


export default {
  data: function() {
    return {
      
    }
  },
  methods: {
      imgSrc: function(email) {
        return "https://3l3lsb42w0.execute-api.us-east-2.amazonaws.com/dev/getimage?email=" + email + ".jpg";
      }
  },
  asyncData(context) {
      return {
      value: store.state.value,
      remail: store.state.value["email"],
      able: store.state.value["able"],
      nickName: store.state.value["nickName"]
    }
  }
}
</script>