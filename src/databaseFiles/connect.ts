// Database requirements - Connection created at end
import { MongoClient } from "mongodb";
import { config } from "../config";

// Create connection
const client = new MongoClient(config.mongodbURI);

client.connect();

// Make sure MongoDB can be accessed outside of this file
export const Afks = client.db(config.mongodbDatabase).collection("Afks");
export const Clubs = client.db(config.mongodbDatabase).collection("Clubs");
export const Games = client.db(config.mongodbDatabase).collection("Games");
export const Stars = client.db(config.mongodbDatabase).collection("Stars");
export const Prefixes = client
  .db(config.mongodbDatabase)
  .collection("Prefixes");
export const Backspeak = client
  .db(config.mongodbDatabase)
  .collection("Backspeak");
export const Reminder = client
  .db(config.mongodbDatabase)
  .collection("Reminder");
