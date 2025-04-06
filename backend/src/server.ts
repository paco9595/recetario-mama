
import 'dotenv/config'

import app from './routes'
import cors from 'cors'

app.use(cors())

//const app: Express = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;