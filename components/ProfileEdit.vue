<template>
    
<div class="dark" @click="closeModal">
    <div class="editmodal">
    
        <div class="fixed">
            <p class="fixed__title">プロフィール編集</p>
            <button class="fixed__save" @click="sendProfile">保存</button>
        </div>
        
        <div class="editmodal__contents">
            <div class="inputs">
                <p class="inputs__text">ニックネーム</p>
                <input type="text" class="inputs__input" v-model="nickName">
                <p class="inputs__text">年齢</p>
                <input type="number" class="inputs__input" v-model="age">
                <p class="inputs__text">地域</p>
                <input type="text" class="inputs__input" v-model="live">
                <p class="inputs__text">自己紹介</p>
                <input type="text" class="inputs__input" v-model="Comments">

            </div>   
        </div>
    </div>
</div>

</template>

<script lang="babel">

import {store} from "~/components/global.js";


    export default { 
        data: function() {
            return {
                nickName: "",
                age: "",
                live: "",
                Comments: "",
                bank: ""
            }
        },
        methods: {
            sendProfile: function() {
                var url = store.state.awsURL + "student";
                var jsondata = {}
                jsondata["email"] = store.state.authUser
                jsondata["nickName"] = this.nickName;
                jsondata["age"] = this.age;
                jsondata["live"] = this.live;
                jsondata["Comments"] = this.Comments;

                var data = JSON.stringify(jsondata)
                const response = this.$axios.$post(url, data, store.state.config)
                .then( response => {

                    if (response.errorMessage) {
                        alert(response.errorMessage)
                        return
                    }
                    alert("送信が完了しました")
                    store.state.showprofileEdit = false
                    
                    console.log("編集完了")
                   
                })
                .catch( error => {
                    alert(error)
                })
                

            },
            closeModal(event) {
                if (event.target.className == "dark") {
                    store.state.showprofileEdit = false
                }
                
            }
        },
        mounted() {
            //ここでプロフィールを取ってくることが必要 どのタイミングでマウントされるんだろう
            const url = store.state.awsURL + "student?email=" + store.state.authUser;
            const response = this.$axios.$get(url,store.state.config)
                .then( response => {
                    console.log(response);
                    this.nickName = response["nickName"]
                    this.age = response["age"]
                    this.live = response["live"]
                    this.Comments = response["Comments"]
                })
                .catch( error => {
                    console.log(error);
                })
        }
    }

</script>

<style>

.dark {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
}

.editmodal {
    background-color: white;
    height: 50%;
    width: 50%;
    border-radius: 20px;
    position: fixed;
    top: 10%;
    left: 25%;
    overflow-y: scroll;
}


.fixed {
    position: fixed;
    top: auto;
    left: auto;
    width: 50vw;
    height: 80px;
    z-index: 30;
    background-color: white;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
}

.fixed__title {
    font-size: 20px;
    font-weight: bold;
    display: inline-block;
    margin-left: 20px;
    padding-top: 20px;
}

.fixed__save {
    width: 20%;
    height: 40px;
    font-size: 20px;
    border-radius: 10px;
    color: white;
    background-color: orange;
    display: inline-block;
    margin: 20px 20px 0 auto;
    font-weight: bold;
}

.editmodal__contents {
    position: relative;
    top: 80px;
    z-index: 20;
}

.inputs__text {
    font-size: 10px;
    margin-left: 20px;
    margin-top: 20px;
    margin-bottom: 5px;
}

.inputs__input {
    height: 30px;
    margin-left: 20px;
    margin-right: 20px;
    width: calc(100% - 40px);
    background-color: beige;
    margin-bottom: 20px
}


</style>