import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  console.log("Connecting to Database Sign In ");
  const client = await MongoClient.connect(
    "mongodb+srv://tobeythadeveloper:Davidolaka1@cluster0.5ywzmgb.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("Gotten Client");
  return client;
}
