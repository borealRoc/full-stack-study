import * as Koa from 'koa'
import { get, post } from '../utils/decorator'


const users = [{ name: 'tom', age: 20 }]

export default class User {
    @get('/users')
    public async list(ctx: Koa.Context) {
        ctx.body = { ok: 1, data: users }
    }

    @post('/users')
    public add(ctx: Koa.Context) {
        users.push(ctx.request.body);
        ctx.body = { ok: 1 }
    }

}