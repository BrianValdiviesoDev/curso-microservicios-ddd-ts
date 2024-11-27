import 'dotenv/config';
import { app } from './server';
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log(`Mock server listen on port: ${PORT}`));
export { app, server };