//Deploy de prueba, ejemplo Back-end corregido
//Prueba
import { ApolloServer } from "@apollo/server";
import { schema } from "./schema.ts";
import { MongoClient } from "mongodb";
import { UserModel } from "./types.ts";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers.ts";

//const MONGO_URL = Deno.env.get("MONGO_URL");
const MONGO_URL = mongodb+srv://igarciadiegoc:12345@nebrijaclusterivn.e0n3s.mongodb.net/?retryWrites=true&w=majority&appName=NebrijaClusterIvn

if (!MONGO_URL) {
  throw new Error("Please provide a MONGO_URL");
}

const mongoClient = new MongoClient(MONGO_URL);
await mongoClient.connect();

console.info("Connected to MongoDB");

const mongoDB = mongoClient.db("users");
const UserCollection = mongoDB.collection<UserModel>("users");

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
 context: async () => ({ UserCollection }),
});

console.info(`Server ready at ${url}`);
