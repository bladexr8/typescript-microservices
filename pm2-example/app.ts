import * as express from 'express';
import * as bodyParser from 'body-parser';

// Creates and Configures and ExpressJS server
export class ExprApp {
    public express: express.Application;
    /**
     * Configure Express Middleware
     */
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        // here we can have initialisation code
    }
}