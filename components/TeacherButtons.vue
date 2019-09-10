<script>

import {store} from '~/components/global.js'

export default {
    computed: {
        datum() { return store.state.valueAll },
        teacherNumber() {return store.state.teacherNumber },
    },
    methods: {
        changeTeacher: function(i) {
            if (this.teacherNumber == i) {
                return
            }
            store.commit('saveTeacherNumber',i)
        }
    }
    
}
</script>

<template>
  <div class="buttons" >
        <button  class="buttons__button" v-for="j in 10" v-on:click = "changeTeacher(j-1)" v-if="datum && datum[j*10 -10]" >{{j}}</button>
  </div>
</template>