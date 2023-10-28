import express, { Application } from "express";
import mongoose from "mongoose";
import Controller from "@interfaces/Controller";
import ErrorMiddleware from "@middleware/ErrorMiddleware";

class App {
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        // THE ORDER OF THESE FUNCTIONS IS IMPORTANT 
        // this.initializeDatabaseConnection();
        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeErrorHandling(); 
    }

    private initializeDatabaseConnection() : void {
        const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_PATH } = process.env;
        mongoose.connect(`mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}${MONGO_PATH}`);
    }
    
    private initializeMiddleware() : void {
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: true }));
    }

    private initializeControllers(controllers : Controller[]) : void {
        controllers.forEach((controller : Controller) => {
            this.express.use('/api', controller.router);
        });
    }

    private initializeErrorHandling() : void {
        this.express.use(ErrorMiddleware);
    }

    public listen() : void {
        this.express.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
        });
    }
}

export default App;