import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpsLink = (AdminSecret: string) =>
  createHttpLink({
    uri: "https://alquileres.hasura.app/v1/graphql",
    headers: {
      "x-hasura-admin-secret": AdminSecret,
    },
  });
export const client = (AdminSecret: string) =>
  new ApolloClient({
    uri: "https://alquileres.hasura.app/v1/graphql",
    cache: new InMemoryCache(),
    link: httpsLink(AdminSecret),
  });

export default callGraphQL;
