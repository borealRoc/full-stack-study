<template>
  <div class="my-input-comp">
    <!-- 双绑：:value @input -->
    <!-- v-bind会展开$attrs对象 -->
    <input :type="type" :value="value" @input="inputHandler" v-bind="$attrs"/>
  </div>
</template>

<script>
    export default {
        name: 'MyInput',
        // 让父元素不要继承属性
        inheritAttrs: false,
        props: {
            type: {
                type: String,
                default: 'text'
            },
            value: {
                type: String,
                default: ''
            },
        },
        methods: {
            inputHandler(e) {
                // 仅派发事件
                this.$emit('input', e.target.value)
                // 通知校验
                this.$parent.$emit('validate')
            },
        },
    }
</script>

<style lang="scss" scoped>
</style>