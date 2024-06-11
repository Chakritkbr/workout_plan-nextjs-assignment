import mongoose from 'mongoose';

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error('MONGO_URI is not defined in environment variables.');
    throw new Error('MONGO_URI is not defined');
  }

  try {
    await mongoose.connect(mongoUri, {}); //can change to clound MongoURI krub

    console.log('Connected to MongoDB EIEI');
  } catch (error) {
    console.error('Unable to connect to MongoDB', error);
  }
}

export default dbConnect;
