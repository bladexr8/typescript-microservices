import { appLogger } from '../common/logging';
import { ExpressConfig } from './Express';

export class Application {
    server: any;
    express: ExpressConfig;
    classLogger: appLogger;

    constructor() {
        this.express = new ExpressConfig();
        this.classLogger = new appLogger();

        const port = 3000;
        this.server = this.express.app.listen(port, () => {
            this.classLogger.logger.info(`Server Started! Express: http://localhost:${port}`);
        });
    }
}

