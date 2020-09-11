import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})


// 1. 测试加法
function add(num1, num2) {
  return num1 + num2
}
describe('unit_test_demo', () => {
  it('测试加法', () => {
    expect(add(1, 3)).toBe(7)
    expect(add(1, 3)).toBe(4)
    expect(add(-2, 3)).toBe(1)
  })
})