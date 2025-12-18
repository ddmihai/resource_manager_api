import mongoose from 'mongoose';
import { env } from '../config/env';


// Track connection state
let isConnected = false;

/**
 * Connect to MongoDB database
 */
export async function connectDB(): Promise<void> {
    // If already connected, return
    if (isConnected) {
        console.log('📦 Using existing MongoDB connection');
        return;
    }

    try {
        // Mongoose connection options
        const options: mongoose.ConnectOptions = {
            maxPoolSize: 10, // Maximum number of connections in the pool
            minPoolSize: 5,  // Minimum number of connections in the pool
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            serverSelectionTimeoutMS: 10000, // Timeout after 10s if unable to connect
            family: 4, // Use IPv4
        };

        // Connect to MongoDB
        await mongoose.connect(env.MONGO_URI, options);

        isConnected = true;

        console.log('✅ MongoDB connected successfully');
        if (mongoose.connection.db) {
            console.log(`📍 Database: ${mongoose.connection.db.databaseName}`);
        }

        // Log connection events
        mongoose.connection.on('connected', () => {
            console.log('🔗 Mongoose connected to MongoDB');
        });

        mongoose.connection.on('error', (err) => {
            console.error('❌ Mongoose connection error:', err);
            isConnected = false;
        });

        mongoose.connection.on('disconnected', () => {
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

    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        isConnected = false;
        throw error;
    }
}

/**
 * Disconnect from MongoDB database
 */
export async function disconnectDB(): Promise<void> {
    if (!isConnected) {
        return;
    }

    try {
        await mongoose.connection.close();
        isConnected = false;
        console.log('👋 MongoDB disconnected successfully');
    } catch (error) {
        console.error('❌ Error disconnecting from MongoDB:', error);
        throw error;
    }
}

/**
 * Get connection status
 */
export function getConnectionStatus(): boolean {
    return isConnected && mongoose.connection.readyState === 1;
}

/**
 * Wait for database to be ready
 */
export async function waitForDB(maxRetries = 10, retryDelay = 2000): Promise<void> {
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

// Export mongoose instance for use in models
export { mongoose };

// Usage example:
// import { connectDB } from './db';
// await connectDB();