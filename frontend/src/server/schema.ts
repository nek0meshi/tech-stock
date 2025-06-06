import { readFileSync } from "node:fs";

const typeDefs = readFileSync("./src/generated/schema.graphql", "utf-8");

export default typeDefs;
