import dotenv from "dotenv";
import app from './routes'
dotenv.config();

//const app: Express = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;