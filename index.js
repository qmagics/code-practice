import Vue from './vue';

const vm = window.vm = new Vue({
    el: "#app",
    data: {
        name: "fxd",
        arr: [1, 2, 3, 4]
    }
});

console.log(vm);
setTimeout(() => {
    vm.name = 'qmagics';
    vm.arr.push(5);
}, 1000);