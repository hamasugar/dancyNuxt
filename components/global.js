var teacherId = 0;
export default teacherId;

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    value: [],
    valueAll:[],
    pageTimes: 0,
    counts: 0,
    teacherNumber: 0
  },
  mutations: {
    increment: state => state.count++,
    register (state, value) {
      state.value = value
    },
    registerAll(state, value) {
     
      state.counts = value.length;
      
      state.valueAll.splice(0)
      //　配列の長さを帰るときはsetなどを使う必要があったかな
      for (var i = 0; i < value.length; i++) {
        // this.$set(array, key, val);
        // Vue.set(state.valueAll, i, {});
        // Vue.set(state.valueAll[i],"nickName", value[i]["nickName"]);
        // Vue.set(state.valueAll[i],"able", value[i]["able"]);
        // Vue.set(state.valueAll[i],"money", value[i]["money"]);
        // Vue.set(state.valueAll[i],"live", value[i]["live"]);
        // Vue.set(state.valueAll[i],"comments", value[i]["comments"]);
        // Vue.set(state.valueAll[i],"email", value[i]["email"]);

        // this.$set(array, key, val);
        // Vue.set(state.valueAll, i, {"nickName": value[i]["nickName"],"able": value[i]["able"],"money": value[i]["money"],"live": value[i]["live"],"comments": value[i]["comments"],"email": value[i]["email"]});

        // state.valueAll.splice(i, 1, {"nickName": value[i]["nickName"],"able": value[i]["able"],"money": value[i]["money"],"live": value[i]["live"],"comments": value[i]["comments"],"email": value[i]["email"]})
        // state.valueAll[i].splice("nickName",1, value[i]["nickName"]);
        // state.valueAll[i].splice("money",1, value[i]["money"]);
        // state.valueAll[i].splice("live",1, value[i]["live"]);
        // state.valueAll[i].splice("comments",1, value[i]["comments"]);
        // state.valueAll[i].splice("email",1, value[i]["email"]);
        // state.valueAll.splice(i, 1, Object.assign({}, state.valueAll[i], {"nickName": value[i]["nickName"],"able": value[i]["able"],"money": value[i]["money"],"live": value[i]["live"],"comments": value[i]["comments"],"email": value[i]["email"]})) 
        state.valueAll.push({"nickName": value[i]["nickName"],"able": value[i]["able"],"money": value[i]["money"],"live": value[i]["live"],"comments": value[i]["comments"],"email": value[i]["email"]})
        // state.valueAll[i].push(value[i]["nickName"])
        // state.valueAll[i].push(value[i]["able"])
        // state.valueAll[i].push(value[i]["money"])
        // state.valueAll[i].push(value[i]["live"])
        // state.valueAll[i].push(value[i]["comments"])
        // state.valueAll[i].push(value[i]["email"])


      }

      // state.valueAll = value
    },
    addpage(state) {
      state.pageTimes++;
    },
    saveTeacherNumber(state, number) {
      state.teacherNumber = number;
    }
  }
})
