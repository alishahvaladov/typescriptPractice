import "dotenv/config";
import App from "./App";
import ControllerExample from "@controllers/ControllerExample";

const app = new App(
    [new ControllerExample()],
    Number(process.env.PORT)
);

app.listen();