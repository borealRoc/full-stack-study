<template>
  <div class="my-popup" v-if="isShow">
    <div class="my-popup-bg"></div>
    <div class="my-popup-ctn">
      <p class="my-popup-ctt">
        <span class="inner-ctt">{{message}}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: ""
    },
    duration: {
      type: Number,
      default: 1000
    }
  },
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    show() {
      this.isShow = true;
      setTimeout(this.hide, this.duration);
    },
    hide() {
      this.isShow = false;
      this.remove();
    }
  }
};
</script>

<style lang="scss" scoped>
.my-popup {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  .my-popup-bg {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba($color: #000000, $alpha: 0.4);
  }
  .my-popup-ctn {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 600px;
    padding: 20px;
    transform: translate(-50%, -50%);
    background: rgba($color: #000000, $alpha: 0.8);
    border-radius: 16px;
    .my-popup-ctt {
      display: flex;
      min-height: 100px;
      align-items: center;
      justify-content: center;
      .inner-ctt {
        display: inline-block;
        text-align: left;
        font-size: 30px;
        line-height: 50px;
        color: #fff;
      }
    }
  }
}
</style>