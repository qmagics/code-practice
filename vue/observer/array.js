const oldArrayProto = Array.prototype;
const methods = [
    'push',
    'pop',
    'shift',
    'unshift',
    'sort',
    'reverse',
    'splice',
];

export const arrayMethods = Object.create(oldArrayProto);

methods.forEach(method => {
    arrayMethods[method] = function (...args) {
        console.log(`劫持道数组[${this}]的${method}方法,参数是:${args}`);

        oldArrayProto[method].call(this, ...args);

        let ob = this.__ob__;

        // 有新增元素的方法，需要特殊处理
        let inserted;
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice':
                inserted = args.slice(2);
            default:
                break;
        }

        if (inserted) ob.observeArray(inserted);

        // 触发更新
        ob.dep.notify();
    }
});