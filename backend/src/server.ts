import express, { Application, json } from "express";
import UsersRoute from "./routes/usersRoute";

class Server {

    private backend: Application;
    private usersRouter: UsersRoute;

    constructor(){
        this.usersRouter = new UsersRoute();
        this.backend = express();
        this.config();
        this.route();
    }

    private config(){
        this.backend.set('port', process.env.PORT || 3000);
        this.backend.use(json());
    }

    public route = (): void => {
        this.backend.use('/api/users', this.usersRouter.router);
    }

    public start(){
        this.backend.listen(this.backend.get('port'), () => {
            console.log(`Server on port ${this.backend.get('port')}`);
        });
    }
}

const server = new Server();
server.start();