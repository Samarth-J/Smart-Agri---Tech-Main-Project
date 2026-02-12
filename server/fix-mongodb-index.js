// Script to fix MongoDB index issue
const mongoose = require('mongoose');
require('dotenv').config();

async function fixIndexes() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Get the users collection
    const db = mongoose.connection.db;
    const collection = db.collection('users');

    // List all indexes
    console.log('\n📋 Current indexes:');
    const indexes = await collection.indexes();
    indexes.forEach(index => {
      console.log(`  - ${JSON.stringify(index.key)}: ${index.name}`);
    });

    // Drop the problematic usn index if it exists
    try {
      await collection.dropIndex('usn_1');
      console.log('\n✅ Dropped usn_1 index');
    } catch (error) {
      if (error.code === 27) {
        console.log('\n⚠️  usn_1 index does not exist (already removed)');
      } else {
        throw error;
      }
    }

    // List indexes after cleanup
    console.log('\n📋 Indexes after cleanup:');
    const newIndexes = await collection.indexes();
    newIndexes.forEach(index => {
      console.log(`  - ${JSON.stringify(index.key)}: ${index.name}`);
    });

    console.log('\n✅ MongoDB indexes fixed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

fixIndexes();
