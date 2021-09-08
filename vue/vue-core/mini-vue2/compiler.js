class Compiler {
  // 接收vue实例
  constructor (vm) {
    console.log('vm: ', vm)
    this.el = vm.$el
    this.vm = vm
    this.compile(vm.$el)
  }

  // 编译模板 处理文本节点和元素节点
  compile (el) {
    // 遍历el节点的子节点
    Array.from(el.childNodes).forEach(node => {
      // 子节点为元素节点
      if (this.isElementNode(node)) {
        this.compileElement(node)
      }
      // 子节点为文本节点
      if (this.isTextNode(node)) {
        this.compileText(node)
      }
      // 子节点还存在子节点
      if (node.childNodes && node.childNodes.length) {
        this.compile(node)
      }
    })
  }

  // 编译元素节点，处理指令
  compileElement (node) {}

  // 编译文本节点，处理插值表达式
  compileText (node) {
    console.log('node: ', node)
  }

  // 判断元素属性是否为指令
  isDirective (attrName) {
    return attrName.startsWith('v-')
  }

  // 判断节点是否是文本节点
  isTextNode (node) {
    return node.nodeType === 3
  }

  // 判断节点是否为元素节点
  isElementNode (node) {
    return node.nodeType === 1
  }
}
