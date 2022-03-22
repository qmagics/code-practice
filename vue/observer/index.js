import { isArray, isObject } from "../utils";
import { arrayMethods } from "./array";
import { Dep } from "./dep";

export class Observer {
    constructor(data) {

        this.dep = new Dep();

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

function dependArray(value) {
    value.forEach(item => {
        // 这里的item可能是数组里面的数组 [ [ [], [] ], [] ]
        item.__ob__ && item.__ob__.dep.depend();

        // 递归
        if (isArray(item)) {
            dependArray(item)
        }
    })
}

// 定义响应式，核心就是使用 Object.defineProperty
function defineReactive(data, key, value) {
    const childOb = observe(value);

    const dep = new Dep();

    Object.defineProperty(data, key, {
        get() {
            console.log(`取值：${key}`);
            if (Dep.target) {
                dep.depend();

                // value可能是数组或对象，对象也要收集以来，后续$set方法需要触发它自己的更新操作
                if (childOb) {
                    // 让数组和对象也记录watcher
                    childOb.dep.depend();

                    // 外层数组取值时，需要将数组内部属性也进行依赖收集，因为内层数组或对象变化，也要触发该watcher更新
                    if (isArray(value)) {
                        dependArray(value);
                    }
                }
            }
            return value;
        },
        set(newVal) {
            if (newVal !== value) {
                console.log(`给${key}设置新值:${newVal}`);
                observe(newVal);
                value = newVal;
                dep.notify();
            }
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