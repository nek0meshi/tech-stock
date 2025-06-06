import { Client, cacheExchange, fetchExchange } from "urql";

const client = new Client({
  url: "/api/graphql",
  exchanges: [fetchExchange, cacheExchange],
});

export default client;
