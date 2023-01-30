import http from 'http';
import App from "./server";
import router from "./router";

const ExpressApp = new App(router)


const server = http.createServer(ExpressApp.getServer);

// _________LISTEN PORT___________
const port = process.env.PORT || 4000

server.listen(port, () => console.log("Listening port on " + port))