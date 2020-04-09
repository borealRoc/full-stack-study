<template>
  <div class="slot-comp">
    <!-- 作用域插槽 -->
    <slot name="header" slotHeaderProp="温馨提示"></slot>
    <!-- 匿名插槽 -->
    <slot></slot>
    <!-- 具名插槽 -->
    <slot name="footer" :slotFooterProp="footerTitle"></slot>
  </div>
</template>

<script>
export default {
  name: "PopupSlot",
  data() {
      return {
          footerTitle: {
              confirm: '确定',
              cancel: '取消',
          }
      }
  },
};
</script>

<style>
.slot-comp {
  width: 80%;
  margin: 20px auto;
  border-radius: 8px;
  text-align: center;
  border: solid 1px #999;
}
</style>