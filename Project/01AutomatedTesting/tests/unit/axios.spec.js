import TestAxios from '@/components/TestAxios.vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import axios from 'axios'

// 模拟axios数据，所以我们要把请求拦截
jest.mock('axios')
// 临时Vue的实例
const localVue = createLocalVue()
localVue.prototype.$axios = axios

describe('axios 异步测试 ', () => {
    let wrapper

    // 每一个测试开始之前执行这个，主要做初始化
    beforeEach(() => {
        // 清除之前的mock
        axios.mockClear()
        // 初始化容器
        wrapper = shallowMount(TestAxios, {
            localVue,
            stubs: ['app-button']
        })
    })

    afterEach(() => {
        // 清理
        wrapper.destroy()
    })

    it('getData test', () => {
        // 获取假数据
        let mockData = { data: { name: 'xusp' } } // 假数据
        axios.get.mockResolvedValue(mockData)
        return wrapper.vm.getData().then(ret => {
            expect(ret).toEqual(mockData)
            expect(wrapper.vm.userInfo).toEqual({ name: 'xusp' })
        })
    })
})