import 'dotenv/config'
import { MongoService } from './framework/mongodb';
import { app } from './server';
const PORT = process.env.PORT || 3000;
const mongo = new MongoService();
mongo.connect();

const server = app.listen(PORT, () => console.log(`Listen on port: ${PORT}`));
export { app, server };