import { isObject } from './utils';
import { createElement, createTextElement } from './vdom';

export function renderMixin(Vue) {
    Vue.prototype._c = function () {
        return createElement(this, ...arguments);
    }

    Vue.prototype._v = function (text) {
        return createTextElement(this, text);
    }

    Vue.prototype._s = function (val) {
        return isObject(val) ? JSON.stringify(val) : val;
    }

    Vue.prototype._render = function () {
        const vm = this;
        const render = vm.$options.render;
        const vnode = render.call(vm);

        return vnode;
    }
}