import { isArray, isObject } from "../utils";
import { arrayMethods } from "./array";

class Observer {
    constructor(data) {
        Object.defineProperty(data, '__ob__', {
            value: this,
            enumerable: false, // 不可枚举，防止__ob__属性被劫持，造成死循环
        });

        // 数组处理：1.重写(切片)该数组的变异方法 2.循环劫持数组每一项
        if (isArray(data)) {
            // 1
            Object.setPrototypeOf(data, arrayMethods);
            // 2
            this.observeArray(data);
        }
        // 对象，递归劫持每个属性
        else {
            this.walk(data);
        }
    }

    walk(data) {
        Object.keys(data).forEach(key => {
            defineReactive(data, key, data[key]);
        });
    }

    observeArray(data) {
        data.forEach(item => observe(item));
    }
}

// 定义响应式，核心就是使用 Object.defineProperty
function defineReactive(data, key, value) {
    observe(value);

    Object.defineProperty(data, key, {
        get() {
            console.log(`取值：${key}`);
            return value;
        },
        set(val) {
            console.log(`给${key}设置新值:${val}`);
            observe(val);
            value = val;
        }
    })
}

export function observe(data) {
    // 只有对象才观察
    if (!isObject(data)) return;

    // 观察过的直接返回原observer实例
    if (data.__ob__) return data.__ob__;

    // 创建观察者
    return new Observer(data);
}