import { nextTick } from "../utils/nextTick";

let queue = [];
let has = {};
let pending = false;

function flushQueueWatcher() {
    queue.forEach(watcher => {
        watcher.run();
    });

    pending = false;
    queue = [];
    has = {};
}

// 等待同步代码都执行完毕后 批量处理watcher更新
export function queueWatcher(watcher) {
    const id = watcher.id;

    if (!has[id]) {
        has[id] = true;
        queue.push(watcher);

        if (!pending) {
            // setTimeout(() => {
            //     flushQueueWatcher();
            // }, 0);
            nextTick(flushQueueWatcher);
            pending = true;
        }
    }
}