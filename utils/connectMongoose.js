import mongoose from 'mongoose';

const connectMongo = async () => mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
export default connectMongo;
/**
 * let cachedDb = null

// A function for connecting to MongoDB,
// taking a single parameter of the connection string
export default async function connectToDatabase() {
  // If the database connection is cached,
  // use it instead of creating a new connection
  if (cachedDb) {
    return cachedDb
  }

  // If no connection is cached, create a new one
  const db = await mongoose.createConnection(uri, {
    bufferCommands: false, // Disable mongoose buffering
    bufferMaxEntries: 0, // and MongoDB driver buffering
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })

  // Cache the database connection and return the connection
  cachedDb = db
  return db
}
 */