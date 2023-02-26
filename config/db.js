import mongoose from 'mongoose';
mongoose.set('strictQuery', true);


export const connect = async () => {
   try {
      const conn = await mongoose.connect(process.env.MONGO_URI)
      console.log('Connected'.bgRed)
   }
   catch (error) {
      console.log('config -> db.js -> ', error.message)
   }
}