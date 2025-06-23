import typeDefs from "@/server/schema";
import { getArticleInfo } from "@/server/services/article-service";
import { saveImageOfUrl } from "@/server/services/image-service";
import {
  createRecord,
  deleteRecord,
  getRecord,
  getRecords,
  updateRecord,
} from "@/server/services/record-service";
import { getTags } from "@/server/services/tag-service";
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
      articleInfo: async (_, { url }) => {
        const articleInfo = await getArticleInfo({ url });

        return articleInfo;
      },
    },
    Mutation: {
      createRecord: async (_, { input }) => {
        let objectKey = "";
        if (input.imageUrl) {
          const response = await saveImageOfUrl({ url: input.imageUrl });

          objectKey = response.objectKey;
        }

        const record = await createRecord({
          ...input,
          objectKey,
        });

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
