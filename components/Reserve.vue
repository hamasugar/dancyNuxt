<template>
    
<div class="dark" @click="closeModal">
    <div class="reservemodal">
    
        <div class="fixed">
            <p class="fixed__title">新規予約({{yourName}})</p>
            <button class="fixed__save" @click="reserve">予約</button>
        </div>
        
        <div class="reservemodal__contents">
           <div class="inputs">
               <p class="inputs__text">レッスン料</p>
               <input type="number" class="inputs__input" v-model="money">
               <p class="inputs__text">スタジオ代他</p>
               <input type="number" class="inputs__input" v-model="money">
               <p class="inputs__text">日時</p>

            </div> 
        </div>
    </div>
</div>

</template>

<script lang="babel">

import {store} from "~/components/global.js";

    export default {
        props: ['yourName'],
        data: function() {
            return {
                date: "",
                money: "",
                studio: "",
            }
        },
        methods: {
             reserve: function() {
                var url = store.state.awsURL + "lesson";
                var jsondata = {}
                jsondata["email"] = store.state.authUser
                jsondata["money"] = this.money;
                jsondata["studio"] = this.studio;
                sum = this.money + this.studio
               

                var data = JSON.stringify(jsondata)
                // const response = this.$axios.$post(url, data, store.state.config)
                // .then( response => {

                //     if (response.data.errorMessage) {
                //         alert(response.data.errorMessage)
                //         return
                //     }
                //     alert("送信が完了しました")
                //     store.state.showprofileEdit = false
                    
                //     console.log("編集完了")
                   
                // })
                // .catch( error => {
                //     alert(error)
                // })

                alert("予約が完了しました")
                

            },
            closeModal(event) {
                if (event.target.className == "dark") {
                    store.state.showReserve = false
                }
                
            }
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

.reservemodal {
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

.reservemodal__contents {
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