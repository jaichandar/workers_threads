const express = require('express')
const morgan = require('morgan');
const { Worker } = require('worker_threads');
const users = require('./users.json');

const app = express();
app.use(express.json())

const PORT = 5000;

app.get('/users', (req, res) => {
    res.status(200).json({ success: true, users: 'users' });
})

const spawnWorkers = () => {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', { workerData: { spawn: 4 } });

        worker.on('message', (data) => {
            resolve(data);
        })

        worker.on('error', err => {
            reject(err);
        })
    })
}

app.get('/total', async (req, res) => {
    const spawnRes = [];
    for (let i = 0; i < 4; i++) {
        spawnRes.push(spawnWorkers())
    }
    const result = await Promise.all(spawnRes)
    let total = 0;
    for (let i = 0; i < result.length; i++) {
        total += result[i];
    }
    return res.status(200).json({ success: true, total: `${total} count` });
})

app.listen(PORT, () => {
    console.log(`Application Running on PORT: ${PORT}`);
})