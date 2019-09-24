var teacherId = 0;
export default teacherId;

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

class Talk {

  constructor(name, message, date, email, sender) {
    this.name = name;
    this.message = message;
    this.date = date;
    this.email = email;
    this.sender = sender
  }

}

export const store = new Vuex.Store({
  state: {
    authUser: "",
    value: [],
    valueAll:[],
    pageTimes: 0,
    counts: 0,
    teacherNumber: 0,
    loadedArray: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    apikey: "UMBUxUFV5w1afE1KbuGb3EjXAE2TmeR9Qo9vuFk8",
    config: {
      headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': "UMBUxUFV5w1afE1KbuGb3EjXAE2TmeR9Qo9vuFk8"
      }
    },
    talkListArray: [new Talk("優奈先生", "こんにちは", "9月22日 1 1:00","yuna@gmail.com"),new Talk("田中先生", "こんばんは", "9月22日　13:00", "tanaka@gmail.com")],
    talkDetailArray: [new Talk("優奈先生", "こんにちは", "9月22日 13:01","yuna@gmail.com","mymessage"),new Talk("田中先生", "こんばんは", "9月22日 13:02", "tanaka@gmail.com","yourmessage")]
  },
  mutations: {
    increment: state => state.count++,
    register (state, value) {   
      state.value = value
    },
    resetArray(state) {
      //初期化しないと戻った時に困る
      state.loadedArray.splice(0);
      state.loadedArray.push(0);
      state.loadedArray.push(0);
      state.loadedArray.push(0);
      state.loadedArray.push(0);
      state.loadedArray.push(0);
      state.loadedArray.push(0);
      state.loadedArray.push(0);
      state.loadedArray.push(0);
      state.loadedArray.push(0);
      state.loadedArray.push(0);
    },
    registerAll(state, value) {
     
      state.counts = value.length;
      state.valueAll.splice(0)
      //　配列の長さを帰るときはsetなどを使う必要があったかな
      for (var i = 0; i < value.length; i++) {
        
        state.valueAll.push({"nickName": value[i]["nickName"],"able": value[i]["able"],"money": value[i]["money"],"live": value[i]["live"],"comments": value[i]["comments"],"email": value[i]["email"]})
      }

      // state.valueAll = value
    },
    addpage(state) {
      state.pageTimes++;
    },
    saveTeacherNumber(state, number) {
      state.teacherNumber = number;
      state.loadedArray.splice(0);
      state.loadedArray.push(0);
      state.loadedArray.push(0);
      state.loadedArray.push(0);
      state.loadedArray.push(0);
      state.loadedArray.push(0);
      state.loadedArray.push(0);
      state.loadedArray.push(0);
      state.loadedArray.push(0);
      state.loadedArray.push(0);
      state.loadedArray.push(0);
    },
    addloaded(state,index) {
      //配列の書き方が違うね 配列の更新は全て完了しました
      state.loadedArray.splice(index,1,1);
      //一応増えていることは確認できた　問題は全て0にできるかだね　偶奇判定に持ち込むかむずい　
    },
    setMyemail: function(state, email) {
        state.authUser = email;
    },
    fetchDetail: function(state, email) {
      //stateのdetailArrayを操作する state.authUserを使いましょう　
    },
    sendMessage: function(state, email, message) {
      //メッセージを送信
    }
  }
})



