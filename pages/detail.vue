<template>
  
  <div class="container">
      <p class="topname">{{nickName}}先生</p>
      <div class="leftside">
        <p>
        <img class="leftside__img" v-bind:src="imgSrc(remail)">
        </p>
       </div>
      <div class="rightside">
          <div class="info">
              <p class="info__key">ニックネーム</p>
              <p class="info__value">{{value["nickName"]}}</p>
          </div>
          <div class="info">
              <p class="info__key">レッスン料</p>
              <p class="info__value">{{value["money"] + "円/時"}}</p>
          </div>
          <div class="info">
              <p class="info__key">地域</p>
              <p class="info__value">{{value["live"]}}</p>
          </div>
          <div class="info">
              <p class="info__key">得意ジャンル</p>
              <p class="info__value">{{value["able"]}}</p>
          </div>
      </div>
      <p class="comment">{{value["comments"]}}</p>
      

      <div class="detailbuttons">
        <button class="detailbuttons__home" @click="favorite()"><nuxt-link to="/">ホームへ</nuxt-link></button>
        
        <button class="detailbuttons__favorite" @click="favorite()">あとで見る</button>
        <button class="detailbuttons__apply" @click="apply()" v-if="!isFavorited">話を聞いてみたい</button>
        <button class="detailbuttons__apply" @click="apply()" v-else>応募済み</button>

      </div>

  </div>

</template>

<style>
.container {
  margin: 0 auto;
  width: 100%;
}

.detailbuttons {
    display: flex;
    margin: 30px auto;
    width: 90%;
    height: 50px;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between; }

   

.detailbuttons__home {
      display: block;
      width: 30%;
      height: 50px;
      font-weight: bold;
      font-size: 20px;
      color: rgba(255, 136, 0, 0.8);
      border-radius: 25px;
      background-color: white;
      line-height: 50px;
      text-align: center;
      border: 2px solid rgba(255, 136, 0, 0.8);
}

.detailbuttons__home a:visited {
  color: rgba(255, 136, 0, 0.8);
  text-decoration: none
}

.detailbuttons__favorite {
      display: block;
      width: 30%;
      height: 50px;
      font-size: 20px;
      font-weight: bold;
      background-color: rgba(255, 136, 0, 0.8);
      border-radius: 25px;
      color: white;
      line-height: 50px;
      text-align: center; }

.detailbuttons__apply {
      display: block;
      width: 30%;
      font-size: 20px;
      height: 50px;
      font-weight: bold;
      background-color: rgba(255, 136, 0, 0.8);
      border-radius: 25px;
      color: white;
      line-height: 50px;
      text-align: center; }

  @media all and (max-width: 700px) {

    .detailbuttons > button {
      font-size: 4vw;
    }

   } 


</style>


<script>

import {store} from "~/components/global.js";


export default {
  data: function() {
    return {
      
    }
  },
  computed: {
      isFavorited() {
        if(true) {
          return true
        }
        else {
          return false
        }
      }
  },
  methods: {
      imgSrc: function(email) {
        return "https://3l3lsb42w0.execute-api.us-east-2.amazonaws.com/dev/getimage?email=" + email + ".jpg";
      },
      favorite: function() {
        //これはローカルストレージに保存しておきたい
      },
      apply: function() {
        //apiと連携する
      },
      httprequest: function(url,data) {
            console.log(url);
            var request = new XMLHttpRequest();
            request.open('POST', url);
            request.responseType = 'json';
            request.this = this
            request.onload = function () {
                request.this.modal = true
            };
            request.onerror = function() {
                alert("エラーが発生しました");
            }
            
            request.setRequestHeader('Content-Type', 'application/json' );
            request.setRequestHeader("X-Api-Key", store.state.apikey);
            
            request.send(JSON.stringify(data));
        }
  },
  asyncData(context) {
    //dataの代わりにこうするメリットって何だろう 少し早い段階になるな
      return {
        value: store.state.value,
        remail: store.state.value["email"],
        able: store.state.value["able"],
        nickName: store.state.value["nickName"]
    }
  },
  fetch({ redirect }) {
    console.log("detailをfetch")
    // if (store.state.authUser == "") {
    //   redirect(301, '/logincreate');
    // }
  },
  nuxtServerInit ({ commit }, { req }) {
    console.log("nuxtserverinit")
  }
}
</script>