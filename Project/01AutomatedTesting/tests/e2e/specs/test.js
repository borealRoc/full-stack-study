// https://docs.cypress.io/api/introduction/api.html

describe('端到端测试，抢测试⼈员的饭碗', () => {
  it('先访问⼀下', () => {
    cy.visit('/')
    // cy.contains('h1', 'Welcome to Your Vue.js App')
    cy.contains('#message', '端到端测试')
    cy.get('button').click()
    cy.contains('#message', '按钮点击')
  })
})
