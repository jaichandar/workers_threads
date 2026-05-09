const { parentPort, workerData } = require('worker_threads');

let total = 0;

for (let i = 0; i < 10000000000/workerData.spawn; i++) {
    total += i
}

parentPort.postMessage(total);