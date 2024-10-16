const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dbName = 'portfolio';
    const uri = process.env.MONGODB_URI;
    
    // If the URI doesn't include a database name, add it
    const uriWithDb = uri.includes('/?') ? 
      uri.replace('/?', `/${dbName}?`) : 
      `${uri.split('?')[0]}/${dbName}?${uri.split('?')[1] || ''}`;

      const conn = await mongoose.connect(uriWithDb);
    /* console.log('MongoDB connected to database:', mongoose.connection.db.databaseName); */
  } catch (error) {
    /* console.error('MongoDB connection error:', error); */
    process.exit(1);
  }
};

module.exports = connectDB;