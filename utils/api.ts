import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";

async function callGraphQL<T, O>(
  query: any,
  options?: O,
  authMode?: GRAPHQL_AUTH_MODE
): Promise<GraphQLResult<T>> {
  // @ts-ignore
  return (await API.graphql({ query: query, variables: options, authMode })) as GraphQLResult<T>;
}

export default callGraphQL;
