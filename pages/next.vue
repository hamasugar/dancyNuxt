<template>
  
  <div class="container">
      <p>aa</p>
      <p>{{email}}</p>
      <p>{{store2}}</p>
      <p>{{remail}}</p>
  </div>

</template>

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
</style>


<script>

import {store} from "~/pages/index.vue";


export default {
  data: function() {
    return {
      email : 'default ID'
    }
  },
  asyncData(context) {
      return {
      email: context.query['email'],
      store2: store.state.count,
      remail: store.state.email
    }
  }
}
</script>