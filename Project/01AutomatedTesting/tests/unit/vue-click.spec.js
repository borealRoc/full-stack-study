import Vue from 'vue'
import TestClick from '@/components/TestClick.vue'
import { mount } from '@vue/test-utils'
import { createWrapper } from '@vue/test-utils'

// 获取组件挂载的DOM节点
const wrapper = mount(TestClick)
// 获取组件的Vue实例
let vm = wrapper.vm

describe('测试TestClick组件', () => {
    it('测试组件初始data', () => {
        expect (typeof TestClick.data).toBe('function')
        const initial_data = TestClick.data()
        expect (initial_data.message).toBe('hello')
    })
    it('组件有created生命周期', () => {
        expect(typeof TestClick.created).toBe('function')
    })
    it('测试组件挂载后的data', () => {
        vm = vm.$mount()
        expect(vm.message).toBe('mounted')
    })
    it('测试按钮点击后的data', () => {
        wrapper.find('.test-btn').trigger('click')
        expect(vm.message).toBe('clicked')
    })
})