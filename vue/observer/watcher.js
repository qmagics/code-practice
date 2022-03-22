import { pushTarget, popTarget } from './dep';
import { queueWatcher } from './scheduler';

let id = 0;

export class Watcher {
    constructor(vm, exprOrFn, cb, options) {
        this.vm = vm;
        this.exprOrFn = exprOrFn;
        this.cb = cb;
        this.options = options;
        this.lazy = !!options.lazy;
        this.dirty = !!options.lazy;
        this.user = !!options.user;
        this.deps = [];
        this.depsId = new Set();
        this.id = id++;

        if (typeof exprOrFn === 'function') {
            this.getter = exprOrFn;
        }
        else {
            this.getter = function () {
                return getValueByPath(vm, exprOrFn);
            }
        }

        this.value = this.lazy ? undefined : this.get();
    }

    addDep(dep) {
        const id = dep.id;
        if (!this.depsId.has(id)) {
            this.depsId.add(id);
            this.deps.push(dep);
            dep.addSub(this);
        }
    }

    get() {
        pushTarget(this);
        const value = this.getter.call(this.vm);
        popTarget();

        return value;
    }

    update() {
        if (this.lazy) {
            this.dirty = true;
        }
        else {
            // this.run();
            // 异步更新
            queueWatcher(this);
        }
    }

    run() {
        // console.log('run');
        this.get();
    }
}