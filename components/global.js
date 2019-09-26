import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from "vuex-persistedstate";

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
  plugins: [createPersistedState({
    key: 'useremail',
    paths: ['authUser'],
    storage: window.sessionStorage,
  })],
  state: {
    authUser: "",
    imTeacher: false,
    value: [],
    valueAll:[],
    pageTimes: 0,
    counts: 0,
    teacherNumber: 0,
    loadedArray: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    apikey: "UMBUxUFV5w1afE1KbuGb3EjXAE2TmeR9Qo9vuFk8",
    awsURL: "https://3l3lsb42w0.execute-api.us-east-2.amazonaws.com/dev/",
    config: {
      headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': "UMBUxUFV5w1afE1KbuGb3EjXAE2TmeR9Qo9vuFk8"
      }
    },
    talkListArray: [],
    talkDetailArray: [],
    HomeViewCount: 0,
    LessonViewCount: 0,
    TalkViewCount: 0,
    showprofileEdit: false,
  },
  mutations: {
    increment: state => state.count++,
    register (state, value) {   
      state.value = value
    },
    resetArray(state) {
      //初期化しないと戻った時に困る
      for (var i = 0; i < 10; i++) {
        state.loadedArray.push(0);
      }
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
      for (var i = 0; i < 10; i++) {
        state.loadedArray.push(0);
      }
    },
    addloaded(state,index) {
      //配列の書き方が違うね 配列の更新は全て完了しました
      state.loadedArray.splice(index,1,1);
      //一応増えていることは確認できた　問題は全て0にできるかだね　偶奇判定に持ち込むかむずい　
    },
    setMyemail: function(state, email) {
        state.authUser = email;
    },
    fetchDetail: function(state, youremail) {
      console.log("fetch")
      //stateのdetailArrayを操作する state.authUserを使いましょう　
      var url = "https://3l3lsb42w0.execute-api.us-east-2.amazonaws.com/dev/chat?" 
      url += "email1=" + state.authUser
      url +=  "&email2=" + youremail
      url += "&imTeacher=false"
      console.log(url);

      const response = axios.get(url, store.state.config)
          .then( response => {

              if (response.errorMessage) {
                  alert("エラーが発生しました");
                  return
              }

              const data = response.data;
              for (var i = 0; i < data.length; i++) {
                var sender = (data[i].isTeacher == state.imTeacher) ? "mymessage" : "yourmessage"
                
                var d = new Date(data[i].timeStamp * 1000);
                var formattedDate = (d.getMonth() + 1) + "/" + d.getDate();
                var hours = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
                var minutes = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
                var formattedTime = hours + ":" + minutes;

                formattedDate = formattedDate + " " + formattedTime;
                state.talkDetailArray.push( new Talk(data[i].teacherName,data[i].value, formattedDate, data[i].senderEmail, sender) )
                console.log("追加")
              }

          })
          .catch( error => {
              alert("エラーが発生しました")
          })
      
    },
    fetchAllTalk: function(state) {
      var url = "https://3l3lsb42w0.execute-api.us-east-2.amazonaws.com/dev/chat/scan?"
      url += "email=" + state.authUser
      url += "&timeStamp=0"

      const response = axios.get(url, store.state.config)
      .then( response => {

          if (response.errorMessage) {
              alert("エラーが発生しました");
              return
          }

          const data = response.data
          var recordObject = {}

          for (var i = 0; i < data.length; i++) {
            const youremail = (data[i].senderEmail == state.authUser) ? data[i].recieverEmail : data[i].senderEmail
            const yourname = (state.imTeacher) ? data[i].studentName : data[i].teacherName
            recordObject[youremail] = new Talk(yourname, data[i].value, data[i].timeStamp,youremail)
          }

          const listArray = Object.keys(recordObject).map(function (key) {return recordObject[key]})

          function compare(a, b) {        
            return (a.date > b.date) ? -1 : 1 ;
          }
          state.talkListArray = listArray.sort(compare)

        })
        .catch( error => {
            alert("エラーが発生しました")
        })
    },
    sendMessage: function(state, {youremail, message}) {
      //メッセージを送信
      var url = "https://3l3lsb42w0.execute-api.us-east-2.amazonaws.com/dev/chat";
      var date = new Date() ;
      var time1000 = date.getTime() ;
      var nowTimeStamp = Math.floor( time1000 / 1000 ) ;
      console.log(nowTimeStamp);
      console.log(message);

      var json = {"senderEmail": state.authUser, "recieverEmail": youremail, "isTeacher": state.imTeacher, "timeStamp": nowTimeStamp, "value": message};
      json["studentName"] = "タネピリカ"
      json["teacherName"] = "優奈先生"
      const parameter = JSON.stringify(json)
      console.log(parameter)

      const response = axios.post(url, parameter, store.state.config)
      .then( response => {
          if (response.errorMessage) {
              alert("エラーが発生しました");
              return
          }
          var d = new Date(nowTimeStamp * 1000);
          var formattedDate = (d.getMonth() + 1) + "/" + d.getDate();
          var hours = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
          var minutes = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
          var formattedTime = hours + ":" + minutes;
          console.log("push");
          formattedDate = formattedDate + " " + formattedTime;
          state.talkDetailArray.push( new Talk("優奈先生", message, formattedDate, state.authUser, "mymessage") )

          }
      )
      .catch( error => {
          alert("エラーが発生しました")
      })

    }
  }
})



