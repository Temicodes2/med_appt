const mongoose = require('mongoose');
require('dotenv').config();

// Default to local MongoDB without auth (common default install),
// override with MONGO_URI env var for Atlas or authenticated instances
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/stayhealthybeta1";

const connectToMongo = async (retryCount) => {
    const MAX_RETRIES = 5;
    const count = retryCount ?? 0;
    try {
        await mongoose.connect(mongoURI);
        console.info('Connected to Mongo Successfully');
        return;
    } catch (error) {
        console.error(error);
        const nextRetryCount = count + 1;
        if (nextRetryCount >= MAX_RETRIES) {
            throw new Error('Unable to connect to Mongo!');
        }
        console.info(`Retrying, retry count: ${nextRetryCount}`);
        return await connectToMongo(nextRetryCount);
    }
};

module.exports = connectToMongo;
