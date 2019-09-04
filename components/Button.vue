<template>
<button @click="countUp">{{message}} {{like}} </button>
</template>

<script lang="babel">
    export default {
        props: ["message"],
        data: function() {
            return {like: 0}
        },
        methods: {
            countUp: function() {
            this.like++
            this.$emit('inc');
            }
        }


    }

</script>