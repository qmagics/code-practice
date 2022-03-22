import { compileToFunction } from "./compiler";
import { mountComponent } from "./lifecycle";
import { initState } from "./state";

export function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        const vm = this;
        this.$options = options;

        // 对数据进行初始化 watch computed props data ... 数据劫持
        initState(vm);

        // 如果指定了el，则挂载组件
        if (options.el) {
            this.$mount(options.el);
        }
    }

    Vue.prototype.$mount = function (el) {
        const vm = this;
        const options = vm.$options;
        el = document.querySelector(el);
        vm.$el = el;

        if (!options.render) {
            let template = options.template || el.outerHTML;

            options.render = compileToFunction(template);
        }

        mountComponent(vm, el);
    }
}