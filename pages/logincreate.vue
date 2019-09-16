<template>
    <div class="container">
        <h2 class="loginLabel">
            {{topText}}
        </h2>

        <div class="input">
            <p class="input__label">メールアドレス</p>
            <input type="text" class="input__email" v-model="email">
            <p class="input__label">パスワード</p>
            <input type="password" class="input__password" v-model="firstpassword">
            <p class="input__label" v-if="perpose=='register'">パスワード(確認)</p>
            <input type="password" class="input__password" v-model="secondpassword" v-if="perpose=='register'">
        </div>
        <div class="send">
            <p class="send__alert">{{alert}}</p> 
            <div class="send__button--normal" v-if="perpose=='register'" @click="register()">会員登録</div>
            <div class="send__button--change" v-if="perpose=='register'" @click="changePerpose('login')">ログイン画面へ</div>
            <div class="send__button--normal" v-if="perpose=='login'" @click="login()">ログイン</div>
            <div class="send__button--change" v-if="perpose=='login'" @click="changePerpose('register')">会員登録画面へ</div>           
        </div>

     </div>

</template>

<script>
//storeにemailを保存して置かなければならぬ md5が使えるでしょうが
import {store} from '~/components/global.js'
export default {
    data: function() {
        return {
            person: "teacher",
            perpose: "register",
            firstpassword: "",
            secondpassword: "",
            email: "",
        }
    },
    computed: {
        topText(){
            if (this.person=="teacher" && this.perpose=="register") {
                return "講師用登録画面"
            }
            else if (this.person=="teacher" && this.perpose=="login") {
                return "講師用ログイン画面"
            }
            else if (this.person=="student" && this.perpose=="register") {
                return "生徒用ログイン画面"
            }
            else if (this.person=="student" && this.perpose=="login") {
                return "生徒用ログイン画面"
            }
            else {
                return ""
            }

        },
        alert() {
            if (this.email == "") {
                return "メールアドレスを入力してください";
            }
            else if (this.firstpassword == "") {
                return "パスワードを入力してください";
            }
            else if (this.perpose == "register" && this.firstpassword != this.secondpassword) {
                return "パスワードが一致しません"
            }
            else if (this.firstpassword.length < 5 ){
                return "パスワードは５文字以上で入力してください"
            }
            else {
                return "";
            }
        },
    },
    methods: {
        register: function() {

            if (this.alert == "") {
                console.log("アラートなし");
            } 
            else {
                console.log("アラートあり");
                return
            }

            if (this.perpose=="register" && this.firstpassword != this.secondpassword) {
                return
            }
            var awsURL = "";
            if (this.perpose=="register" && this.person=="teacher") {
                awsURL="https://3l3lsb42w0.execute-api.us-east-2.amazonaws.com/dev/teacher/create"
            }
            else if (this.perpose=="login" && this.person=="teacher") {
                awsURL="https://3l3lsb42w0.execute-api.us-east-2.amazonaws.com/dev/teacher/login"
            }
            else if (this.perpose=="register" && this.person=="student") {
                awsURL="https://3l3lsb42w0.execute-api.us-east-2.amazonaws.com/dev/student/create"
            }
            else if (this.perpose=="login" && this.person=="student") {
                awsURL="https://3l3lsb42w0.execute-api.us-east-2.amazonaws.com/dev/student/login"
            }
            else {
                return
            }

            console.log(MD5_hexhash("aaaaa"));//外部ライブラリをheadで読み込んでいる
            var data = {"email": this.email, "password": MD5_hexhash(this.firstpassword), "timeStamp": 0}
            var request = new XMLHttpRequest();
            request.open('POST', awsURL);
            request.responseType = 'json';
            request.this = this
            request.onload = function () {
                console.log("success");
                request.this.store.commit("setMyemail", this.email) ;
                request.this.email = "";
                request.this.firstpassword = "";
                request.this.secondpassword = "";  
                //ここで遷移とメールアドレスの登録を行いましょう             
            };
            request.onerror = function() {
                alert("エラーが発生しました")
            }
            
            request.setRequestHeader( 'Content-Type', 'application/json' );
            request.setRequestHeader( "X-Api-Key", store.state.apikey);
            request.send(JSON.stringify(data));
        },
        login: function() {
            //APIManegerを使った方がいい説が出てきたな

        },
        changePerpose: function(text) {
            this.perpose = text;
        }  
    },
    head() {
        return {
            script: [
                {
                src:
                    "http://www.onicos.com/staff/iz/amuse/javascript/expert/md5.txt"
                }
            ]
        }
    }
}
</script>

<style>
.container {
  margin: 0 auto;
  width: 560px;
}

@media all and (max-width: 700px) {
    .container {
        width: 80%
    }
}


.loginLabel {
    width: 100%;
    margin: 20px auto;
}

.input {
    width: 100%;
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
}

.send {
    width: 100%;
    margin: 20px auto;
}

.send__alert {
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
    border-radius: 5px;
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
    border-radius: 5px;
    border: 1px solid orange;
    border-radius: 10px;
}

</style>