import mongoose from 'mongoose';

export const connectDB = async () => {
  if(mongoose.connections[0].readyState){
    console.log('Already connected.');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!)
    console.log('Connected to MongoDB.');
  } catch (error) {
    console.log('Error connecting to MongoDB.');
    console.log(error);
    process.exit(1);
  }

}