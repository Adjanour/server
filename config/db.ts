import mongoose from 'mongoose';
import { DEV_CONN_STRX, CONN_STRX, ENV_TYPE } from './config';

if (!DEV_CONN_STRX || !CONN_STRX) {
  throw new Error('Please define the MONGODB_URI in .env');
}

const uri: string = ENV_TYPE === 'Development' ? DEV_CONN_STRX : CONN_STRX;

const client = new mongoose.Mongoose();

export const connectDB = async () => {
  try {
    await client.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
    });
    console.log('Connected to the database');
  } catch (err: any) {
    console.error(err.message);
    throw err;
  }
};

export { client };
