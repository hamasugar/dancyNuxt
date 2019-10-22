<template>
     <div class="menuButton" @click="toggleNavigation" v-if="under700">
       <div></div><div></div><div></div>
     </div>
</template>

<script lang="babel">

import {store} from "~/components/global.js";

export default {
    data: function() {
        return {
            under700: window.parent.screen.width <= 700
        }
    },
    methods: {
        toggleNavigation: function() {
            console.log("showclick");
            console.log(window.parent.screen.width);
            store.commit('toggleNavigation');   
        }
    }
}
</script>

<style>

.menuButton {
    position: fixed;
    top: 10px;
    left: 10px;
    height: 40px;
    width: 40px;
    display: inline-block;
    box-sizing: border-box;
    z-index: 900;
  }

  .menuButton div {
    height: 8px;
    width: 40px;
    background-color: #444;
    border-radius: 2px;
    display: inline-block;
    box-sizing: border-box;
  }
  
  .menuButton div:nth-of-type(2) {
    margin-top: 8px;
  }
  .menuButton div:nth-of-type(3) {
    margin-top: 8px;
  }

</style>