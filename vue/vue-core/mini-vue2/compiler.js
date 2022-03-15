class Compiler {
  // 接收vue实例
  constructor(vm) {
    this.el = vm.$el;
    this.vm = vm;
    this.compile(vm.$el);
  }

  // 编译模板 处理文本节点和元素节点
  compile(el) {
    // 遍历el节点的子节点
    Array.from(el.childNodes).forEach(node => {
      // 子节点为元素节点
      if (this.isElementNode(node)) {
        this.compileElement(node);
      }
      // 子节点为文本节点
      if (this.isTextNode(node)) {
        this.compileText(node);
      }
      // 子节点还存在子节点
      if (node.childNodes && node.childNodes.length) {
        this.compile(node);
      }
    });
  }

  // 编译元素节点，处理指令
  compileElement(node) {
    Array.from(node.attributes).forEach(attr => {
      // 判断是否是指令
      if (this.isDirective(attr.name)) {
        // 指令的名
        const attrName = attr.name.substr(2);
        // 指令的值，即数data的key值
        const key = attr.value;
        this.update(node, key, attrName);
      }
    });
  }

  // 统一更新
  update(node, key, attrName) {
    const updateFn = this[attrName + "Updater"];
    // 调用指令处理函数并且传递data数据
    updateFn && updateFn.call(this, node, this.vm[key], key);
  }

  // 处理v-text指令
  textUpdater(node, value, key) {
    node.textContent = value;
    // 创建watch实例
    new Watch(this.vm, key, newValue => {
      node.textContent = newValue;
    });
  }

  // 处理v-model指令
  // TODO 没有实现数据的双向绑定
  modelUpdater(node, value, key) {
    node.value = value;
    // 创建watch实例
    new Watch(this.vm, key, newValue => {
      node.value = newValue;
    });
    // 注册事件input
    node.addEventListener("input", () => {
      this.vm[key] = node.value;
    });
  }

  // 编译文本节点，处理插值表达式
  compileText(node) {
    const reg = /\{\{(.*?)\}\}/g;
    reg.exec(node.textContent);
    let keyName = null;
    node.textContent = node.textContent.replace(reg, (match, key) => {
      keyName = key;
      return this.vm[key.trim()];
    });
    // 创建Watch类
    new Watch(this.vm, keyName, newValue => {
      node.textContent = newValue;
    });
  }

  // 判断元素属性是否为指令
  isDirective(attrName) {
    return attrName.startsWith("v-");
  }

  // 判断节点是否是文本节点
  isTextNode(node) {
    return node.nodeType === 3;
  }

  // 判断节点是否为元素节点
  isElementNode(node) {
    return node.nodeType === 1;
  }
}
