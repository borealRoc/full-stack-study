<template>
  <div class="use-myform-view">
    <MyForm :model="model" :rules="rules" ref="myForm">
      <MyFormItem label="用户名" prop="username">
        <MyInput v-model="model.username" placeholder="请输入用户名"></MyInput>
      </MyFormItem>
      <MyFormItem label="密码" prop="password">
        <MyInput v-model="model.password" type="password" placeholder="请输入密码"></MyInput>
      </MyFormItem>
      <MyFormItem>
        <button @click="login">登录</button>
      </MyFormItem>
    </MyForm>
  </div>
</template>

<script>
import MyForm from "@/components/Form/MyForm.vue";
import MyFormItem from "@/components/Form/MyFormItem.vue";
import MyInput from "@/components/Form/MyInput.vue";
import MyPopup from "@/components/popup/MyPopup.vue";

export default {
  name: "UseMyForm",
  components: {
    MyForm,
    MyFormItem,
    MyInput
  },
  data() {
    return {
      model: { username: "", password: "" },
      rules: {
        username: [{ required: true, message: "请输入用户名" }],
        password: [{ required: true, message: "请输入密码" }]
      }
    };
  },
  methods: {
    login() {
      // 全局校验
      this.$refs["myForm"].validate(isValid => {
        const notice = this.$create(MyPopup, {
          message: isValid ? "登录成功" : "登录失败",
          duration: 2000
        })
        notice.show()
      });
    }
  }
};
</script>

<style>
.my-formitem-comp {
  padding-bottom: 20px;
  overflow: hidden;
}
.my-formitem-comp label {
  float: left;
  width: 80px;
}
.my-formitem-comp .my-input-comp {
  float: left;
}
.my-formitem-comp .err-tip {
  float: left;
  margin-left: 10px;
  color: #e00000;
}
</style>