var teacherId = 0;
export default teacherId;

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    myEmail: "",
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
    }
  },
  mutations: {
    increment: state => state.count++,
    register (state, value) {
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
      state.value = value
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
        state.myEmail = email;
    }
  }
})



