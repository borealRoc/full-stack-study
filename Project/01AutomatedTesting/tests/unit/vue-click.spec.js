import Vue from 'vue'
import TestClick from '@/components/TestClick.vue'
import { mount } from '@vue/test-utils'

describe('测试TestClick组件', () => {
    it('组件有created生命周期', () => {
        expect(typeof TestClick.created).toBe('function')
    })
    it('测试组件渲染', () => {
        let vm = new Vue(TestClick).$mount()
        expect(vm.message).toBe('mounted')
    })
    it('测试按钮点击', () => {
        const wrapper = mount(TestClick)
        wrapper.find('.test-btn').trigger('click')
        expect(wrapper.vm.message).toBe('clicked11!')
    })
})