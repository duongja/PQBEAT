import { MongoClient, type Collection } from "mongodb";

export type BlogSubscriberDocument = {
  email: string;
  source: string;
  createdAt: Date;
  updatedAt: Date;
};

const databaseName = process.env.MONGODB_DB ?? "pqbeat";
const collectionName = "blog_subscribers";

declare global {
  var __pqbeatMongoClientPromise__: Promise<MongoClient> | undefined;
  var __pqbeatBlogSubscriberIndexPromise__: Promise<void> | undefined;
}

function createClientPromise() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("Missing MONGODB_URI.");
  }

  return new MongoClient(uri).connect();
}

export function getMongoClient() {
  if (!globalThis.__pqbeatMongoClientPromise__) {
    globalThis.__pqbeatMongoClientPromise__ = createClientPromise();
  }

  return globalThis.__pqbeatMongoClientPromise__;
}

export async function getBlogSubscribersCollection(): Promise<Collection<BlogSubscriberDocument>> {
  const client = await getMongoClient();
  const collection = client.db(databaseName).collection<BlogSubscriberDocument>(collectionName);

  if (!globalThis.__pqbeatBlogSubscriberIndexPromise__) {
    globalThis.__pqbeatBlogSubscriberIndexPromise__ = collection
      .createIndex({ email: 1 }, { unique: true, name: "blog_subscribers_email_unique" })
      .then(() => undefined);
  }

  await globalThis.__pqbeatBlogSubscriberIndexPromise__;

  return collection;
}
