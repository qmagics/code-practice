export function patch(oldVnode, vnode) {
    if (oldVnode.nodeType === 1) {
        const parentElm = oldVnode.parentNode;
        const elm = createElm(vnode);
        parentElm.insertBefore(elm, oldVnode.textSibling);
        parentElm.removeChild(oldVnode);

        return elm;
    }
}

function createElm(vnode) {
    const { tag, children, text } = vnode;

    if (typeof tag === 'string') {
        // 虚拟节点上挂载一个其对应的真是节点
        vnode.el = document.createElement(tag);
        children.forEach(child => {
            vnode.el.appendChild(createElm(child));
        })
    }
    else {
        vnode.el = document.createTextNode(text);
    }

    return vnode.el;
}