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

    private middleware(): void {
        console.log("*** all middleware options will be loaded here");
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {
        let router = express.Router();

        router.get('/', (req, res, next) => {
            res.json({
                message: 'Hello from Typescript Express Node JS Server'
            });
        });
        this.express.use('/', router);
    }
}