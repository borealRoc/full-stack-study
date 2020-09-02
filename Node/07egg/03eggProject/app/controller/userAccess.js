const Controller = require('egg').Controller
/**
 * @Controller ⽤户鉴权
 */
class UserAccessController extends Controller {
    constructor(ctx) {
        super(ctx)
    }/**
 * @summary ⽤户登⼊
 * @description ⽤户登⼊
 * @router post /auth/jwt/login
 * @request body loginRequest *body
 * @response 200 baseResponse 创建成功
 */
    async login() {
        const { ctx, service } = this
        // 校验参数
        ctx.validate(ctx.rule.loginRequest);
        // 组装参数
        const payload = ctx.request.body || {}
        // 调⽤ Service 进⾏业务处理
        const res = await service.userAccess.login(payload)
        // 设置响应内容和响应状态码
        ctx.helper.success({ ctx, res })
    }
    /**
    * @summary ⽤户登出
    * @description ⽤户登出
    * @router post /auth/jwt/logout
    * @request body loginRequest *body
    * @response 200 baseResponse 创建成功
    */
    async logout() {
        const { ctx, service } = this
        // 调⽤ Service 进⾏业务处理
        await service.userAccess.logout()
        // 设置响应内容和响应状态码
        ctx.helper.success({ ctx })
    }
}
module.exports = UserAccessController