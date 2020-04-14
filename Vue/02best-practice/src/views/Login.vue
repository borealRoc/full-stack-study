<template>
    <div>
        <h2>用户登录</h2>
        <div>
            <input type="text" v-model="username"/>
            <el-button @click="login">登录</el-button>
            <el-button @click="logout">注销</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                username: 'admin'
            }
        },
        methods: {
            login() {
                this.$store.dispatch('user/login', {username: this.username})
                .then(() => {
                    this.$router.push({
                        path: this.$route.query.redirect || '/'
                    })
                }).catch(e => alert(e))
            },
            logout() {
                const ret = this.$store.dispatch("user/resetToken")
                if (ret) {
                    this.$message('注销成功');
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>