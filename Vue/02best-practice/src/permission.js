// 全局路由守卫
import router from "./router";
import store from "./store";
import { getToken } from "@/utils/auth"; // 从cookie获取令牌

const whiteList = ["/login"];

router.beforeEach(async (to, from, next) => {
    // 获取令牌判断用户是否登录
    const hasToken = getToken();

    if (hasToken) {
        // 有token
        if (to.path === "/login") {
            next({ path: "/" });
        } else {
            //已登录, 获取用户角色
            const hasRoles = store.getters.roles && store.getters.roles.length > 0;
            if (hasRoles) {
                next();
            } else {
                try {
                    // 先请求获取用户信息
                    const { roles } = await store.dispatch("user/getInfo");
                    // 根据当前用户角色动态生成路由
                    const accessRoutes = await store.dispatch(
                        "per/generateRoutes",
                        roles
                    );
                    // 添加这些路由至路由器
                    router.addRoutes(accessRoutes);
                    // 继续路由切换，确保addRoutes完成
                    next({ ...to, replace: true });
                } catch (error) {
                    // 出错需重置令牌并重新登录（令牌过期、网络错误等原因）
                    await store.dispatch("user/resetToken");
                    Message.error(error || 'Has Error')
                    next(`/login?redirect=${to.path}`);
                }
            }
        }
    } else {
        // 没有token
        if (whiteList.indexOf(to.path) !== -1) {
            // 白名单
            next();
        } else {
            // 去登录页面附带本来要去的路径为redirect参数
            next(`/login?redirect=${to.path}`);
        }
    }
});