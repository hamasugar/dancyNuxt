<template>
    <nav class="leftnavi" v-bind:class="showNavi">
        <div class="leftnavi__top" >
            <div class="icon">Dancy</div>
            <div class="close" @click="closeModal()" v-if="under700"></div>
        </div>
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
                under700: window.parent.screen.width <= 700
            }
        },
        computed: {
            showNavi() { return store.state.showNavi },
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
            },
            closeModal: function() {
                store.commit('toggleNavigation');
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
        transition: all 300ms 0s ease;
    }

    @media all and (max-width: 700px) {

        .shownavi {
            position: relative;
            right: 0px;
            z-index: 100;
        }

        .hidenavi {
            position: relative;
            right: 200px;
        }

        .leftnavi + div {
            width: calc(100% - 5px);
            position: fixed;
            top: 0;
            left: 0;
        }

    };

    .leftnavi__top {
        width: 190px;
        height: 40px;
        padding-left: 10px;
        margin-top: 10px; 
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .icon {
        color: white;
        font-weight: bold;
        font-size: 30px;
        display: inline-block;
    }

    .close {
        height: 40px; 
        width: 40px;
        background-color: white;
        display: inline-block;
    }

    .leftnavi__button {
        width: 190px;
        font-size: 16px;
        line-height: 40px;
        height: 40px;
        padding-left: 10px;
        margin-top: 10px;   
    }

    

    .leftnavi__button:hover{
        background-color: darkorange;
        font-weight: bold
    }


</style>