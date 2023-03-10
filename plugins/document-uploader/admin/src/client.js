import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const link = new HttpLink({
  uri: `/graphql`,
  credentials: `include`,
  method: `POST`,
});
const cache = new InMemoryCache();
const client = new ApolloClient({ link, cache });
export default client;
