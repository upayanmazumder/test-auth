import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
	throw new Error("MONGODB_URI is not defined in environment variables");
}
const options = {};

declare global {
	var _mongoClientPromise: Promise<MongoClient> | undefined;
}
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
	if (!global._mongoClientPromise) {
		const client = new MongoClient(uri, options);
		global._mongoClientPromise = client.connect().catch((err) => {
			console.error("MongoDB connection failed:", err);
			throw err;
		});
	}
	clientPromise = global._mongoClientPromise;
} else {
	const client = new MongoClient(uri, options);
	clientPromise = client.connect().catch((err) => {
		console.error("MongoDB connection failed:", err);
		throw err;
	});
}

export default clientPromise;
