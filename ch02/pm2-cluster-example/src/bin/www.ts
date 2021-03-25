import * as http from 'http';
import * as debug from 'debug';

import { Request, Response } from 'express';
 import * as cluster from 'cluster';
import { cpus } from 'os';
import { ExprApp } from '../app';

debug('custom-express:server');

if (cluster.isMaster) {
    /* create multiple workers, cpus.length() will give # cores available */
    const numCPUs = cpus().length;
    console.log(`${numCPUs} CPU cores are available...`)
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on("online", (worker) => {
        console.log(`Worker ${worker.process.pid} is online`);
    });
    cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} terminated with code: ${code} and signal: ${signal}`);
        console.log("Starting a new worker...");
        cluster.fork();
    });    
} else {
    // fire up Express App
    let App = new ExprApp().express;

    const port = normalizePort(3000);
    App.set('port', port);

    App.all('*', function(req: Request, res:Response, next:Function) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "ContentType, Content-Length, Authorization, Accept, X-Requested-With");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        next();
    });

    const server = http.createServer(App);
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);

    function normalizePort(val: number|string): number|string|boolean {
        let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
        if (isNaN(port)) return val;
        else if (port >= 0) return port;
        else return false;
    }

    function onError(error: NodeJS.ErrnoException): void {
        if (error.syscall !== 'listen') throw error;
        let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
        switch(error.code) {
            case 'EACCES':
                console.error(`${bind} requireds elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    function onListening(): void {
        let addr = server.address();
        let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
        console.log(`Listening on ${bind}`);
    }
}