import Vue from './vue';

const vm = window.vm = new Vue({
    el: "#app",
    data: {
        name: "fxd",
        arr: [1, 2, 3, 4]
    }
});

setTimeout(() => {
    vm.name = 'qmagics';
    vm.name = '5';
    vm.name = '6';
    vm.name = '7';
    vm.name = '8';
    vm.name = 'qmagics';
    // vm.arr.push(5);

    vm.$nextTick(() => {
        console.log(vm.$el);
    });
}, 1000);