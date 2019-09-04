<template>
  
  <div class="container">
      <logo />
      <p>{{teacherNumber}}</p>
      <p v-if="total < 5">{{total}}</p>
      <like message="apple"  @inc="incrementTotal"/>
      <div></div>
      <button @click="incvuex">+</button>
      <p>{{ vuexx }}</p>

      <div class="label">
        <div class="label__top" v-on:click="loadTeacher()">講師一覧</div>
        <div class="label__triangle"></div>
      </div>

      
      

      <div class="buttons" >
        <button  class="buttons__button" v-for="j in 100" v-on:click = "changeTeacher(j-1)" v-if="datum['Items'] && datum['Items'][j*10 -10]">{{j}}</button>
      </div>

      <div class="flexbox" v-if="datum['Items']">

          
          <div class="flexbox__teacherbox"  v-for="value in datum['Items'].slice(teacherNumber * 10, Math.min(teacherNumber * 10 + 10, count))" >

            <div class="teacher">
                <!-- <nuxt-link to="next"> -->
                  <img class="teacher__img" v-bind:src="imgSrc(value['email'])" @click="goNext(value['email'])">
                  <!-- <img class="teacher__img" src=""> -->
                  <p class="teacher__name">{{ value["nickName"] ? value["nickName"] + "先生" : "ゲスト講師"}}</p>
                  <p class="teacher__info">{{ '得意ジャンル:' + '\n'　 + value["able"] }}</p>
                  <p class="teacher__info">{{ value["money"] + "円/時" }}</p>
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
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    count: 0,
    email: ""
  },
  mutations: {
    increment: state => state.count++,
    registerEmail (state, email) {
      state.email = email
    }
  }
})


//exportのタイミングが悪いのかなー Swiftよりも難しいな
export default {
  components: {
    Logo,
    like
  },
  data: function() {
    return {
      teacherNumber: 0,
      total: 0,
      datum: [{'Items':[]}],
      isFirstPage: true,
      noImage: false,
      vuex: 0
    }
  },
  watch: {
    datum: function() {
      //JavaSctiptに使われるlocalStrageがあれば最強じゃないか　iOSと同じ仕組みが作れるのだ
      localStorage.setItem('datum', JSON.stringify(this.datum));
    }
  },
  computed: {
      
      vuexx() {
	      return store.state.count
      }
  },
  methods: {
      countUp: function() {
        this.teacherNumber++;
      },
      incrementTotal: function() {
        this.total++;
      },
      changeTeacher: function(i) {
        this.noImage = true;
        this.teacherNumber = i;
        setTimeout(this.falseImage, 200);
      },
      falseImage: function() {
        this.noImage = false;
      },
      goNext: function(email) {
          // this.$router.push('next/?email  ='+email);
          //URLに表示されてしまうので隠す方法を知りたいね　これ以外の方法はないのか 
          //確実にteacherNameはグローバルを参照している　ローカルではない　変更もしているのになぜかーーー
          //変更がされる前のaaaが次の画面から参照されている
          store.commit('registerEmail',email)
          this.$router.push({ path: 'next', query: { email: email } });
          
      },
      imgSrc: function(email) {
        if (this.noImage) {
          return "sample.png"
        }
        else {
          return "https://3l3lsb42w0.execute-api.us-east-2.amazonaws.com/dev/getimage?email=" + email + ".jpg";

        }
      },
      incvuex: function() {
        store.commit('increment')
      },
      loadTeacher: function() {
        console.log("load");
        //無理やりにでもthisを渡すことで関数内でもthisを使えるようにしましたよ
        var request = new XMLHttpRequest();
        request.key = this

        request.open('GET',"https://3l3lsb42w0.execute-api.us-east-2.amazonaws.com/dev/teachershosting");
        request.responseType = 'json';
        request.onload = function () {
          console.log(this.response);
          console.log(this);
          request.key.datum = this.response
          request.key.count = this.response["Count"]
        };
        request.send();
      }
      
  }
}


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
