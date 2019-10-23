<template>
    <div class="container">
    <navigation/>

    <div class="talkList">
        <div class="talkList__top"><p>トーク一覧</p></div>
        <div class="talkList__item" v-for="(value, index) in talkListArray" @click="changeTalk(value.email, value.name)">
            <div class="itemImage">
            <img class="itemImage__face" src="noImage.jpg" alt="講師画像">
            </div>
            <div class="itemText">
                <p class="itemText__name">{{value.name}}</p>
                <p class="itemText__message">{{value.message}}</p>
            </div>        
        </div>
    </div>


    <div class="talkDetail">
        <div class="talkfixed">
            <p class="talkfixed__yourname">{{yourName}}</p>
            <button class="talkfixed__reserve" @click="reserve">新規予約</button>
        </div>
        <div v-bind:class="value.sender" v-for="(value, index) in talkDetailArray">
            <p v-bind:class="value.sender + '__text'">{{value.message}}</p>
            <p v-bind:class="value.sender + '__time'">{{value.date}}</p>
        </div>
        <div class="sendText">
            <input type="text" class="sendText__input"　v-model="inputMessage">
            <button class="sendText__button" @click="sendMessage(yourEmail)">送信</button>
        </div>    
    </div>
    <reserve :yourName = yourName v-if="showReserve"/>
    <profileEdit v-if="showprofileEdit"/>
    </div>
</template>

<script>

import {store} from "~/components/global.js";
import navigation from '~/components/Navi.vue'
import reserve from '~/components/Reserve.vue'
import profileEdit from '~/components/ProfileEdit.vue'


export default {
  components: {
      navigation,
      reserve,
      profileEdit,
  },
  data: function() {
    return {
        inputMessage: "",
        yourName: "",
        yourEmail: "",
    }
  },
  computed: {
    talkListArray() { return store.state.talkListArray },
    talkDetailArray() { return store.state.talkDetailArray },
    showReserve() { return store.state.showReserve },
    showprofileEdit() { return store.state.showprofileEdit }
  },
  watch: {
      talkDetailArray: {
        handler: function () {
            //本来はpushの数だけ呼ばれるはずではないか？ 全ての変更が終わった後にようやくこの関数が呼ばれている
            //　つまり描画される前にscrollが起きてしまっているのだ　すでに描画ずみの場合はうまくいっている
            console.log("変更");
            document.querySelectorAll('.talkDetail')[0].scrollTop = document.querySelectorAll('.talkDetail')[0].scrollHeight
        },
        deep: true
      },
      talkListArray: {
        handler: function () {
            if ( store.state.talkListArray[0].name && store.state.talkListArray[0].email) {
                this.yourName = store.state.talkListArray[0].name;
                this.yourEmail = store.state.talkListArray[0].email;
                store.commit('fetchDetail', store.state.talkListArray[0].email);
            }  
        },
        deep: true
      }
  },
  methods: {
      changeTalk: function(email, name) {
          this.yourEmail = email;
          this.yourName = name;
          store.state.talkDetailArray.splice(0)
          store.commit('fetchDetail',email);
      },
      sendMessage: function(youremail) {
          if (this.inputMessage == "") {
              console.log("テキストなし");
              return
          }
          console.log(this.inputMessage);
          const message = this.inputMessage;
          this.inputMessage = "";
          store.commit('sendMessage',{youremail: youremail, message: message});
          
      },
      reserve: function() {
          store.state.showReserve = true;
      }
  },
  mounted() {
      if (store.state.authUser == "") {
          this.$router.push('../logincreate');
          return
      }

      if (store.state.TalkViewCount > 0) {
        return
      }
        
        store.state.HomeViewCount+=1
        store.commit('fetchAllTalk');
  }
}
</script>

<style>
    body {
        width: 100%;
        margin: 0 auto;
    }

    .container {
    margin: 0 auto;
    width: 100%;
    font-size: 0;
    }

    .talkList {
        display: inline-block;
        width: 250px;
        height: 100vh;
        background-color: white;
        overflow-y: scroll;
    }

    .talkDetail {
        width: calc(100% - 455px);
        display: inline-block;
        height: calc(100vh - 150px);
        margin-top: 50px;
        vertical-align: top;
        background-color: lightcyan;
        overflow-y: scroll;
    }

    .talkList__top {
        font-size: 22px;
        margin: 10px;
    }

    .talkList__item {  
        height: 100px;
        width: 100%;
        margin: 0px auto;
        background-color: rgba(1, 1, 1, 0.05);;
        border-bottom: 1px black solid;
    }

    .talkList__item:hover {
        background-color: white;
    }

    .itemImage {
        display: inline-block;
        width: 30%;
        height: 100%;
        position: relative;
    }

    .itemText {
        display: inline-block;
        width: 65%;
        height: 100%;
        vertical-align: top;
        overflow: hidden;
    }

    .itemText__name {
        font-size: 16px;
        font-weight: 600;
        margin-top: 10px;
        margin-left: 10px;
    }

    .itemText__message {
        font-size: 12px;
        margin-top: 2px;
        margin-left: 10px;
        line-height: 1.5;
        height: 4.5em;
        overflow: hidden;
    }

    .itemImage__face {
        width: 80px;
        height: 80px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .talkfixed {
        position: fixed;
        width: calc(100% - 455px);
        top: 0;
        left: auto;
        height: 50px;
        background-color: white;
        border-bottom: 1px solid black;
        display: flex;
        justify-content: space-between;
    }

    .talkfixed__yourname {
        font-size: 30px;
        text-align: left;
        margin-left: 20px;
        line-height: 30px;
        padding: 10px;
        font-weight: bold;
    }

    .talkfixed__reserve {
        font-size: 20px;
        text-align: center;
        margin: 5px 20px;
        height: 40px;
        background-color: orange;
        color: white;
        font-weight: bold;
        border-radius: 5px;
    }

    .talkDetail__item {
        min-height: 100px;
        height: auto;
        width: 100%;
        margin: 0px auto;
        background-color: rgba(1, 1, 1, 0.1);;
        border-bottom: 1px black solid;

    }

    .yourmessage {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: auto;
        margin-top: 20px;
        align-items: flex-end;
        margin-bottom: 10px;
    }

    .mymessage {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        width: 100%;
        height: auto;
        margin-top: 20px;
        align-items: flex-end;
        margin-bottom: 10px
    }

    .mymessage__text {
        font-size: 16px;
        padding: 10px; 
        max-width: 70%;
        width: auto;
        border-radius: 10px;
        background-color: rgb(134, 227, 75);
    }

    .yourmessage__text {
        font-size: 16px;
        padding: 10px;
        border-radius: 10px;
        max-width: 70%;
        width: auto;
        margin-left: 20px;
        background-color: white;
    }

    .yourmessage__time {
        font-size: 5px;
        width: auto;
        margin-left: 5px;
    }

    .mymessage__time {
        font-size: 5px;
        width: auto;
        margin-left: 5px;
        margin-right: 20px;
    }

    .sendText {
        width: calc(100% - 455px);
        height: 100px;
        position: fixed;
        bottom: 0;
        left: auto;
        font-size: 0px;
        background-color: white;
    }

    .sendText__input {
        display: inline-block;
        background-color: rgba(1, 1, 1, 0.05);
        height: 40px;
        margin-top: 20px;
        width: 70%;
        margin-left: 10px;
        vertical-align: top;
        font-size: 20px;
    }

    .sendText__button {
        display: inline-block;
        background-color: orange;
        height: 50px;
        margin-top:15px;
        margin-left: 10px;
        width: 15%;
        font-size: 20px;
        text-align: center;
        line-height: 50px;
        vertical-align: top;
        border-radius: 10px;
        font-weight: bold;
    }

</style>

