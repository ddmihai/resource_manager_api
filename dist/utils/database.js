"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoose = void 0;
exports.connectDB = connectDB;
exports.disconnectDB = disconnectDB;
exports.getConnectionStatus = getConnectionStatus;
exports.waitForDB = waitForDB;
const mongoose_1 = __importDefault(require("mongoose"));
exports.mongoose = mongoose_1.default;
const env_1 = require("../config/env");
// Track connection state
let isConnected = false;
/**
 * Connect to MongoDB database
 */
async function connectDB() {
    // If already connected, return
    if (isConnected) {
        console.log('📦 Using existing MongoDB connection');
        return;
    }
    try {
        // Mongoose connection options
        const options = {
            maxPoolSize: 10, // Maximum number of connections in the pool
            minPoolSize: 5, // Minimum number of connections in the pool
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            serverSelectionTimeoutMS: 10000, // Timeout after 10s if unable to connect
            family: 4, // Use IPv4
        };
        // Connect to MongoDB
        await mongoose_1.default.connect(env_1.env.MONGO_URI, options);
        isConnected = true;
        console.log('✅ MongoDB connected successfully');
        if (mongoose_1.default.connection.db) {
            console.log(`📍 Database: ${mongoose_1.default.connection.db.databaseName}`);
        }
        // Log connection events
        mongoose_1.default.connection.on('connected', () => {
            console.log('🔗 Mongoose connected to MongoDB');
        });
        mongoose_1.default.connection.on('error', (err) => {
            console.error('❌ Mongoose connection error:', err);
            isConnected = false;
        });
        mongoose_1.default.connection.on('disconnected', () => {
            console.log('⚠️ Mongoose disconnected from MongoDB');
            isConnected = false;
        });
        // Graceful shutdown
        process.on('SIGINT', async () => {
            await disconnectDB();
            process.exit(0);
        });
        process.on('SIGTERM', async () => {
            await disconnectDB();
            process.exit(0);
        });
    }
    catch (error) {
        console.error('❌ MongoDB connection error:', error);
        isConnected = false;
        throw error;
    }
}
/**
 * Disconnect from MongoDB database
 */
async function disconnectDB() {
    if (!isConnected) {
        return;
    }
    try {
        await mongoose_1.default.connection.close();
        isConnected = false;
        console.log('👋 MongoDB disconnected successfully');
    }
    catch (error) {
        console.error('❌ Error disconnecting from MongoDB:', error);
        throw error;
    }
}
/**
 * Get connection status
 */
function getConnectionStatus() {
    return isConnected && mongoose_1.default.connection.readyState === 1;
}
/**
 * Wait for database to be ready
 */
async function waitForDB(maxRetries = 10, retryDelay = 2000) {
    let retries = 0;
    while (retries < maxRetries) {
        if (getConnectionStatus()) {
            return;
        }
        console.log(`⏳ Waiting for database connection... (${retries + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        retries++;
    }
    throw new Error('Database connection timeout');
}
// Usage example:
// import { connectDB } from './db';
// await connectDB();
//# sourceMappingURL=database.js.map