import typeDefs from "@/server/schema";
import {
  createRecord,
  deleteRecord,
  getRecord,
  getRecords,
  updateRecord,
} from "@/server/services/record-service";
import { createSchema, createYoga } from "graphql-yoga";

const schema = createSchema({
  typeDefs,
  resolvers: {
    Query: {
      records: async () => {
        const records = await getRecords();

        return records.map((item) => ({ ...item, tags: [] }));
      },
      record: async (_, { id }) => {
        const record = await getRecord(id);

        return { ...record, tags: [] };
      },
    },
    Mutation: {
      createRecord: async (_, { input }) => {
        const record = await createRecord(input);

        return { ...record, tags: [] };
      },
      updateRecord: async (_, { id, input }) => {
        const record = await updateRecord(id, input);

        return { ...record, tags: [] };
      },
      deleteRecord: async (_, { id }) => {
        await deleteRecord(id);

        return true;
      },
    },
  },
});

const { handleRequest } = createYoga({
  schema,
});

export {
  handleRequest as GET,
  handleRequest as POST,
  handleRequest as OPTIONS,
};
