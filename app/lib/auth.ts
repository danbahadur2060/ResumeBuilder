import { betterAuth } from "better-auth";
import { MongoClient, Db } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

let client: MongoClient | null = null;
let db: Db | null = null;

function getDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined");
  }
  if (!client) {
    // Lazily create the client; the driver will connect on first operation.
    client = new MongoClient(uri);
  }
  if (!db) {
    db = client.db(process.env.MONGODB_DBNAME || "aiResumebuilder");
  }
  return { client, db } as { client: MongoClient; db: Db };
}

function createAuth() {
  const { client, db } = getDatabase();
  return betterAuth({
    database: mongodbAdapter(db, { client }),
    emailAndPassword: { enabled: true },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      },
    },
    secret: process.env.BETTER_AUTH_SECRET || "your-secret-key-here",
    baseURL: process.env.NEXT_PUBLIC_AUTH_BASE_URL || "http://localhost:3000",
  });
}

let authInstance: any = null;

export const auth = {
  get api() {
    if (!authInstance) {
      authInstance = createAuth();
    }
    return authInstance.api;
  },
  get handler() {
    if (!authInstance) {
      authInstance = createAuth();
    }
    return authInstance.handler;
  },
};
