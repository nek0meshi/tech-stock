import { type Record, RecordStatus } from "@/generated/graphql";
import typeDefs from "@/server/schema";
import { range } from "@/utils/array";
import { createSchema, createYoga } from "graphql-yoga";

const records: Record[] = range(1, 10).map((i) => ({
  id: i.toString(),
  title: `React vs Vue.js React vs Vue.js React vs Vue.js ${i}`,
  tags: [
    {
      id: "tag1",
      name: "tag1",
    },
    {
      id: "tag2",
      name: "tag2",
    },
  ],
  status: RecordStatus.Unread,
  rating: 5,
  memo: "ためになった。ためになった。ためになった。ためになった。ためになった。ためになった。ためになった。ためになった。",
  createdAt: new Date("2021-01-01"),
  updatedAt: new Date("2021-01-01"),
}));

const schema = createSchema({
  typeDefs,
  resolvers: {
    Query: {
      records: () => {
        return records;
      },
      record: () => {
        return records[0];
      },
    },
    Mutation: {
      createRecord: () => {
        return records[0];
      },
      updateRecord: () => {
        return records[0].id;
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
