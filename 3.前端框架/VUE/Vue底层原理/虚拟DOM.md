1. 什么是虚拟DOM
> 用JS对象描述一个DOM节点

2. 为什么要有虚拟DOM
> DOM很复杂，真正的DOM元素非常庞大，操作真实DOM非常耗费性能  
> 对比数据前后的状态，计算出哪些地方需要更新，尽可能少的操作DOM  
> 通过DOM-diff算法计算出需要更新的地方  

3. Vue中的虚拟DOM
> Vue中存在VNode类，通过VNode实例化出不同类型的虚拟DOM节点  
> VNode类型：`注释节点` `文本节点` `元素节点` `组件节点` `函数式组件节点` `克隆节点`  
> VNode作用：通过比较变化前后的VNode，进行DOM更新

4. DOM diff
- 以新的VNode为基准，改造旧的oldVNode使之成为跟新的VNode一样  
    创建节点：新的VNode中有而旧的oldVNode中没有，就在旧的oldVNode中创建。  
    删除节点：新的VNode中没有而旧的oldVNode中有，就从旧的oldVNode中删除。  
    更新节点：新的VNode和旧的oldVNode中都有，就以新的VNode为准，更新旧的oldVNode。

- 创建节点
```javascript
// 源码位置: /src/core/vdom/patch.js
function createElm (vnode, parentElm, refElm) {
    const data = vnode.data
    const children = vnode.children
    const tag = vnode.tag
    if (isDef(tag)) {
        vnode.elm = nodeOps.createElement(tag, vnode)   // 创建元素节点
        createChildren(vnode, children, insertedVnodeQueue) // 创建元素节点的子节点
        insert(parentElm, vnode.elm, refElm)       // 插入到DOM中
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text)  // 创建注释节点
      insert(parentElm, vnode.elm, refElm)           // 插入到DOM中
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text)  // 创建文本节点
      insert(parentElm, vnode.elm, refElm)           // 插入到DOM中
    }
}
```
![](https://vue-js.com/learn-vue/assets/img/2.02d5c7b1.png)
- 删除节点
```javascript
function removeNode (el) {
  const parent = nodeOps.parentNode(el) // 获取父节点
  if (isDef(parent)) {
    nodeOps.removeChild(parent, el) // 调用父节点的removeChild方法
  }
}
```
- 更新节点
    1. 如果VNode和oldNode均为静态节点
    2. VNode是文本节点
    3. VNode是元素节点
        1. 该节点包含子节点
        2. 该节点不包含子节点  
![](https://vue-js.com/learn-vue/assets/img/3.7b0442aa.png)    

5. 更新子节点
