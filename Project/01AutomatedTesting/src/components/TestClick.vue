<template>
<div>
  <h2>点击事件测试</h2>
  <span id="message">{{ message }}</span>

  <button class="test-btn" @click="changeMsg">哈哈</button>
  
</div>
</template>

<script>
  export default {
    data () {
      return {
        message: 'hello'
      }
    },
    methods:{
      changeMsg(){
        this.message = 'clicked'
      }
    },
    created () {
      this.message = 'created'
    },
    mounted () {
      this.message = 'mounted'
    }
  }
</script>