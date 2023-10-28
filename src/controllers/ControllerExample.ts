import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@interfaces/Controller';

class ControllerExample implements Controller {
    public path = '/posts';
    public router = Router();

    constructor() {
        this.initializeRoutes();
        this.getData();
    }

    private initializeRoutes(): void {
        this.router.get(
            `${this.path}`,
            this.HttpHandle
        );
    }

    private getData(): void {
        this.router.get("/smth", this.HttpHandle);
    }

    private HttpHandle =(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> | any => {
       return res.json({message : "success"})
    };
}

export default ControllerExample;