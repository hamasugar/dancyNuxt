<template>
  
  <div class="container">
    
    <navigation/>
      <div class="mainQuestion">
        <div class="form">
        <p class="form__text">お問い合わせ・要望内容</p>
        <textarea v-model="text" class="form__area"></textarea>
        <button class="form__button" @click="sendText()">送信</button>
        </div>
      </div>

      <div class="modal" v-if="modal">
        <p class="modal__title">お問い合わせが完了しました</p>
        <button class="modal__button" @click="closeModal()">閉じる</button>     
      </div>
      <menuButton/>
      <div class="bg" v-if="modal"></div>
      
  </div>
           
</template>

<style>
body {
  width: 100%;
  margin: 0 auto;
}

.container {
  margin: 0 auto;
  width: 100%;
  font-size: 0px;
}
</style>

<script>

import {store} from "~/components/global.js";
import navigation from '~/components/Navi.vue'
import menuButton from '~/components/MenuButton.vue'

export default {
  components: {
    navigation,
    menuButton
  },
  data: function() {
    return {
      text: "",
      modal: false
    }
  },
  methods: {
      sendText: function() {

          if (this.text == "") {
              return
          }
        
        var data = {"email": "guest@gmail.com", "value": this.text, "timeStamp": 0}
        var request = new XMLHttpRequest();
        console.log(data);
        request.open('POST',"https://3l3lsb42w0.execute-api.us-east-2.amazonaws.com/dev/question");
        request.responseType = 'json';
        request.this = this
        request.onload = function () {
            console.log("success");
            request.this.text = "";
            request.this.modal = true
        };
        request.onerror = function() {
            alert("エラーが発生しました")
        }
        
        request.setRequestHeader( 'Content-Type', 'application/json' );
        request.setRequestHeader( "X-Api-Key", store.state.apikey);
        request.send(JSON.stringify(data));

      },
      closeModal: function() {
          this.modal = false
      }

  },
  mounted() {
    console.log(localStorage.getItem("useremail"))
  }
}
</script>