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
    }
});

console.log(arrayMethods);