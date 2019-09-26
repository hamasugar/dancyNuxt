<template>
    <nav class="leftnavi">
        <div class="leftnavi__label" >Dancy</div>
        <div class="leftnavi__button" @click="goHome">講師一覧</div>
        <div class="leftnavi__button" @click="goQuestion">問い合わせ</div>
        <div class="leftnavi__button" @click="goTalk">トーク</div>
        <div class="leftnavi__button" @click="goLessons">レッスン一覧</div>
        <div class="leftnavi__button" @click="goProfile">プロフィール編集</div>
        <div class="leftnavi__button" @click="goLogin" v-if="!isLogin()">ログイン</div>
        <div class="leftnavi__button" @click="logout" v-if="isLogin()">ログアウト</div>
    </nav>
    
</template>

<script lang="babel">

import {store} from "~/components/global.js";


    export default {      
        data: function() {
            return {
            }
        },
        methods: {
            goHome: function() {
                this.$router.push('../home');
            },
            goQuestion: function() {
                this.$router.push('../question');
            },
            goTalk: function() {
                this.$router.push('../talk');
            },
            goLogin: function() {
                this.$router.push('../logincreate');
            },
            logout: function() {
                
                var res = confirm("ログアウトします　よろしいですか？");
                if( res == true ) {
                   store.state.authUser = ""
                   localStorage.removeItem("useremail")
                   sessionStorage.removeItem("useremail");
                   //ここでセッションストレージの処理をする
                   this.$router.push('../home');
                }
                else {
                }
            },
            goLessons: function() {

            },
            goProfile: function() {
                if (store.state.authUser) {
                    if (store.state.authUser != "") {
                        store.state.showprofileEdit = true
                    }
                }
            },
            isLogin: function() {
                if (store.state.authUser == "") {
                    return false
                }
                else {
                    return true
                }
            }
        }
    }
</script>

<style>

    .leftnavi {
        width: 200px;
        background-color: orange;
        display: inline-block;
        vertical-align: top;
        height: 100vh;
    }

    .leftnavi__button {
        width: 190px;
        font-size: 16px;
        line-height: 40px;
        height: 40px;
        padding-left: 10px;
        margin-top: 10px;   
    }

    .leftnavi__label {
        width: 190px;
        font-size: 30px;
        height: 40px;
        padding-left: 10px;
        margin-top: 10px; 
        color: white;
        font-weight: bold; 
    }

    .leftnavi__button:hover{
        background-color: darkorange;
        font-weight: bold
    }


</style>