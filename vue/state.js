import { observe } from "./observer";
import { isFunction } from "./utils";

export function initState(vm) {

    const options = vm.$options;

    if (options.data) {
        initData(vm);
    }
}

function proxy(target, source) {
    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            Object.defineProperty(target, key, {
                get() {
                    return source[key];
                },
                set(val) {
                    source[key] = val;
                }
            })
        }
    }
}

function initData(vm) {
    let data = vm.$options.data;

    data = vm._data = isFunction(data) ? data.call(vm, vm) : data;

    proxy(vm, vm._data);

    observe(data);
}