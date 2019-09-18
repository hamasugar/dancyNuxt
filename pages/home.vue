<template>
  
  <div class="container">
      
      <div class="label">
        <div class="label__top">講師一覧</div>
        <div class="label__triangle"></div>
      </div>

      <buttons/>

      <div class="flexbox" v-if="datum">

          
          <div class="flexbox__teacherbox"  v-for="(value, index) in datum.slice(teacherNumber1 * 10, Math.min(teacherNumber1 * 10 + 10, countss))" >

            <div class="teacher" @click="goNext(value)">
                  <p>
                  <img class="teacher__img" v-bind:src="imgSrc(value['email'])" v-on:load="loaded(index)" alt="講師画像">
                  <img class="teacher__noimg" src="/noImage.jpg" v-if="loadedArray[index] == 0" alt="講師画像">
                  </p>

                  <p class="teacher__name">{{ value["nickName"] ? value["nickName"] + "先生" : "ゲスト講師"}}</p>
                  <p class="teacher__info">{{ '得意ジャンル:' + '\n'　 + value["able"] }}</p>
                  <p class="teacher__info">{{ 'レッスン料:' + value["money"] + "円/時" }}</p>
                  <p class="teacher__info">{{ "教える地域: " + "\n" + value["live"] }}</p>
            </div>
          </div>
          

      </div>
      <buttons/>
    
  </div>
      
</template>

<script>
import Logo from '~/components/Logo.vue'
import like from '~/components/Button.vue'
import {store} from '~/components/global.js'
import buttons from '~/components/TeacherButtons.vue'

//exportのタイミングが悪いのかなー Swiftよりも難しいな
var defaultObject = {
  components: {
    Logo,
    like,
    buttons
  },
  data: function() {
    return {
  
    }
  },
  computed: {
    countss() { return store.state.counts },
    teacherNumber1() {return store.state.teacherNumber },
    loadedArray() {return store.state.loadedArray },
    datum() { return store.state.valueAll },
  },
  mounted() {

    var request = new XMLHttpRequest();
        
        request.this = this
        request.open('GET',"https://3l3lsb42w0.execute-api.us-east-2.amazonaws.com/dev/teachershosting");
        request.responseType = 'json';
        request.onload = function () {
         
          var result = this.response["Items"];
          result.sort(function(a,b){
              if(a["score"] > b["score"]) return -1;
              if(a["score"] < b["score"]) return 1;
              return 0;
          });       
          store.commit("registerAll",result)
        };

        // request.send();
        if (store.state.pageTimes == 0) {
          request.send();
        }
        
  },
  methods: {
      goNext: function(value) {
          // this.$router.push('next/?email  ='+email);
          //URLに表示されてしまうので隠す方法を知りたいね　これ以外の方法はないのか 
          //確実にteacherNameはグローバルを参照している　ローカルではない　変更もしているのになぜかーーー
          //変更がされる前のaaaが次の画面から参照されている
          store.commit('addpage');
          store.commit('register',value);
          this.$router.push('../detail');
          
      },
      imgSrc: function(email) {
        
          return "https://3l3lsb42w0.execute-api.us-east-2.amazonaws.com/dev/getimage?email=" + email + ".jpg";
      },
      incvuex: function() {
        store.commit('increment')
      },
      loaded: function(index) {
        console.log(index);
        //noImageの画像で一回呼ばれているから2回に見えるだけ indexを取得したのでやっていこう
        store.commit('addloaded', index)
      }
      
  }
}
//exportを必ず後に書かなくてはいけないよ　これがないとrenderできないと言うエラーが出る
export default defaultObject
</script>

<style>
.container {
  margin: 0 auto;
  width: 100%;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
