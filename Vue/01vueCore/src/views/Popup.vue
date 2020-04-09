<template>
  <div class="slow-view">
    <h3 class="demo-title">插槽--弹窗实例</h3>
    <PopupSlot>
      <!-- 写法一 -->
      <template #header="slotProps">
        <h5 class="popup-tit">{{slotProps.slotHeaderProp}}</h5>
      </template>
      <p class="popup-ctt">您要提交吗？</p>
      <!-- 写法二 -->
      <template v-slot:footer="slotProps">
        <ul class="popup-footer">
          <li class="popup-footer-btn">{{slotProps.slotFooterProp.cancel}}</li>
          <li class="popup-footer-btn">{{slotProps.slotFooterProp.confirm}}</li>
        </ul>
      </template>
    </PopupSlot>
  </div>
</template>

<script>
import PopupSlot from "../components/Slot/PopupSlot.vue"
export default {
  name: "Popup",
  components: {
    PopupSlot
  },
};
</script>

<style>
.popup-tit {
  line-height: 40px;
  border-bottom: solid 1px #999;
}
.popup-ctt {
  line-height: 1.5;
  padding: 20px 0;
}
.popup-footer {
  display: flex;
  height: 40px;
  align-items: center;
  border-top: solid 1px #999;
}
.popup-footer-btn {
  flex: 1;
  height: 100%;
  line-height: 40px;
}
.popup-footer-btn:last-child {
  border-left: solid 1px #999;
  color: blue;
}
</style>