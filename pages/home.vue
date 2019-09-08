<template>
  
  <div class="container">
      <!-- <logo />
      <p>{{teacherNumber}}</p>
      <p v-if="total < 5">{{total}}</p>
      <like message="apple"  @inc="incrementTotal"/>
      <div></div>
      <button @click="incvuex">+</button>
      <p>{{ vuexx }}</p>
      <p>{{ counts }}</p> -->
      <!-- ここに表示されるものと下に表示されるものはワンテンポ遅れがある　こっちの方が遅れている リクエストでとってきたものが次の更新でpタグに入ってきている -->
      <!-- <p>{{datum2}}</p>
      <p>aaaa</p>
      <p>aaaa</p>
      <p>{{datum3}}</p>
      <p>aaaa</p>
      <p>aaaa</p>
      <p>{{datum4}}</p> -->
      <div class="label">
        <div class="label__top">講師一覧</div>
        <div class="label__triangle"></div>
      </div>

      <div class="buttons" >
        <button  class="buttons__button" v-for="j in 100" v-on:click = "changeTeacher(j-1)" v-if="datum && datum[j*10 -10]">{{j}}</button>
      </div>

      <div class="flexbox" v-if="datum">

          
          <div class="flexbox__teacherbox"  v-for="value in datum.slice(teacherNumber1 * 10, Math.min(teacherNumber1 * 10 + 10, countss))" >

            <div class="teacher">
                <!-- <nuxt-link to="next"> -->
                  <img class="teacher__img" v-bind:src="imgSrc(value['email'])" @click="goNext(value)">
                  <!-- <img class="teacher__img" src=""> -->
                  <p class="teacher__name">{{ value["nickName"] ? value["nickName"] + "先生" : "ゲスト講師"}}</p>
                  <p class="teacher__info">{{ '得意ジャンル:' + '\n'　 + value["able"] }}</p>
                  <p class="teacher__info">{{ 'レッスン料:' + value["money"] + "円/時" }}</p>
                  <p class="teacher__info">{{ "教える地域: " + "\n" + value["live"] }}</p>
                <!-- </nuxt-link> -->
            </div>
          </div>
          

      </div>


  </div>
      
      
</template>

<script>
import Logo from '~/components/Logo.vue'
import like from '~/components/Button.vue'
import {store} from '~/components/global.js'

//exportのタイミングが悪いのかなー Swiftよりも難しいな
var defaultObject = {
  components: {
    Logo,
    like
  },
  data: function() {
    return {
      total: 10,
      isFirstPage: true,
      noImage: false,
      vuex: 0,
      datum2: store.state,
      datum3: store.state.valueAll,
      datum4: store.state["valueAll"]

    }
  },
  // watch: {
  //   datum: function() {
  //     //JavaSctiptに使われるlocalStrageがあれば最強じゃないか　iOSと同じ仕組みが作れるのだ
  //     localStorage.setItem('datum', JSON.stringify(this.datum));
  //   }
  // },
  computed: {
    countss() { return store.state.counts },
    datum() { return store.state.valueAll },
    teacherNumber1() {return store.state.teacherNumber }
  },
  mounted() {

    var request = new XMLHttpRequest();
        
        request.this = this
        request.open('GET',"https://3l3lsb42w0.execute-api.us-east-2.amazonaws.com/dev/teachershosting");
        request.responseType = 'json';
        request.onload = function () {
          // request.this.datum = this.response
         
          const aaaaa = this.response["Count"]
          store.commit("registerAll",this.response["Items"])
        };

        // request.send();
        if (store.state.pageTimes == 0) {
          request.send();
        }
        
  },
  methods: {
      incrementTotal: function() {
        this.total++;
      },
      changeTeacher: function(i) {
        this.noImage = true;
        store.commit('saveTeacherNumber',i)
        setTimeout(this.falseImage, 200);
      },
      falseImage: function() {
        this.noImage = false;
      },
      goNext: function(value) {
          // this.$router.push('next/?email  ='+email);
          //URLに表示されてしまうので隠す方法を知りたいね　これ以外の方法はないのか 
          //確実にteacherNameはグローバルを参照している　ローカルではない　変更もしているのになぜかーーー
          //変更がされる前のaaaが次の画面から参照されている
          store.commit('addpage');
          store.commit('register',value);
          // store.commit('saveTeacherNumber',this.teacherNumber)
          // store.commit('registerAll',value);
          this.$router.push('detail');
          
      },
      imgSrc: function(email) {
        if (this.noImage) {
          return "/noImage.jpg";
        }
        else {
          return "https://3l3lsb42w0.execute-api.us-east-2.amazonaws.com/dev/getimage?email=" + email + ".jpg";

        }
      },
      incvuex: function() {
        store.commit('increment')
      }
      
  }
}
//exportを必ず後に書かなくてはいけないよ　これがないとrenderできないと言うエラーが出る
export default defaultObject


</script>

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
