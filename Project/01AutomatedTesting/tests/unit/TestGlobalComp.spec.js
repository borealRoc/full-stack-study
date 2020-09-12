import Vue from 'vue'
import TestGlobalComp from '@/components/TestGlobalComp.vue'
import { shallowMount } from '@vue/test-utils'

describe('全局组件测试', () => {
    it('测试props', () => {
        const props = {
            disabled: true
        }
        const wrapper = shallowMount(TestGlobalComp, {
            propsData: props,
        })
        expect(wrapper.props().disabled).toBe(true)
    })

    // 如何测试click实，使用mockFFn 来监听执行次数
    it('测试$emit', () => {
        const wrapper = shallowMount(TestGlobalComp)
        // mock函数
        const mockFn = jest.fn()
        wrapper.setMethods({
            onClick: mockFn
        })
        const button = wrapper.find('.app-btn')
        button.trigger('click')
        // 被调用了
        expect(mockFn).toBeCalled()
        expect(mockFn).toHaveBeenCalledTimes(1)
        button.trigger('click')
        expect(mockFn).toHaveBeenCalledTimes(2)
    })

})