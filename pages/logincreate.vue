<template>
    <div class="container">
        <navigation v-bind:class="showNavi"/>
            <div class="mainContents">
            <div class="logincontainer">
            <h1 class="loginLabel">
                {{topText}}
            </h1>

            <form v-on:submit.prevent="login">
            <div class="input">
                <p class="input__label">メールアドレス</p>
                <input type="text" class="input__email" v-model="email" name="email">
                <p class="input__label">パスワード</p>
                <input type="password" class="input__password" v-model="firstpassword" name="password">
                <p class="input__label" v-if="perpose=='register'">パスワード(確認)</p>
                <input type="password" class="input__password" v-model="secondpassword" v-if="perpose=='register'">
            </div>

            <div class="send">
                <p class="send__alert">{{alert}}</p> 
                <button type="submit" class="send__button--normal" v-if="perpose=='register'">会員登録</button>
                <button type="submit" class="send__button--normal" v-if="perpose=='login'">ログイン</button>
                <div class="send__button--change" v-if="perpose=='register'" @click="changePerpose('login')">ログイン画面へ</div>
                <div class="send__button--change" v-if="perpose=='login'" @click="changePerpose('register')">会員登録画面へ</div>
                <div class="send__button--change" v-if="person=='teacher'" @click="changePerson('student')">生徒として登録・ログイン</div>     
                <div class="send__button--change" v-if="person=='student'" @click="changePerson('teacher')">講師として登録・ログイン</div>     
            </div>
            </form>
            </div>

        </div>
     </div>

</template>

<script>
//storeにemailを保存して置かなければならぬ md5が使えるでしょうが
import {store} from '~/components/global.js'
import navigation from '~/components/Navi.vue'


export default {
    components: {
        navigation
    },
    data: function() {
        return {
            person: "teacher",
            perpose: "register",
            firstpassword: "",
            secondpassword: "",
            email: ""
        }
    },
    computed: {
        showNavi() { return store.state.showNavi },
        topText(){
            if (this.person=="teacher" && this.perpose=="register") {
                return "講師新規登録"
            }
            else if (this.person=="teacher" && this.perpose=="login") {
                return "講師ログイン"
            }
            else if (this.person=="student" && this.perpose=="register") {
                return "生徒新規登録"
            }
            else if (this.person=="student" && this.perpose=="login") {
                return "生徒ログイン"
            }
            else {
                return ""
            }

        },
        alert() {
            console.log(this.email.match(/^[A-Z0-9a-z_.-]+@{1}[A-Z0-9a-z_.-]+$/))
            if (this.email == "") {
                return "メールアドレスを入力してください";
            }
            else if (this.email.match(/^[A-Z0-9a-z_.-]+@{1}[A-Z0-9a-z_.-]+$/) == null) {
                return "メールアドレスを正しい形式で入力してください";
            }
            else if (this.firstpassword == "") {
                return "パスワードを入力してください";
            }
            else if (this.firstpassword.match(/^[A-Z0-9a-z]{5,20}$/) == null) {
                return "パスワードは半角英数字５文字以上20文字以下で入力してください";
            }
            else if (this.perpose == "register" && this.firstpassword != this.secondpassword) {
                return "パスワードが一致しません"
            }
            else {
                return "";
            }
        },
        awsURL() {
            if (this.perpose=="register" && this.person=="teacher") {
                return "https://3l3lsb42w0.execute-api.us-east-2.amazonaws.com/dev/teacher/create"
            }
            else if (this.perpose=="login" && this.person=="teacher") {
                return "https://3l3lsb42w0.execute-api.us-east-2.amazonaws.com/dev/teacher/login"
            }
            else if (this.perpose=="register" && this.person=="student") {
                return "https://3l3lsb42w0.execute-api.us-east-2.amazonaws.com/dev/student/create"
            }
            else if (this.perpose=="login" && this.person=="student") {
                return "https://3l3lsb42w0.execute-api.us-east-2.amazonaws.com/dev/student/login"
            }
            else {
                return "";
            }
        }
    },
    methods: {
        register: function() {

            if (this.alert != "") {
                console.log("アラートあり");
                return
            } 

            if (this.perpose=="register" && this.firstpassword != this.secondpassword) {
                return
            }
            var date = new Date();
            var time = date.getTime();
            const timeStamp = Math.floor( time / 1000 );

            var data = {"email": this.email, "password": MD5_hexhash(this.firstpassword), "timeStamp": timeStamp};
            this.httprequest(this.awsURL,JSON.stringify(data));
            
        },
        login: function() {
            console.log("login")
            //APIManegerを使った方がいい説が出てきたな
            if (this.alert != "") {
                console.log("アラートあり");
                return
            } 

            if (this.perpose=="register" && this.firstpassword != this.secondpassword) {
                return
            }
            //loginの場合はtimeStampを使う必要がない　最終ログインとか入れてもいいかも
            var data = {"email": this.email, "password": MD5_hexhash(this.firstpassword)};
            this.httprequest(this.awsURL,JSON.stringify(data))

        },
        changePerpose: function(purpose) {
            this.perpose = purpose;
        },
        changePerson: function(person) {
            this.person = person;
        },
        httprequest: function(url,data) {

            const response = this.$axios.$post(url, data, store.state.config)
            .then( response => {

                if (response.errorMessage) {
                    alert("パスワードが違います")
                    return
                }
                
                store.commit("setMyemail", this.email) ;
                //　ストアとセッションストレージは自動で連動されるらしい
                let localdata = {}
                localdata["authUser"]= this.email
                localStorage.setItem("useremail", JSON.stringify(localdata))
                this.email = "";
                this.firstpassword = "";
                this.secondpassword = "";
                this.$router.push('../home');
            })
            .catch( error => {
                alert("エラーが発生しました")
            })

        }
    },
    head() {
        return {
            bodyAttrs: {
                class: 'club'
            },
            script: [
                {
                src:
                    "http://www.onicos.com/staff/iz/amuse/javascript/expert/md5.txt"
                }
            ]
        }
    },
    mounted() {
        
    }
}
</script>

<style>

body {
    width: 100%;
    margin: 0 auto;
}

.container {
    width: 100%;
    margin: 0 auto;
    font-size: 0px;
}

.mainContents {
    display: inline-block;
    width: calc(100% - 202px)
}

.logincontainer {
  
  margin: 0 auto;
  width: 450px;
  background-color: white;
  border-radius: 20px;
  margin-top: 30px;
  padding: 10px 0px;
}

.club {
    background-image: url('/club.jpg');
    background-size: cover;
}

/* @media all and (max-width: 700px) {
    .logincontainer {
        width: 90%
    }
} */


.loginLabel {
    width: 90%;
    margin: 20px auto;
    font-size: 25px;
}

.input {
    width: 90%;
    margin: 20px auto;
}

.input__label {
    width: 100%;
    text-align: left;
    font-size: 15px;
    margin-bottom: 2px;
}

.input__email {
    display: block;
    width: 100%;
    height: 40px;
    margin-bottom: 25px;
    outline: 0;
    border: 1px solid gray;
    border-radius: 5px;
    font-size: 20px;
    background-color: rgb(1,1,1,0.05);
}

.input__email:focus {
    border: 2px solid orange;
}

.input__password {
    display: block;
    width: 100%;
    height: 40px;
    margin-bottom: 20px;
    outline: 0;
    border: 1px solid gray;
    border-radius: 5px;
    font-size: 20px;
    background-color: rgb(1,1,1,0.05);
}
.input__password:focus {
    border: 2px solid orange;
}

.send {
    width: 90%;
    margin: 20px auto;
}

.send__alert {
    font-size: 10px;
    color: red;
}

.send__button--normal {
    display: block;
    width: 100%;
    background-color: orange;
    color: white;
    font-size: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    text-align: center;
    border-radius: 10px;
}

.send__button--change {
    display: block;
    width: 100%;
    background-color: white;
    color: orange;
    font-size: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 20px;
    font-weight: bold;
    text-align: center;
    border: 1px solid orange;
    border-radius: 10px;
}

</style>