import express, { Response as ExResponse, Request as ExRequest, NextFunction } from "express";
import path from "path";
import connectDB from "./util/database";
import { RegisterRoutes } from "./routes";
import swaggerUi from "swagger-ui-express";
import { CustomError } from "./models/Error";
import helmet from "helmet";

const app = express();
 
// Connect to MongoDB
connectDB();

// Express configuration
app.set("port", process.env.SERVER_PORT || 4000);
app.use(helmet({
  contentSecurityPolicy: false
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../../frontend', 'build')));
app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => res.send(swaggerUi.generateHTML(await import("./swagger.json"))));

app.get('/', async (_req, res) => res.sendFile(path.join(__dirname, '../../frontend', 'build', 'index.html')));
app.get('/ping', async (_req, res) => res.send("pong"))

RegisterRoutes(app);

app.use(function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  if (err instanceof CustomError) {
    return res.status(err.response.status).json(err.response);
  }
  else if (err instanceof Error) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
});

const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on ${process.env.SERVER_HOST}:${port}`)
);

export default server;
