import mongoose from 'mongoose';

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect('mongodb://localhost:27018/Workout-plan', {}); //can change to clound MongoURI krub

    console.log('Connected to MongoDB EIEI');
  } catch (error) {
    console.error('Unable to connect to MongoDB', error);
  }
}

export default dbConnect;
