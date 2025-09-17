
import express from "express";
import type { Application } from "express";
import morgan from 'morgan';




// Load environment variables from the .env file

export class App {
    public app: Application;

    constructor(private port?: number | string) {
        this.app = express();
        this.settings();

    }

    // Application settings
    private settings(): void {
        this.app.set('port', this.port || process.env.PORT || 4000);
    }

    // Middleware configuration
    private middlewares(): void {
        this.app.use(morgan('dev'));
        this.app.use(express.json()); // leer json raw
        this.app.use(express.urlencoded({ extended: false })); //leer json form
    }


    // Start the server
    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }
}
