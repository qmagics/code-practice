let queue = [];
let pending = false;

function timerFn(cb) {
    setTimeout(() => {
        cb();
    }, 0);
}

function flushQueue() {
    queue.forEach(cb => cb());
    pending = false;
}

export function nextTick(cb) {
    queue.push(cb);

    if (!pending) {
        timerFn(flushQueue);
        pending = true;
    }
}