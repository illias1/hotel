import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";

async function callGraphQL<T, O>(query: any, options?: O): Promise<GraphQLResult<T>> {
  return (await API.graphql(graphqlOperation(query, options))) as GraphQLResult<T>;
}

export default callGraphQL;
