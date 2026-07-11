import { ObjectId } from "mongodb";
import { capsulesCollection } from "../config/db.js";

const toPlain = (doc) => {
  if (!doc) return null;
  return { ...doc, id: doc._id.toString(), owner: doc.owner.toString() };
};

export const createCapsule = async (capsule, ownerId) => {
  const doc = {
    name: capsule.name,
    description: capsule.description,
    openDate: capsule.openDate,
    members: capsule.members || [],
    owner: new ObjectId(ownerId),
    createdAt: new Date(),
  };
  const result = await capsulesCollection().insertOne(doc);
  return toPlain({ ...doc, _id: result.insertedId });
};

export const findCapsules = async (ownerId, query) => {
  const filter = { owner: new ObjectId(ownerId) };
  if (query) {
    filter.name = { $regex: query, $options: "i" };
  }
  const capsules = await capsulesCollection().find(filter).toArray();
  return capsules.map(toPlain);
};
