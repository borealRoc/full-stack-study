<template>
<div>
  <span id="message">{{ message }}</span>

  <button class="test-btn" @click="changeMsg">哈哈</button>
  
</div>
</template>

<script>
  export default {
    data () {
      return {
        message: 'hello!'
      }
    },
    methods:{
      changeMsg(){
        this.message = 'clicked!'
      }
    },
    created () {
      this.message = 'bye!'
    },
    mounted () {
      this.message = 'mounted'
    }
  }
</script>