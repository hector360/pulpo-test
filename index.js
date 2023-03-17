import dotenv from 'dotenv';
dotenv.config("./.env");
import { app } from './app.js';
import conectDB from './config/db.js';


const port = process.env.PORT;
const start = async () => {
  try {
    conectDB();
    console.log('Connected to MongoDb')
  } catch (err) {
      console.log(err);
  }
  app.listen(port, () => {
      console.log(`Listening on port ${port}!!!`)
  })    
}

start();