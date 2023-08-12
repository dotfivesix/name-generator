import mongoose from 'mongoose';
const KEY = process.env.MONGO_DB_KEY;
mongoose.connect(KEY);
export const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to the MongoDB database');
});